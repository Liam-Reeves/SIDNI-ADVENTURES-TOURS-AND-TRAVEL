from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from rest_framework.response import Response

from rest_framework.views import APIView

from django.db import transaction

from .models import Booking

from tours.models import TourAvailability
from .serializers import BookingSerializer, CreateBookingSerializer
class CreateBookingView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        serializer = CreateBookingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        data = serializer.validated_data
        
        availability = TourAvailability.objects.select_for_update().get(
            id=data['availability_id']
        )
        with transaction.atomic():
            if availability.slots_available < data['number_of_people']:
                return Response({'error': 'Not enough slots available'}, status=400)
            total = availability.tour.price_per_person * data['number_of_people']
            
            booking = Booking.objects.create(
                customer=request.user,
                tour=availability.tour,
                availability=availability,
                number_of_people=data['number_of_people'],
                total_amount=total,
            )
            
            availability.slots_available -= data['number_of_people']
            availability.save()
            
        return Response(BookingSerializer(booking).data, status=201)
class MyBookingsView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Booking.objects.filter(customer=self.request.user).order_by('-created_at')
