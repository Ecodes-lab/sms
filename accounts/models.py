from datetime import timedelta
from django.conf import settings
from django.db import models
import datetime
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager
)

from schools.models import School


def teacher_upload_path(instance, filename):
    return "/".join(['uploaded files/school/teachers', str(instance.user.username), filename])

def student_upload_path(instance, filename):
    return "/".join(['uploaded files/school/students', str(instance.user.username), filename])

class UserManager(BaseUserManager):
    def create_user(self, username, email, school=None, first_name=None, last_name=None, password=None, is_student=None, is_teacher=None, is_school_admin=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        if not password:
            raise ValueError('Users must have a password')

        user_obj = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            username=username,
            school=school,
            is_student=is_student,
            is_teacher=is_teacher,
            is_school_admin=is_school_admin,
        )

        user_obj.set_password(password)
        user_obj.save(using=self._db)
        return user_obj

    def create_superuser(self, username, email, first_name=None, last_name=None, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            username,
            email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
        user.is_system_admin = True
        user.is_system_staff = False
        user.is_school_admin = False
        user.is_teacher = False
        user.is_student = False
        user.save(using=self._db)
        return user

        

class User(AbstractBaseUser):
    username        = models.CharField(verbose_name='username', max_length=255, unique=True)
    email           = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    first_name      = models.CharField(max_length=255)
    last_name       = models.CharField(max_length=255)
    is_active       = models.BooleanField(default=True)
    is_system_admin = models.BooleanField(default=False)
    is_system_staff = models.BooleanField(default=False, blank=True, null=True)
    is_school_admin = models.BooleanField(default=False, blank=True, null=True)
    is_teacher      = models.BooleanField(default=False, blank=True, null=True)
    is_student      = models.BooleanField(default=False, blank=True, null=True)
    school                 = models.ForeignKey(School, related_name="school", verbose_name='school', on_delete=models.CASCADE, blank=True, null=True)
    date_created           = models.DateField(default=datetime.date.today, blank=True, null=True)

    objects = UserManager()


    USERNAME_FIELD      = 'username'

    REQUIRED_FIELDS     = ['email', 'first_name', 'last_name'] # full_name and date_of_b 

    def __str__(self):
        return self.username

    def get_full_name(self):
        if self.first_name and self.last_name:
            return self.first_name, self.last_name
        return self.username

    def get_short_name(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_superuser(self):
        return self.is_system_admin

    @property
    def is_staff(self):
        return self.is_system_admin





class Student(models.Model):
    user                = models.ForeignKey(User, related_name="students", on_delete=models.CASCADE, blank=True, null=True)
    image               = models.ImageField(upload_to=student_upload_path, blank=True, null=True)
    date_of_birth       = models.DateField(default=datetime.date.today, blank=True, null=True)
    gender              = models.CharField(max_length=10, blank=True, null=True)
    street              = models.CharField(max_length=255, blank=True, null=True)
    city                = models.CharField(max_length=255, blank=True, null=True)
    state               = models.CharField(max_length=255, blank=True, null=True)
    country             = models.CharField(max_length=255, blank=True, null=True)
    zip_code            = models.IntegerField(blank=True, null=True)
    father_name         = models.CharField(max_length=255, blank=True, null=True)
    mother_name         = models.CharField(max_length=255, blank=True, null=True)
    father_occupation   = models.CharField(max_length=255, blank=True, null=True)
    mother_occupation   = models.CharField(max_length=255, blank=True, null=True)
    father_phone        = models.IntegerField(blank=True, null=True)
    mother_phone        = models.IntegerField(blank=True, null=True)
    father_email        = models.EmailField(max_length=255, blank=True, null=True)
    mother_email        = models.EmailField(max_length=255, blank=True, null=True)
    emergency_contact1     = models.CharField(max_length=255, blank=True, null=True)
    emergency_contact2     = models.CharField(max_length=255, blank=True, null=True)
    blood_group            = models.CharField(max_length=5, blank=True, null=True)
    mother_tongue          = models.CharField(max_length=100, blank=True, null=True)
    father_annual_income   = models.IntegerField(blank=True, null=True)
    mother_annual_income   = models.IntegerField(blank=True, null=True)
    previous_school_info   = models.TextField(max_length=255, blank=True, null=True)
    class_of_admission     = models.CharField(max_length=255, blank=True, null=True)   
    year_of_admission      = models.IntegerField(blank=True, null=True)


    def __str__(self):
        return self.user.username

        

class Teacher(models.Model):
    user                = models.ForeignKey(User, related_name="teachers", on_delete=models.CASCADE, blank=True, null=True)
    image               = models.ImageField(upload_to=teacher_upload_path, blank=True, null=True)
    date_of_birth       = models.DateField(default=datetime.date.today, blank=True, null=True)
    gender              = models.CharField(max_length=10, blank=True, null=True)
    street              = models.CharField(max_length=255, blank=True, null=True)
    city                = models.CharField(max_length=255, blank=True, null=True)
    state               = models.CharField(max_length=255, blank=True, null=True)
    country             = models.CharField(max_length=255, blank=True, null=True)
    zip_code            = models.IntegerField(blank=True, null=True)
    years_of_experience = models.IntegerField(blank=True, null=True)
    academic_qualification = models.CharField(max_length=255, blank=True, null=True)
    phone                  = models.IntegerField(blank=True, null=True)
    emergency_contact1     = models.CharField(max_length=255, blank=True, null=True)
    emergency_contact2     = models.CharField(max_length=255, blank=True, null=True)
    blood_group            = models.CharField(max_length=5, blank=True, null=True)


    def __str__(self):
        return self.user.username