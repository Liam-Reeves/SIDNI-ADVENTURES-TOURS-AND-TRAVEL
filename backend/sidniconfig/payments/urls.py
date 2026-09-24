from django.urls import path

from . import views


urlpatterns = [
    path(
        "start/",
        views.start_payment,
        name="start_payment",
    ),

    path(
        "<int:payment_id>/status/",
        views.get_payment_status,
        name="payment_status",
    ),

    path(
        "callback/",
        views.mpesa_callback,
        name="mpesa_callback",
    ),
]