from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

Customer = get_user_model()


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        identifier = attrs.get("username", "").strip()
        password = attrs.get("password", "")
        user = Customer.objects.filter(email__iexact=identifier).first()

        if user is None:
            user = Customer.objects.filter(username__iexact=identifier).first()

        if user is None or not user.check_password(password) or not user.is_active:
            raise serializers.ValidationError("No active account matches these credentials.")

        refresh = RefreshToken.for_user(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields= ['id',
                 'email',
                 'first_name',
                 'last_name',
                 'phone_number',
                  'is_existing_customer',
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
     
        