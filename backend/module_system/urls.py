from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'lesson', lesson_view, basename="lesson")
router.register(r'lesson-completion', lesson_tracking_view_all, basename="lesson tracker")
router.register(r'completion', user_completed_view, basename="completion")
router.register(r'module', module_view, basename="module")
router.register(r'module-completion', module_tracking_view_all, basename="module tracking")
router.register(r'user-progress', user_progress_view, basename="user progress")

#dont use these, use the router ones
urlpatterns = [
	path('api/', include(router.urls)),
	path('api/lesson-tracker/', lesson_tracking_view_all.as_view({'get':'list'})),
	path('api/lesson-tracker/user/<int:id>/', lesson_tracking_view.as_view({'get':'list'})),
	path('api/module-tracker/', module_tracking_view_all.as_view({'get':'list'})),
	path('api/module-tracker/user/<int:id>/', module_tracking_view.as_view({'get':'list'})),
	path('api/user-progress/', user_progress_view.as_view({'get':'list'})),
 ]
