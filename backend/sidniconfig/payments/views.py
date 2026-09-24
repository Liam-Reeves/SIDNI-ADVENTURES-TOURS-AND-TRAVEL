import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from .models import Payment
from .services_mpesa import send_stk_push


@csrf_exempt
@require_POST
def start_payment(request):
    try:
        data = json.loads(request.body)

        phone = data["phone"]
        amount = int(data["amount"])

        if amount < 1:
            return JsonResponse({
                "error": "Amount must be greater than zero",
            }, status=400)

        payment = Payment.objects.create(
            phone_number=phone,
            amount=amount,
            status="PENDING",
            message="Payment started",
        )

        mpesa_response = send_stk_push(
            phone=phone,
            amount=amount,
        )

        payment.checkout_request_id = (
            mpesa_response.get("CheckoutRequestID")
        )

        payment.message = mpesa_response.get(
            "CustomerMessage",
            "Check your phone",
        )

        payment.save()

        return JsonResponse({
            "success": True,
            "payment_id": payment.id,
            "message": payment.message,
        })

    except KeyError:
        return JsonResponse({
            "error": "Phone and amount are required",
        }, status=400)

    except Exception as error:
        return JsonResponse({
            "error": str(error),
        }, status=500)
        
@require_GET
def get_payment_status(request, payment_id):
    try:
        payment = Payment.objects.get(
            id=payment_id
        )

        return JsonResponse({
            "id": payment.id,
            "status": payment.status,
            "message": payment.message,
            "receipt": payment.receipt_number,
        })

    except Payment.DoesNotExist:
        return JsonResponse({
            "error": "Payment not found",
        }, status=404)
        
@csrf_exempt
@require_POST
def mpesa_callback(request):
    try:
        data = json.loads(request.body)

        callback = (
            data
            .get("Body", {})
            .get("stkCallback", {})
        )

        checkout_id = callback.get(
            "CheckoutRequestID"
        )

        result_code = callback.get("ResultCode")
        result_description = callback.get(
            "ResultDesc",
            "",
        )

        payment = Payment.objects.get(
            checkout_request_id=checkout_id
        )

        if result_code == 0:
            payment.status = "SUCCESS"
            payment.message = "Payment successful"

            items = (
                callback
                .get("CallbackMetadata", {})
                .get("Item", [])
            )

            for item in items:
                if item.get("Name") == "MpesaReceiptNumber":
                    payment.receipt_number = item.get(
                        "Value"
                    )

        else:
            payment.status = "FAILED"
            payment.message = result_description

        payment.save()

        return JsonResponse({
            "ResultCode": 0,
            "ResultDesc": "Accepted",
        })

    except Payment.DoesNotExist:
        return JsonResponse({
            "ResultCode": 0,
            "ResultDesc": "Payment received",
        })

    except Exception as error:
        print("Callback error:", error)

        return JsonResponse({
            "ResultCode": 1,
            "ResultDesc": "Callback error",
        }, status=400)