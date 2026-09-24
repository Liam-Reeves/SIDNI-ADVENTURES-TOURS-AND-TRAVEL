"""
URL configuration for sidniconfig project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import RedirectView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from accounts.serializers import EmailTokenObtainPairSerializer
from accounts.views import Login_View, GoogleLogin, GoogleLoginCallback


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

urlpatterns = [
    path('', RedirectView.as_view(url='/api/tours/', permanent=False), name='home'),
    
    path('login/', Login_View, name='login_page'),
    
    path('admin/', admin.site.urls),
    
    path('api/token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
    ,
    path('api/v1/auth/google/', GoogleLogin.as_view(), name='google_login'),
    
    path('api/v1/auth/google/callback/', GoogleLoginCallback.as_view(), name='google_login_callback'),
    
    path('api/accounts/', include('accounts.urls')),
    
    path('api/tours/', include('tours.urls')),
    
    path('api/bookings/', include('bookings.urls')),
    
    path('api/payments/', include('payments.urls')),
  
   

    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
