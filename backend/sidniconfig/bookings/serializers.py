from rest_framework import serializers

from tours.models import TourAvailability
from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            'id', 'customer', 'tour', 'availability',
            'number_of_people', 'total_amount', 'status',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'customer', 'tour', 'total_amount', 'status', 'created_at', 'updated_at']


class CreateBookingSerializer(serializers.Serializer):
    availability_id = serializers.IntegerField()
    number_of_people = serializers.IntegerField(min_value=1)

    def validate(self, attrs):
        availability = TourAvailability.objects.filter(id=attrs['availability_id']).first()
        if availability is None:
            raise serializers.ValidationError({'availability_id': 'Availability not found.'})

        if attrs['number_of_people'] > availability.slots_available:
            raise serializers.ValidationError({'number_of_people': 'Not enough slots available.'})

        return attrs