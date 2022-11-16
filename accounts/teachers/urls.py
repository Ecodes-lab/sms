from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
from accounts.views import TeacherImageViewSet

router = DefaultRouter()
router.register(r'', TeacherImageViewSet, basename='teachers-image')
urlpatterns = router.urls

# urlpatterns += format_suffix_patterns([
#     # API to map the student record
#     router.register(r'',
#         TeacherViewSet.as_view(),
#         basename='teachers'),
#     # url(r'^api/univstud/$',
#     #     views.StudentRecordView.as_view(),
#     #     name='students_list'),
# ])
# urlpatterns = router.urls