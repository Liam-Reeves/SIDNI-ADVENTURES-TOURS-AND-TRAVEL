# accounts/urls.py
from django.urls import path
from .views import RegisterView, CustomerListView, MyProfileView
urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('customers/', CustomerListView.as_view(), name='customer-list'),
    path('me/', MyProfileView.as_view(), name='my-profile')
]