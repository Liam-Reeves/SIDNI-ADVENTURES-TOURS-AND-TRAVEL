from django.urls import path

from .views import (
    CreateMpesaPaymentView,
    CreatePaymentIntentView,
    MpesaCallbackView,
    StripeWebhookView,
)

urlpatterns = [
    path('create-intent/', CreatePaymentIntentView.as_view(), name='create-payment-intent'),
    path('create-mpesa/', CreateMpesaPaymentView.as_view(), name='create-mpesa-payment'),
    path('mpesa-callback/', MpesaCallbackView.as_view(), name='mpesa-callback'),
    path('webhook/', StripeWebhookView.as_view(), name='stripe-webhook'),
]
