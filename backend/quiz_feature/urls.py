from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'quiz', quiz_view, basename="quiz")
router.register(r'question', question_view, basename="question")
router.register(r'answer', answer_view, basename="answer")
router.register(r'quiz-progress', quiz_tracking_view, basename="quiz progress")
router.register(r'question-progress', question_tracking_view, basename="question tracking")

# Use these for specific tracking and user views
urlpatterns = [
	path('api/', include(router.urls)),
	path('api/question-tracker/user/<int:id>/', overall_question_progess.as_view({'get': 'list'})),
	path('api/question-tracker/user/<int:id>/question/<int:q_id>/', question_progress.as_view({'get': 'list'})),
	path('api/quiz-tracker/user/<int:id>/', user_quiz_progress.as_view({'get': 'list'})),
	path('api/quiz-tracker/user/<int:id>/quiz/<int:quiz_id>/', quiz_tracking_specific.as_view({'get': 'list'})),
    
]