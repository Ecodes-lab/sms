from rest_framework import serializers
import datetime

from django.contrib.auth import get_user_model
User = get_user_model()
# from accounts.models import User
from .models import School
from . import models


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class SchoolSerializer(serializers.ModelSerializer):
    user = StringSerializer(many=False)
    class Meta:
        model = School
        fields = ('__all__')

    def create(self, request):
        data = request.data

        school = School()
        school.name = data['name']
        school.street = data['street']
        school.city = data['city']
        school.state = data['state']
        school.country = data['country']
        school.zipcode = data['zipcode']
        school.owner_name = data['owner_name']
        school.phone = data['phone']
        school.fax = data['fax']
        school.email = data['email']
        school.website = data['website']
        school.save()

        return school
    
    def update(self, instance, validated_data):

        instance.logo = validated_data.get('logo', instance.logo)
        instance.name = validated_data.get('name', instance.name)
        instance.street = validated_data.get('street', instance.street)
        instance.city = validated_data.get('city', instance.city)
        instance.state = validated_data.get('state', instance.state)
        instance.country = validated_data.get('country', instance.country)
        instance.zipcode = validated_data.get('zipcode', instance.zipcode)
        instance.owner_name = validated_data.get('owner_name', instance.owner_name)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.fax = validated_data.get('fax', instance.fax)
        instance.email = validated_data.get('email', instance.email)
        instance.website = validated_data.get('website', instance.website)
        instance.save()

        return instance


class SchoolImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ('logo',)
        
    def update(self, instance, validated_data):

        instance.logo = validated_data.get('logo', instance.logo)
        instance.save()

        return instance