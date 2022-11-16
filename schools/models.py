from django.db import models
# from django.contrib.auth import get_user_model
import datetime
# from django.contrib.auth import get_user_model
# User = get_user_model()

def school_upload_path(instance, filename):
    return "/".join(['uploaded files/school/logo', str(instance.name), filename])

class School(models.Model):
    # user        = models.ForeignKey(User, related_name="school", on_delete=models.CASCADE)
    name        = models.CharField(max_length=255)
    logo        = models.ImageField(upload_to=school_upload_path, blank=True, null=True)
    street      = models.CharField(max_length=255)
    city        = models.CharField(max_length=255)
    state       = models.CharField(max_length=255)
    country     = models.CharField(max_length=255)
    zipcode     = models.IntegerField()
    owner_name  = models.CharField(max_length=255)
    phone       = models.IntegerField()
    fax         = models.CharField(max_length=20)
    email       = models.EmailField(max_length=100)
    website     = models.URLField()


    def __str__(self):
        return self.name

# class SchoolAdmin(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.user.username

