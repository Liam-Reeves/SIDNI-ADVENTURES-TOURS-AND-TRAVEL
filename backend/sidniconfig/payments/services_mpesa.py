import base64
import requests

from datetime import datetime

from django.conf import settings
def get_mpesa_access_token():
    url = (
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        if settings.MPESA_ENV == 'sandbox' else
        "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    )
    response = requests.get(
        url,
        auth=(settings.MPESA_CONSUMER_KEY, settings.MPESA_CONSUMER_SECRET)
    )
    response.raise_for_status()
    return response.json()['access_token']

def generate_password_and_timestamp():
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    
    raw = f"{settings.MPESA_SHORTCODE}{settings.MPESA_PASSKEY}{timestamp}"
    
    password = base64.b64encode(raw.encode()).decode()
    return password, timestamp
def initiate_stk_push(phone_number, amount, account_reference, description):
    """phone_number format required by Daraja: 2547XXXXXXXX (no + or leading 0)"""
    access_token = get_mpesa_access_token()
    password, timestamp = generate_password_and_timestamp()
    url = (
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        if settings.MPESA_ENV == 'sandbox' else
        "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    )
    payload = {
        "BusinessShortCode": settings.MPESA_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": int(amount),
        "PartyA": phone_number,
        "PartyB": settings.MPESA_SHORTCODE,
        "PhoneNumber": phone_number,
        "CallBackURL": settings.MPESA_CALLBACK_URL,
        "AccountReference": account_reference,
        "TransactionDesc": description,
    }
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    return response.json()