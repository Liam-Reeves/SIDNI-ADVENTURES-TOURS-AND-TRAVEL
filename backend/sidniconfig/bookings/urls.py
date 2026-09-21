from django.urls import path

from .views import CreateBookingView, MyBookingsView

urlpatterns = [
    path('create/', CreateBookingView.as_view(), name='create-booking'),
    path('my/', MyBookingsView.as_view(), name='my-bookings'),
]
