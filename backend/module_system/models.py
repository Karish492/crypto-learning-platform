from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Module(models.Model):
	module_id = models.PositiveIntegerField(primary_key=True)
	title = models.CharField(max_length=255)
	description = models.TextField()
	
	def __str__(self):
		return self.title

class Lesson(models.Model):
	module = models.ForeignKey(Module, on_delete=models.CASCADE)
	lesson_id = models.PositiveIntegerField(primary_key=True)
	title = models.CharField(max_length=255)
	text = models.TextField()
	
	def __str__(self):
   	     return f' {self.lesson_id} . {self.title}'

class Lesson_Tracking(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
	completed = models.BooleanField(default=False)

	class Meta:
		unique_together = ('user', 'lesson')

	def __str__(self):
		return f'{self.user.username} - {self.lesson.title} - Completed: {self.completed}'
        	
        	
class Module_Tracking(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	Module = models.ForeignKey(Module, on_delete=models.CASCADE)
	completed = models.BooleanField(default=False)
	
	
	def __str__(self):
		return f'{self.user.username} - {self.Module.title} - Completed: {self.completed}'
	
        	
class User_Completion(models.Model):
    	user = models.ForeignKey(User, on_delete=models.CASCADE)
    	completed = models.BooleanField(default=False)
    	completion_date = models.DateTimeField(null=True, blank=True)
    	
class User_Progress(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	lesson_completion = models.DecimalField(default=0.0, max_digits=4, decimal_places=2)
	module_completion = models.DecimalField(default=0.0, max_digits=4, decimal_places=2)
	
	def __str__(self):
		return f'{self.user.username} - Progress'



