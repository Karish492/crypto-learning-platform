from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import *

#https://www.geeksforgeeks.org/how-to-create-and-use-signals-in-django/
@receiver(post_save, sender=User)
def create_user_completion(sender, instance, created, **kwargs):
	if created:
		User_Completion.objects.create(user=instance, completed=False)
		
@receiver(post_save, sender=User)
def create_user_progress(sender, instance, created, **kwargs):
	if created:
		lessons = Lesson.objects.all()
		for lesson in lessons:
			User_Progress.objects.create(user=instance, Lesson=lesson, completed=False)
		
