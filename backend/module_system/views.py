from django.shortcuts import render, redirect
from rest_framework import viewsets
from rest_framework.permissions import *
from .models import *
from .serializer import *

# Create your views here. 
class lesson_view(viewsets.ModelViewSet):
	queryset = Lesson.objects.all()
	serializer_class = Lesson_serializer
	permission_classes = [AllowAny]  
	
class user_progress_view(viewsets.ModelViewSet):
	queryset = User_Progress.objects.all()
	serializer_class = user_progress_serializer
	permission_classes = [AllowAny] # Should be IsAuthenticated but this is for testing
	
class user_completed_view(viewsets.ModelViewSet):
	queryset = User_Completion.objects.all()
	serializer_class = user_completed_serializer
	permission_classes = [AllowAny]
