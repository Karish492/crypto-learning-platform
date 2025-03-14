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
	
class module_view(viewsets.ModelViewSet):
	queryset = Module.objects.all()
	serializer_class = Module_serializer
	permission_classes = [AllowAny]
	
class lesson_tracking_view_all(viewsets.ModelViewSet):
	queryset = Lesson_Tracking.objects.all()
	serializer_class = lesson_tracking_serializer
	permission_classes = [AllowAny] 
	
	
	
class lesson_tracking_view(viewsets.ModelViewSet):

	serializer_class = lesson_tracking_serializer
	permission_classes = [AllowAny] # Should be IsAuthenticated but this is for testing / depends on how front end is setup

	def get_queryset(self):
		user_id = self.kwargs['id']
		return Lesson_Tracking.objects.filter(user_id=user_id)
		
class module_tracking_view_all(viewsets.ModelViewSet):
	queryset = Module_Tracking.objects.all()
	serializer_class = module_tracking_serializer
	permission_classes = [AllowAny]
	
class module_tracking_view(viewsets.ModelViewSet):
	serializer_class = module_tracking_serializer
	permission_classes = [AllowAny]
	
	def get_queryset(self):
		user_id = self.kwargs['id']
		return Module_Tracking.objects.filter(user_id=user_id)
		
class user_completed_view(viewsets.ModelViewSet):
	queryset = User_Completion.objects.all()
	serializer_class = user_completed_serializer
	permission_classes = [AllowAny]
