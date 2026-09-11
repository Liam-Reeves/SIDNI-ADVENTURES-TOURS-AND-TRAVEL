from django.db import models

# Create your models here.
from django.db import models
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)   # e.g. Safari, Beach, City Tour
    def __str__(self):
        return self.name
class Tour(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='tours')
    description = models.TextField()
    location = models.CharField(max_length=150)
    price_per_person = models.DecimalField(max_digits=10, decimal_places=2)  # store in KES
    duration_days = models.PositiveIntegerField()
    max_group_size = models.PositiveIntegerField(default=10)
    cover_image = models.ImageField(upload_to='tours/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title
class TourAvailability(models.Model):
    '''Specific departure dates and remaining slots - powers search/filter.'''
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='availabilities')
    start_date = models.DateField()
    slots_available = models.PositiveIntegerField()
    class Meta:
        unique_together = ('tour', 'start_date')
