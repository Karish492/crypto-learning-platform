from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'quiz', quiz_view, basename="quiz")
router.register(r'question', question_view, basename="question")
router.register(r'answer', answer_view, basename="answer")
router.register(r'quiz-tracker', quiz_tracking_view, basename="quiz progress")

# Use these for specific tracking and user views
urlpatterns = [
	path('api/', include(router.urls)),
	path('api/quiz-tracker/user/<int:id>/', user_quiz_progress.as_view({'get': 'list'})),
	path('api/quiz-tracker/user/<int:user>/quiz/<int:quiz_id>/', quiz_tracking_specific.as_view({'get': 'list', 'patch':'update'})),
    path('api/quiz/<int:quiz_id>/<int:question_number>/', get_specific_question.as_view({'get':'list'})), #to get specific question - first is quiz id and second is to get question from the quiz
]
