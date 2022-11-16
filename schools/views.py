from rest_framework import viewsets
from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)

from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status

from .serializers import SchoolSerializer, SchoolImageSerializer
from .models import School

User = get_user_model()

class SchoolViewSet(viewsets.ModelViewSet):
    serializer_class = SchoolSerializer
    queryset = School.objects.all()

    def create(self, request):
        serializer = SchoolSerializer(data=request.data)
        if serializer.is_valid():
            teacher = serializer.create(request)
            if teacher:
                return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)


class SchoolImageViewSet(viewsets.ModelViewSet):
    serializer_class = SchoolImageSerializer
    queryset = School.objects.all()

    def create(self, request):
        serializer = SchoolImageSerializer(data=request.data)
        if serializer.is_valid():
            teacher = serializer.create(request)
            if teacher:
                return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)