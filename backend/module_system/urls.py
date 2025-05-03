from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'lesson', lesson_view, basename="lesson")
router.register(r'completion', user_completed_view, basename="completion")
router.register(r'module', module_view, basename="module")
router.register(r'user-progress', user_progress_view, basename="user progress")

#use these ones for tracking progress. Use routers for lessons & modules
urlpatterns = [
	path('api/', include(router.urls)),
	path('api/lesson-tracker/user/<int:id>/', lesson_tracking_view.as_view({'get':'list'})),
	path('api/lesson-tracker/user/<int:user>/lesson/<int:l_id>/', lesson_tracking_specific.as_view({'get':'list', 'patch': 'update'})),
	path('api/module-tracker/user/<int:id>/', module_tracking_view.as_view({'get':'list'})),
	path('api/module-tracker/user/<int:id>/module/<int:m_id>/', module_tracking_specific.as_view({'get':'list'})),
	path('api/user-progress/user/<int:id>/', user_progress_specific.as_view({'get':'list'})),
	path('api/user-completion/user/<int:id>/', user_completion_specific.as_view({'get':'list'})),
	path('api/module/<int:id>/lessons/', module_lessons.as_view({'get':'list'})),
 ]
