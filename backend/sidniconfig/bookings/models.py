from django.db import models

from django.conf import settings
from tours.models import Tour, TourAvailability
class Booking(models.Model):
    class Status(models.TextChoices):
        PENDING_PAYMENT = 'pending_payment', 'Pending Payment'
        CONFIRMED = 'confirmed', 'Confirmed'
        CANCELLED = 'cancelled', 'Cancelled'
        FAILED = 'failed', 'Payment Failed'
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
    
    tour = models.ForeignKey(Tour, on_delete=models.PROTECT, related_name='bookings')
    
    availability = models.ForeignKey(TourAvailability, on_delete=models.PROTECT)
    
    number_of_people = models.PositiveIntegerField()
    
    total_amount = models.DecimalField(max_digits=10, decimal_places=2) 
    
    # snapshot price at booking time
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING_PAYMENT)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f'Booking #{self.id} - {self.tour.title} ({self.status})'
