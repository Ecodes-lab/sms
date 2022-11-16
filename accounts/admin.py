from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import Teacher, Student

User = get_user_model()

class UserAdmin(BaseUserAdmin):

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('username', 'first_name', 'last_name', 'email', 'school', 'is_system_admin',  'is_system_staff', 'is_school_admin', 'is_teacher', 'is_student')
    list_filter = ('is_system_admin', 'is_system_staff', 'is_school_admin', 'is_teacher', 'is_student')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('School', {'fields': ('school',)}),
        ('Personal info', {'fields': ('username', 'first_name', 'last_name',)}),
        ('Permissions', {'fields': ('is_system_admin', 'is_school_admin', 'is_system_staff', 'is_teacher', 'is_student')}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()

# Now register the new UserAdmin...
admin.site.register(User, UserAdmin)
admin.site.register(Teacher)
admin.site.register(Student)
# ... and, since we're not using Django's built-in permissions,
# unregister the Group model from admin.
admin.site.unregister(Group)
