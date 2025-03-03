from django.apps import AppConfig


class ModuleSystemConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'module_system'
    def ready(self):
    	import module_system.signals

