from django.apps import AppConfig


class QuizFeatureConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'quiz_feature'
    def ready(self):
    	import quiz_feature.signals

