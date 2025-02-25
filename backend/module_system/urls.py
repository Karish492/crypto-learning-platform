from django.urls import path, include
from rest_framework.routers import *
from .views import *

router = DefaultRouter()

urlpatterns = [
	path('api/', include(router.urls)),
	path('api/lesson/', lesson_view.as_view({'get':'list'}), name='lesson'),
	path('api/progress/', user_progress_view.as_view({'get':'list'}), name='progress'),
	path('api/completion/', user_completed_view.as_view({'get':'list'}), name='completion'),
 ]
