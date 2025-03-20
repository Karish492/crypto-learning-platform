from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import *
from django.db import transaction
from datetime import date


#https://www.geeksforgeeks.org/how-to-create-and-use-signals-in-django/
@receiver(post_save, sender=User)
def create_user_completion(sender, instance, created, **kwargs):
	if created:
		User_Completion.objects.create(user=instance, completed=False)
		
@receiver(post_save, sender=User)
def create_lesson_tracking(sender, instance, created, **kwargs):
	if created:
		lessons = Lesson.objects.all()
		for lesson in lessons:
			Lesson_Tracking.objects.create(user=instance, lesson=lesson, completed=False)
@receiver(post_save, sender=User)		
def create_module_tracking(sender, instance, created, **kwargs):
	if created:
		modules = Module.objects.all()
		for module in modules:
			Module_Tracking.objects.create(user=instance, Module=module, completed=False)

@receiver(post_save, sender=Lesson_Tracking)
def update_module_completion(sender, instance, **kwargs):
	if instance.completed: #when the completed field is set to true
		module = instance.lesson.module
		lesson_count = module.lesson_set.count()
		completed_lesson = Lesson_Tracking.objects.filter(user=instance.user, lesson__module=module, completed=True).count()
		module_tracking = Module_Tracking.objects.filter(user=instance.user, Module=module).get()
		if lesson_count == completed_lesson:
			module_tracking.completed=True
		module_tracking.save()

@receiver(post_save, sender=User)
def create_user_progress(sender, instance, created, **kwargs):
	if created:
		User_Progress.objects.create(user=instance)
		
@receiver(post_save, sender=Module_Tracking)
def update_completion(sender, instance,**kwargs):
	if instance.completed:
		module_count = Module.objects.all().count()
		completed_modules = Module_Tracking.objects.filter(user=instance.user, completed=True).count()
		completion = User_Completion.objects.filter(user=instance.user).get()
		if module_count == completed_modules:
			completion.completed = True
			completion.completion_date = date.today()
		completion.save()
		

@receiver(post_save, sender=Module_Tracking)
def update_user_progress_MODULE(sender, instance, created, **kwargs):
	if instance.completed:	
		module_count = Module.objects.all().count()
		completed_modules = Module_Tracking.objects.filter(user=instance.user, completed=True).count()
		percentage = round(((completed_modules / module_count)*100), 2) # rounds to 2 dp
		print("percentage: " ,percentage)
		user_progress = User_Progress.objects.filter(user=instance.user).get()
		user_progress.module_completion = percentage
		user_progress.save()


@receiver(post_save, sender=Lesson_Tracking)
def update_user_progress_LESSON(sender, instance, created, **kwargs):
	if instance.completed:	
		lesson_count = Lesson.objects.all().count()
		completed_lessons = Lesson_Tracking.objects.filter(user=instance.user, completed=True).count()
		percentage = round(((completed_lessons / lesson_count)*100), 2) # rounds to 2 dp
		print("percentage: " ,percentage)
		user_progress = User_Progress.objects.filter(user=instance.user).get()
		user_progress.lesson_completion = percentage
		user_progress.save()






