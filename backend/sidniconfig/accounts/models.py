
from django.contrib.auth.models import AbstractUser
from django.db import models
class Customer(AbstractUser):
 phone_number = models.CharField(max_length=20, blank=True)
 
 national_id_or_passport = models.CharField(max_length=50, blank=True)
 
 date_of_birth = models.DateField(null=True, blank=True)
 
 is_existing_customer = models.BooleanField(
        default=False,
        help_text="True if imported/migrated from a previous system rather than self-registered."
 )
 created_at = models.DateTimeField(auto_now_add=True)
 def __str__(self):
     
    return self.get_full_name() or self.username
