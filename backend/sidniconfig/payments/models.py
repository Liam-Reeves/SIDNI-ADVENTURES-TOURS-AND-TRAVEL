from django.db import models
from bookings.models import Booking
class Payment(models.Model):
    class Method(models.TextChoices):
        CARD = 'card', 'Card (Stripe)'
        MPESA = 'mpesa', 'M-Pesa'
    class Status(models.TextChoices):
        PENDING = 'pending', 'Pending'
        SUCCESS = 'success', 'Success'
        FAILED = 'failed', 'Failed'
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='payments')
    
    method = models.CharField(max_length=10, choices=Method.choices)
    
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    
    provider_reference = models.CharField(max_length=120, blank=True) 
    # Stripe intent id / Daraja CheckoutRequestID
    provider_receipt = models.CharField(max_length=120, blank=True)  
    # M-Pesa receipt number
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f'{self.method} payment - {self.amount} - {self.status}'