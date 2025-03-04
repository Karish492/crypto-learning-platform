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
	module = instance.lesson.module
	lesson_count = module.lesson_set.count()
	completed_lesson = Lesson_Tracking.objects.filter(user=instance.user, lesson__module=module, completed=True).count()
	module_tracking= Module_Tracking.objects.filter(user=instance.user, Module=module).get()
	if lesson_count == completed_lesson:
		module_tracking.completed=True
	module_tracking.save()

