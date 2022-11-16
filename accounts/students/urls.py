from django.urls import path
from rest_framework.routers import DefaultRouter
from accounts.views import StudentImageViewSet

router = DefaultRouter()
# router.register(r'', StudentViewSet, basename='students')
router.register(r'', StudentImageViewSet, basename='students-image')
urlpatterns = router.urls