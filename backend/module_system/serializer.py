from rest_framework import serializers
from .models import *

class user_progress_serializer(serializers.ModelSerializer):
	class Meta:
		model = User_Progress
		fields = '__all__'
		
	
		
class user_completed_serializer(serializers.ModelSerializer):
	class Meta:
		model = User_Completion
		fields = '__all__'
		
		
class Lesson_serializer(serializers.ModelSerializer):
	class Meta:
		model = Lesson
		fields = '__all__'
