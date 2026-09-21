from rest_framework import serializers
from .models import Tour, TourAvailability

class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = [
            'id', 'title', 'description',
            'location', 'price_per_person', 'duration_days',
            'max_group_size', 'cover_image', 'is_active', 'created_at',
        ]


class TourAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = TourAvailability
        fields = [
            'id', 'tour', 'start_date', 'slots_available'
        ]