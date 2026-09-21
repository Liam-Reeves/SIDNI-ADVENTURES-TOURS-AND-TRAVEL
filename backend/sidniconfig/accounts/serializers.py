from rest_framework import serializers
from django.contrib.auth import get_user_model

Customer = get_user_model()

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields= ['id',
                 'email',
                 'first_name',
                 'last_name',
                 'phone_number',
                  'is_ existing_customer',
                  'created_at',
   
                 ]
        read_only_fields = ['id', 'created_at', 'is_existing_customer']
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    class Meta:
        model = Customer
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'phone_number']
    def create(self, validated_data):
        return Customer.objects.create_user(**validated_data)
     
        