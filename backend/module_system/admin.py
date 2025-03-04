from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Lesson)
admin.site.register(Module)
admin.site.register(Lesson_Tracking)
admin.site.register(User_Completion)
admin.site.register(Module_Tracking)
