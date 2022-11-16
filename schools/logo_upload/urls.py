from django.urls import path
from rest_framework.routers import DefaultRouter
from schools.views import SchoolImageViewSet

router = DefaultRouter()
router.register(r'', SchoolImageViewSet, basename='schoologo')
# router.register(r'', RegisterViewSet, basename='registration')
urlpatterns = router.urls