# accounts/urls.py
from django.urls import path, re_path, include
from . import views
from .views import CurrentUserView, GoogleLogin, GoogleLoginCallback, Login_View

urlpatterns = [
    path("login/", views.Login_View, name="login"),
    path("me/", CurrentUserView.as_view(), name="current_user"),
    path("api/v1/auth/", include("dj_rest_auth.urls")),
    re_path(r"^api/v1/auth/accounts/", include("allauth.urls")),
    path("api/v1/auth/registration/", include("dj_rest_auth.registration.urls")),
    path("api/v1/auth/google/", GoogleLogin.as_view(), name="google_login"),
    path(
        "api/v1/auth/google/callback/",
        GoogleLoginCallback.as_view(),
        name="google_login_callback",
    ),
]