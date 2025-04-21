from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Quiz(models.Model):
	quiz_id = models.PositiveIntegerField(primary_key=True)
	title = models.CharField(max_length=255)
	description = models.TextField()
	
	def __str__(self):
		return f'{self.quiz_id} . {self.title}'

class Question(models.Model):
	quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
	question_id = models.PositiveIntegerField(primary_key=True)
	text = models.TextField()
	
	def __str__(self):
   	     return f'{self.quiz} - {self.question_id} . {self.text}'
	
class Answer(models.Model):
	question = models.ForeignKey(Question, on_delete=models.CASCADE)
	text = models.CharField(max_length=255)
	is_correct = models.BooleanField(default=False)

	def __str__(self):
		return f'Answer to Q{self.question.question_id}: {self.text}'

class Quiz_Progress(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
	completed = models.BooleanField(default=False)
	score = models.DecimalField(default=0.0, max_digits=5, decimal_places=2)

	class Meta:
		unique_together = ('user', 'quiz')
	def __str__(self):
		return f'{self.user.username}: {self.quiz.title} - Score: {self.score} - Completed: {self.completed}'
        	
        	


