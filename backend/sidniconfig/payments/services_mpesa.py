import base64
from datetime import datetime
from decimal import Decimal, ROUND_HALF_UP
from zoneinfo import ZoneInfo

import requests
from django.conf import settings


def get_base_url():
    if settings.MPESA_ENVIRONMENT == "production":
        return "https://api.safaricom.co.ke"
    if settings.MPESA_ENVIRONMENT == "sandbox":
        return "https://sandbox.safaricom.co.ke"
    raise ValueError("MPESA_ENVIRONMENT must be sandbox or production")


def normalize_phone_number(phone_number):
    phone = "".join(character for character in str(phone_number) if character.isdigit())
    if phone.startswith("0"):
        phone = f"254{phone[1:]}"
    elif phone.startswith(("7", "1")):
        phone = f"254{phone}"
    if len(phone) != 12 or not phone.startswith("254"):
        raise ValueError("Invalid Kenyan M-Pesa phone number")
    return phone


def get_access_token():
    response = requests.get(
        f"{get_base_url()}/oauth/v1/generate",
        params={"grant_type": "client_credentials"},
        auth=(settings.MPESA_CONSUMER_KEY, settings.MPESA_CONSUMER_SECRET),
        timeout=30,
    )
    response.raise_for_status()
    token = response.json().get("access_token")
    if not token:
        raise ValueError("Daraja did not return an access token")
    return token


def generate_password(timestamp):
    raw = f"{settings.MPESA_SHORTCODE}{settings.MPESA_PASSKEY}{timestamp}"
    return base64.b64encode(raw.encode()).decode()


def send_stk_push(phone, amount):
    phone = normalize_phone_number(phone)
    amount = int(Decimal(str(amount)).quantize(Decimal("1"), rounding=ROUND_HALF_UP))
    if amount < 1:
        raise ValueError("Amount must be greater than zero")

    timestamp = datetime.now(ZoneInfo("Africa/Nairobi")).strftime("%Y%m%d%H%M%S")
    payload = {
        "BusinessShortCode": settings.MPESA_SHORTCODE,
        "Password": generate_password(timestamp),
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": settings.MPESA_SHORTCODE,
        "PhoneNumber": phone,
        "CallBackURL": settings.MPESA_CALLBACK_URL,
        "AccountReference": "MY-WEBSITE",
        "TransactionDesc": "Website payment",
    }
    response = requests.post(
        f"{get_base_url()}/mpesa/stkpush/v1/processrequest",
        json=payload,
        headers={
            "Authorization": f"Bearer {get_access_token()}",
            "Content-Type": "application/json",
        },
        timeout=30,
    )
    response.raise_for_status()
    return response.json()
