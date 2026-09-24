from django.db import models
from bookings.models import Booking
from django.db import models

from django.db import models


class Payment(models.Model):
    phone_number = models.CharField(max_length=20, blank=True, null=True, default=None)
    amount = models.IntegerField()
    status = models.CharField(
        max_length=20,
        default="PENDING",
    )

    checkout_request_id = models.CharField(
        max_length=100,
        blank=True,
        null=True,
    )

    receipt_number = models.CharField(
        max_length=100,
        blank=True,
        null=True,
    )

    message = models.TextField(
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):
        return f"{self.phone_number} - {self.status}" 
            