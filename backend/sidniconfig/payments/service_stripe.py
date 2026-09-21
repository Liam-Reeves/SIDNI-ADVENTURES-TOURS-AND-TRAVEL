import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY


class StripeService:
    def create_payment_intent(self, amount, currency='kes', metadata=None):
        return stripe.PaymentIntent.create(
            amount=int(amount),
            currency=currency,
            metadata=metadata or {},
            automatic_payment_methods={'enabled': True}
        )


def create_payment_intent(amount, currency='kes', metadata=None):
    return StripeService().create_payment_intent(amount, currency=currency, metadata=metadata)