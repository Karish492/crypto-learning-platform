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
		fields = ['question_id', 'text', 'answers']


class QuizSerializer(serializers.ModelSerializer):
	questions = QuestionSerializer(many=True, source='question_set', read_only=True)

	class Meta:
		model = Quiz
		fields = ['quiz_id', 'title', 'description', 'questions']


class QuizProgressSerializer(serializers.ModelSerializer):
	user = serializers.StringRelatedField(read_only=True)
	quiz = serializers.StringRelatedField(read_only=True)

	class Meta:
		model = Quiz_Progress
		fields = ['user', 'quiz', 'completed', 'score']


class QuestionProgressSerializer(serializers.ModelSerializer):
	user = serializers.StringRelatedField(read_only=True)
	question = serializers.StringRelatedField(read_only=True)
	selected_answer = serializers.StringRelatedField()

	class Meta:
		model = Question_Progress
		fields = ['user', 'question', 'selected_answer']
