from rest_framework import serializers
from django.contrib.auth import get_user_model

Customer = get_user_model()
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'email', 'first_name', 'last_name', 'phone_number'] 
   
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'email', 
                  'first_name', 'last_name',
                  'phone_number', 'password']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        user = Customer.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data['phone_number'],
            password=validated_data['password']
        )
        return user
