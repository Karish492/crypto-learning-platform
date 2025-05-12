from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
	path('api/', include(router.urls)),

    # login-section

]
