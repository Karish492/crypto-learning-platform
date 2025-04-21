from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import *
from django.db import transaction
from datetime import date

@receiver(post_save, sender=User)
def create_quiz_tracker(sender, instance, created, **kwargs):
	if created:
		quizzes = Quiz.objects.all()
		for quiz in quizzes:
			Quiz_Progress.objects.create(user=instance, quiz=quiz, completed=False, score=0.0)
		
@receiver(post_save, sender=User)
def create_question_tracker(sender, instance, created, **kwargs):
	if created:
		questions = Question.objects.all()
		for question in questions:
			Question_Progress.objects.create(user=instance, question=question)

@receiver(post_save, sender=Question_Progress)
def update_quiz_tracker(sender, instance, **kwargs):
	quiz = instance.question.quiz
	questions = quiz.question_set.all()
	answered = Question_Progress.objects.filter(user=instance.user, question__in=questions).exclude(selected_answer=None)

	if answered.count() == questions.count():
		score = 0
		for qtrack in answered:
			if qtrack.selected_answer and qtrack.selected_answer.is_correct:
				score += 1

		total = questions.count()
		percentage = round((score / total) * 100, 2)

		tracking, created = Quiz_Progress.objects.get_or_create(user=instance.user, quiz=quiz)
		tracking.completed = True
		tracking.score = percentage
		tracking.save()






