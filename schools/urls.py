from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import SchoolViewSet

router = DefaultRouter()
router.register(r'', SchoolViewSet, basename='schools')
# router.register(r'', RegisterViewSet, basename='registration')
urlpatterns = router.urls