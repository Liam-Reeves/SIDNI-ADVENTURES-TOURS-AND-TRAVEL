# Import the Stripe SDK so we can verify incoming webhook events and create payment intents.
import stripe

# Django shortcuts and HTTP utilities are used for responses and request handling.
from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# DRF is used to build the API endpoints and enforce authentication.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions

# Import local booking and payment models plus the Stripe and M-Pesa service wrappers.
from bookings.models import Booking
from .service_stripe import StripeService
from .models import Payment
from .services_mpesa import initiate_stk_push


# Disable CSRF protection for this endpoint because Stripe sends webhook requests
# from its servers, not from a browser form submission.
@method_decorator(csrf_exempt, name='dispatch')
class StripeWebhookView(APIView):
    # Webhooks are public and do not require API authentication.
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        # Read the raw request body and the Stripe signature header.
        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')

        try:
            # Verify that the request truly came from Stripe using the webhook secret.
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )
        except (ValueError, stripe.error.SignatureVerificationError):
            # If the payload is invalid or the signature is wrong, reject the request.
            return HttpResponse(status=400)

        # Handle successful payment events.
        if event['type'] == 'payment_intent.succeeded':
            intent = event['data']['object']

            # Look up the payment record by the Stripe payment intent ID.
            payment = Payment.objects.filter(provider_reference=intent['id']).first()
            if payment:
                # Mark the payment as successful and confirm the booking.
                payment.status = Payment.Status.SUCCESS
                payment.save()
                payment.booking.status = Booking.Status.CONFIRMED
                payment.booking.save()

        # Handle failed payment events.
        elif event['type'] == 'payment_intent.payment_failed':
            intent = event['data']['object']

            # Find the matching payment and update its status.
            payment = Payment.objects.filter(provider_reference=intent['id']).first()
            if payment:
                payment.status = Payment.Status.FAILED
                payment.save()
                payment.booking.status = Booking.Status.FAILED
                payment.booking.save()

        # Always return a 200 response to acknowledge the webhook was received.
        return HttpResponse(status=200)


class CreatePaymentIntentView(APIView):
    # Only authenticated users can create a payment for their own booking.
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # Get the booking ID sent from the frontend when the user starts checkout.
        booking_id = request.data.get('booking_id')

        try:
            # The user must own the booking they are trying to pay for.
            booking = Booking.objects.get(id=booking_id, customer=request.user)
        except Booking.DoesNotExist:
            # If the booking does not exist or does not belong to the current user,
            # return a clear 404 response.
            return Response({'error': 'Booking not found'}, status=404)

        # Use the Stripe service to create a payment intent for the booking total.
        stripe_service = StripeService()
        payment_intent = stripe_service.create_payment_intent(booking.total_amount)

        # Save a payment record so the app can track the payment status later.
        Payment.objects.create(
            booking=booking,
            method=Payment.Method.CARD,
            amount=booking.total_amount,
            provider_reference=payment_intent['id'],
            status=Payment.Status.PENDING
        )

        # Send the client secret back to the frontend so Stripe can complete the checkout.
        return Response({'client_secret': payment_intent['client_secret']})
    
    
class CreateMpesaPaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        booking = Booking.objects.get(id=request.data['booking_id'], customer=request.user)
        phone = request.data['phone_number']   # e.g. "2547XXXXXXXX"
        result = initiate_stk_push(
            phone_number=phone,
            amount=booking.total_amount,
            account_reference=f"BOOKING-{booking.id}",
            description=f"Payment for {booking.tour.title}",
        )
        Payment.objects.create(
            booking=booking,
            method=Payment.Method.MPESA,
            amount=booking.total_amount,
            provider_reference=result.get('CheckoutRequestID'),
            status=Payment.Status.PENDING,
        )
        return Response(result)
@method_decorator(csrf_exempt, name='dispatch')
class MpesaCallbackView(APIView):
    authentication_classes = []
    permission_classes = []
    def post(self, request):
        data = request.data
        result = data['Body']['stkCallback']
        checkout_request_id = result['CheckoutRequestID']
        result_code = result['ResultCode']   # 0 = success
        payment = Payment.objects.filter(provider_reference=checkout_request_id).first()
        if not payment:
            return Response(status=200)   # acknowledge anyway - Daraja retries otherwise
        if result_code == 0:
            metadata_items = result['CallbackMetadata']['Item']
            mpesa_receipt = next(i['Value'] for i in metadata_items if i['Name'] == 'MpesaReceiptNumber')
            payment.status = Payment.Status.SUCCESS
            payment.provider_receipt = mpesa_receipt
            payment.save()
            payment.booking.status = Booking.Status.CONFIRMED
            payment.booking.save()
        else:
            payment.status = Payment.Status.FAILED
            payment.save()
            payment.booking.status = Booking.Status.FAILED
            payment.booking.save()
        return Response(status=200)