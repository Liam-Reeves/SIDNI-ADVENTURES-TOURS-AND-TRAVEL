from django.shortcuts import render

from rest_framework import generics, permissions

from .models import Tour, TourAvailability
from .serializers import TourSerializer, TourAvailabilitySerializer

# Create your views here.
class TourListView(generics.ListAPIView):
    queryset = Tour.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = TourSerializer
    permission_classes = [permissions.AllowAny]


class TourAvailabilityListView(generics.ListAPIView):
    serializer_class = TourAvailabilitySerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        tour_id = self.request.query_params.get('tour_id')
        queryset = TourAvailability.objects.select_related('tour').order_by('start_date')

        if tour_id:
            queryset = queryset.filter(tour_id=tour_id)

        return queryset




