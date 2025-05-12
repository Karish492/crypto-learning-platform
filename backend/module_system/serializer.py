from rest_framework import serializers
from .models import *

class lesson_tracking_serializer(serializers.ModelSerializer):
	class Meta:
		model = Lesson_Tracking
		fields = '__all__'
		

class module_tracking_serializer(serializers.ModelSerializer):
	class Meta:
		model = Module_Tracking
		fields = '__all__'
		
class user_completed_serializer(serializers.ModelSerializer):
	class Meta:
		model = User_Completion
		fields = '__all__'
		
		
class Lesson_serializer(serializers.ModelSerializer):
	class Meta:
		model = Lesson
		fields = '__all__'
	
	
class Module_serializer(serializers.ModelSerializer):
	class Meta:
		model = Module
		fields = '__all__'
		
class User_progress_serializer(serializers.ModelSerializer):
	class Meta:
		model = User_Progress
		fields = '__all__'
