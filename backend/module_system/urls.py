from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'lesson', lesson_view, basename="lesson")
router.register(r'progress', user_progress_view_all, basename="progress")
router.register(r'completion', user_completed_view, basename="completion")

urlpatterns = [
	path('api/', include(router.urls)),
	path('api/progress/', user_progress_view_all.as_view({'get':'list'})),
	path('api/progress/user/<int:id>/', user_progress_view.as_view({'get':'list'})),

 ]
