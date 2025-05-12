from django.shortcuts import render, redirect
from rest_framework import viewsets
from rest_framework.permissions import *
from .models import *
from .serializer import *

# Create your views here. 
class lesson_view(viewsets.ReadOnlyModelViewSet):
	queryset = Lesson.objects.all()
	serializer_class = Lesson_serializer
	permission_classes = [AllowAny]  
	
class module_view(viewsets.ReadOnlyModelViewSet):
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
	
class lesson_tracking_specific(viewsets.ModelViewSet):
	serializer_class = lesson_tracking_serializer
	permission_classes = [AllowAny]
	lookup_field = 'user'
	
	def get_queryset(self):
		user_id = self.kwargs['user']
		lesson_id = self.kwargs['l_id']
		return Lesson_Tracking.objects.filter(user_id=user_id).filter(lesson=lesson_id)	

	
		
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
		
class module_tracking_specific(viewsets.ModelViewSet):
	serializer_class = module_tracking_serializer
	permission_classes = [AllowAny]
	
	def get_queryset(self):
		user_id = self.kwargs['id']
		module_id = self.kwargs['m_id']
		return Module_Tracking.objects.filter(user_id=user_id).filter(Module=module_id)	
		
class user_completed_view(viewsets.ModelViewSet):
	queryset = User_Completion.objects.all()
	serializer_class = user_completed_serializer
	permission_classes = [AllowAny]
	
class user_progress_view(viewsets.ModelViewSet):
	queryset = User_Progress.objects.all()
	serializer_class = User_progress_serializer
	permission_classes = [AllowAny]
	
class user_progress_specific(viewsets.ModelViewSet):
	serializer_class = User_progress_serializer
	permission_classes = [AllowAny]
	
	def get_queryset(self):
		user_id = self.kwargs['id']
		return User_Progress.objects.filter(user_id=user_id)
		
		
	
class user_completion_specific(viewsets.ModelViewSet):
	serializer_class = user_completed_serializer
	permission_classes = [AllowAny]
	
	def get_queryset(self):
		user_id = self.kwargs['id']
		return User_Completion.objects.filter(user_id=user_id)

class module_lessons(viewsets.ReadOnlyModelViewSet):
	serializer_class = Lesson_serializer
	permission_classes = [AllowAny]

	def get_queryset(self):
		module_id = self.kwargs['id']
		return Lesson.objects.filter(module=module_id)