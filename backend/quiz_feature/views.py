from django.shortcuts import render, redirect
from rest_framework import viewsets
from rest_framework.permissions import *
from .models import *
from .serializer import *

class quiz_view(viewsets.ModelViewSet):
	queryset = Quiz.objects.all()
	serializer_class = QuizSerializer
	permission_classes = [AllowAny]

class question_view(viewsets.ModelViewSet):
	queryset = Question.objects.all()
	serializer_class = QuestionSerializer
	permission_classes = [AllowAny]

class get_specific_question(viewsets.ModelViewSet):
	serializer_class = QuestionSerializer
	permission_classes = [AllowAny]

	def get_queryset(self):
		quiz_id = self.kwargs['quiz_id']
		question_id = self.kwargs['question_id']
		return Question.objects.filter(quiz_id=quiz_id).filter(question_id=question_id)

class answer_view(viewsets.ModelViewSet):
	queryset = Answer.objects.all()
	serializer_class = AnswerSerializer
	permission_classes = [AllowAny]

class quiz_tracking_view(viewsets.ModelViewSet):
	queryset = Quiz_Tracker.objects.all()
	serializer_class = QuizTrackerSerializer
	permission_classes = [AllowAny]


# User Views
class user_quiz_progress(viewsets.ModelViewSet):
	serializer_class = QuizTrackerSerializer
	permission_classes = [AllowAny]

	def get_queryset(self):
		user_id = self.kwargs['id']
		return Quiz_Tracker.objects.filter(user_id=user_id)

class quiz_tracking_specific(viewsets.ModelViewSet):
	serializer_class = QuizTrackerSerializer
	permission_classes = [AllowAny]

	def get_queryset(self):
		user_id = self.kwargs['id']
		quiz_id = self.kwargs['quiz_id']
		return Quiz_Tracker.objects.filter(user_id=user_id, quiz_id=quiz_id)
