from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register(r'', UserViewSet, basename='users')
# router.register(r'', RegisterViewSet, basename='registration')
urlpatterns = router.urls
