from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'lesson', lesson_view, basename="lesson")
router.register(r'progress', lesson_tracking_view_all, basename="lesson tracker")
router.register(r'completion', user_completed_view, basename="completion")

urlpatterns = [
	path('api/', include(router.urls)),
	path('api/lesson-tracker/', lesson_tracking_view_all.as_view({'get':'list'})),
	path('api/lesson-tracker/user/<int:id>/', lesson_tracking_view.as_view({'get':'list'})),

 ]
