from rest_framework import viewsets, permissions, generics
from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)

from rest_framework.views import APIView

from .serializers import UserSerializer, StudentImageSerializer, TeacherImageSerializer 
from .models import Teacher, Student

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            teacher = serializer.create(request)
            if teacher:
                return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)


class TeacherImageViewSet(viewsets.ModelViewSet):
    serializer_class = TeacherImageSerializer
    queryset = Teacher.objects.all()

    def create(self, request):
        serializer = TeacherImageSerializer(data=request.data)
        if serializer.is_valid():
            teacher = serializer.create(request)
            if teacher:
                return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)


class StudentImageViewSet(viewsets.ModelViewSet):
    serializer_class = StudentImageSerializer
    queryset = Student.objects.all()

    def create(self, request):
        serializer = StudentImageSerializer(data=request.data)
        if serializer.is_valid():
            teacher = serializer.create(request)
            if teacher:
                return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

