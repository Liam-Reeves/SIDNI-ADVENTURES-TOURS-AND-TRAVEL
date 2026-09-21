from django.urls import path

from .views import TourListView, TourAvailabilityListView

urlpatterns = [
    path('', TourListView.as_view(), name='tour-list'),
    path('availabilities/', TourAvailabilityListView.as_view(), name='tour-availability-list'),
]
