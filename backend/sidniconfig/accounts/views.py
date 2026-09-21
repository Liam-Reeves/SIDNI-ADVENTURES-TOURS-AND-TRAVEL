from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import generics, permissions

# Create your views here.

from .models import Customer
from .serializers import CustomerSerializer, RegisterSerializer
class RegisterView(generics.CreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
    
class CustomerListView(generics.ListAPIView):
    queryset = Customer.objects.all().order_by('-created_at')
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAdminUser]
    
class MyProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self):
        return self.request.user
