from django.urls import path , include
from chat_feature.consumers import *

websocket_urlpatterns = [
    path('api/chat/' , ChatConsumer.as_asgi()) , 
] 

