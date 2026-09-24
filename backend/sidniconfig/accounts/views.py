from django.shortcuts import redirect, render
from django.conf import settings
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

import requests
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomerSerializer


def Login_View(request):
    return render(
        request,
        'accounts/login.html',
        {
            'google_client_id': settings.GOOGLE_OAUTH_CLIENT_ID,
            'google_callback_uri': settings.GOOGLE_OAUTH_CALLBACK_URL,
        },
    )

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = settings.GOOGLE_OAUTH_CALLBACK_URL
    client_class = OAuth2Client


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response(CustomerSerializer(request.user).data)
    
    
class GoogleLoginCallback(APIView):
    def get(self, request, *args, **kwargs):
        """
        Receive the Google OAuth code and forward it to the SocialLogin endpoint.
        The response from dj-rest-auth contains the authenticated user payload on
        success, including the user's email. If the backend responds with an error
        page or malformed JSON, we return a clean JSON response instead of letting
        Django crash with an Internal Server Error.
        """

        code = request.GET.get("code")

        if code is None:
            return Response({"detail": "Missing Google OAuth code."}, status=status.HTTP_400_BAD_REQUEST)

        token_endpoint_url = f"{request.scheme}://{request.get_host()}/api/v1/auth/google/"

        try:
            response = requests.post(url=token_endpoint_url, data={"code": code}, timeout=20)
            payload = None

            try:
                payload = response.json()
            except (ValueError, TypeError):
                payload = None

            if isinstance(payload, dict):
                user = payload.get("user") or {}
                if isinstance(user, dict) and user.get("email"):
                    frontend_callback = "http://localhost:5173/google/callback/"
                    redirect_query = {
                        "access": payload.get("access", ""),
                        "refresh": payload.get("refresh", ""),
                        "email": user["email"],
                        "first_name": user.get("first_name", ""),
                        "last_name": user.get("last_name", ""),
                    }
                    query_string = "&".join(
                        f"{key}={requests.utils.quote(str(value))}"
                        for key, value in redirect_query.items()
                        if value
                    )
                    return redirect(f"{frontend_callback}?{query_string}")

                if payload.get("detail"):
                    return Response(payload, status=response.status_code or status.HTTP_400_BAD_REQUEST)

            if response.ok:
                return Response({"detail": "Login successful."}, status=status.HTTP_200_OK)

            return Response(
                {"detail": response.text or "Google login failed."},
                status=response.status_code or status.HTTP_502_BAD_GATEWAY,
            )

        except requests.RequestException as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_502_BAD_GATEWAY)
