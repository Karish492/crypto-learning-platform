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
			Quiz_Tracker.objects.create(user=instance, quiz=quiz, completed=False, score=0.0)






