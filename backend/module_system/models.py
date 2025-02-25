from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Lesson(models.Model):
	lesson_id = models.PositiveIntegerField(primary_key=True)
	title = models.CharField(max_length=255)
	text = models.TextField()
	
	def __str__(self):
   	     return self.title

class User_Progress(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	Lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
	completed = models.BooleanField(default=False)

	class Meta:
		unique_together = ('user', 'Lesson')

	def __str__(self):
		return f'{self.user.username} - {self.Lesson.title} - Completed: {self.completed}'
        	
class User_Completion(models.Model):
    	user = models.ForeignKey(User, on_delete=models.CASCADE)
    	completed = models.BooleanField(default=False)
    	completion_date = models.DateTimeField(null=True, blank=True)


