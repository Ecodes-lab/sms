from allauth.account.adapter import get_adapter
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token
import datetime

from django.contrib.auth import get_user_model
User = get_user_model()
from .models import Teacher, Student
from . import models

from schools.models import School



class TeacherImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ('image',)

    def update(self, instance, validated_data):
        instance.image = validated_data.get('image', instance.image)
        instance.save()

        return instance


class StudentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('image',)

    def update(self, instance, validated_data):
        instance.image = validated_data.get('image', instance.image)
        instance.save()

        return instance


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ('__all__')


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('__all__')


class UserSerializer(serializers.ModelSerializer):
    teachers = TeacherSerializer(required=False, many=True)
    students = StudentSerializer(required=False, many=True)
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email', 'school', 'is_student', 'is_teacher', 'is_school_admin', 'is_system_admin', 'students', 'teachers')


    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name )
        instance.last_name = validated_data.get('last_name', instance.last_name )
        instance.username = validated_data.get('username', instance.username )
        instance.email = validated_data.get('email', instance.email )
        instance.is_student = validated_data.get('is_student', instance.is_student )
        instance.is_teacher = validated_data.get('is_teacher', instance.is_teacher )
        instance.is_school_admin = validated_data.get('is_school_admin', instance.is_school_admin )
        instance.save()
        

        if instance.is_school_admin is True or instance.is_teacher is True:
            teachers_data = validated_data.pop('teachers')
            teacher_data = (instance.teachers).all()
            teacher_data = list(teacher_data) 
            for t in teachers_data:
                teacher = teacher_data.pop(0)
                teacher.image = t.get('image', teacher.image )
                teacher.date_of_birth = t.get('date_of_birth', teacher.date_of_birth )
                teacher.gender = t.get('gender', teacher.gender )
                teacher.street = t.get('street', teacher.street )
                teacher.city = t.get('city', teacher.city )
                teacher.state = t.get('state', teacher.state )
                teacher.country = t.get('country', teacher.country )
                teacher.zip_code = t.get('zip_code', teacher.zip_code )
                teacher.years_of_experience = t.get('years_of_experience', teacher.years_of_experience )
                teacher.academic_qualification = t.get('academic_qualification', teacher.academic_qualification )
                teacher.phone = t.get('phone', teacher.phone )
                teacher.emergency_contact1 = t.get('emergency_contact1', teacher.emergency_contact1 )
                teacher.emergency_contact2 = t.get('emergency_contact2', teacher.emergency_contact2 )
                teacher.blood_group = t.get('blood_group', teacher.blood_group )
                teacher.save()

        elif instance.is_student is True:
            students_data = validated_data.pop('students')
            student_data = (instance.students).all()
            student_data = list(student_data)
            for s in students_data:
                student = student_data.pop(0)
                student.image = s.get('image', student.image)
                student.date_of_birth = s.get('date_of_birth', student.date_of_birth)
                student.gender = s.get('gender', student.gender)
                student.street = s.get('street', student.street)
                student.city = s.get('city', student.city)
                student.state = s.get('state', student.state)
                student.country = s.get('country', student.country)
                student.zip_code = s.get('zip_code', student.zip_code)
                student.father_name = s.get('father_name', student.father_name)
                student.mother_name = s.get('mother_name', student.mother_name)
                student.father_occupation = s.get('father_occupation', student.father_occupation)
                student.mother_occupation = s.get('mother_occupation', student.mother_occupation)
                student.father_phone = s.get('father_phone', student.father_phone)
                student.mother_phone = s.get('mother_phone', student.mother_phone)
                student.father_email = s.get('father_email', student.father_email)
                student.mother_email = s.get('mother_email', student.mother_email)
                student.emergency_contact1 = s.get('emergency_contact1', student.emergency_contact1)
                student.emergency_contact2 = s.get('emergency_contact2', student.emergency_contact2)
                student.blood_group = s.get('blood_group', student.blood_group)
                student.mother_tongue = s.get('mother_tongue', student.mother_tongue)
                student.father_annual_income = s.get('father_annual_income', student.father_annual_income)
                student.mother_annual_income = s.get('mother_annual_income', student.mother_annual_income)
                student.previous_school_info = s.get('previous_school_info', student.previous_school_info)
                student.class_of_admission = s.get('class_of_admission', student.class_of_admission)
                student.year_of_admission = s.get('year_of_admission', student.year_of_admission)
                student.save()

        return instance


class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    is_student = serializers.BooleanField()
    is_teacher = serializers.BooleanField()
    is_school_admin = serializers.BooleanField()
    school = serializers.IntegerField()
    # school = serializers.ReadOnlyField()
    # teacher = TeacherSerializer(required=False)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'email', 'password', 'school', 'is_student', 'is_teacher', 'is_school_admin')

    def get_cleaned_data(self):
        return {
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'username': self.validated_data.get('username', ''),
            'email': self.validated_data.get('email', ''),
            'school': self.validated_data.pop('school', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'is_student': self.validated_data.get('is_student', ''),
            'is_teacher': self.validated_data.get('is_teacher', ''),
            'is_school_admin': self.validated_data.get('is_school_admin', ''),
        }



    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.first_name = self.cleaned_data.get('first_name')
        user.last_name = self.cleaned_data.get('last_name')
        user.username = self.cleaned_data.get('username')
        user.is_student = self.cleaned_data.get('is_student')
        user.is_teacher = self.cleaned_data.get('is_teacher')
        user.is_school_admin = self.cleaned_data.get('is_school_admin')

        school_data = self.cleaned_data.pop("school")
        school_id = School.objects.get(id=school_data)
        user.school = school_id

        if user.is_school_admin is True or user.is_teacher is True :
            user.save()

            teacher = models.Teacher(
                        user=user,
            )

            teacher.save()

        elif user.is_student is True:
            user.save()

            student = models.Student(
                        user=user,
            )

            student.save()

        adapter.save_user(request, user, self)

        return user


class TokenSerializer(serializers.ModelSerializer):
    user_type = serializers.SerializerMethodField()

    class Meta:
        model = Token
        fields = ('key', 'user', 'user_type')

    def get_user_type(self, obj):
        serializer_data = UserSerializer(
            obj.user
        ).data
        first_name = serializer_data.get('first_name')
        last_name = serializer_data.get('last_name')
        school = serializer_data.get('school')
        is_student = serializer_data.get('is_student')
        is_teacher = serializer_data.get('is_teacher')
        is_school_admin = serializer_data.get('is_school_admin')
        is_system_admin = serializer_data.get('is_system_admin')
        return {
            'first_name': first_name,
            'last_name': last_name,
            'school': school,
            'is_student': is_student,
            'is_teacher': is_teacher,
            'is_school_admin': is_school_admin,
            'is_system_admin': is_system_admin
        }


