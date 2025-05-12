from rest_framework import serializers
from .models import *

class AnswerSerializer(serializers.ModelSerializer):
	class Meta:
		model = Answer
		fields = ['id', 'text', 'is_correct']


class QuestionSerializer(serializers.ModelSerializer):
	answers = AnswerSerializer(many=True, source='answer_set', read_only=True)

	class Meta:
		model = Question
		fields = ['question_id', 'question_number', 'text', 'answers']


class QuizSerializer(serializers.ModelSerializer):
	questions = QuestionSerializer(many=True, source='question_set', read_only=True)

	class Meta:
		model = Quiz
		fields = ['quiz_id', 'title', 'description', 'questions']


class QuizTrackerSerializer(serializers.ModelSerializer):


	class Meta:
		model = Quiz_Tracker
		fields = '__all__'


