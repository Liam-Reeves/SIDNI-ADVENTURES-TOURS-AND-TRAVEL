from django.db import models


class Tour(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=150)
    price_per_person = models.DecimalField(max_digits=10, decimal_places=2)
    duration_days = models.PositiveIntegerField()
    max_group_size = models.PositiveIntegerField(default=10)
    cover_image = models.ImageField(upload_to='tour_images/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class TourAvailability(models.Model):
    """Specific departure dates and remaining slots - powers search/filter."""

    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='availabilities')
    start_date = models.DateField()
    slots_available = models.PositiveIntegerField()

    class Meta:
        unique_together = ('tour', 'start_date')
