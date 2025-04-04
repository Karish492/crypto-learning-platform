from django.urls import path , include
from chat_feature.consumers import *

websocket_urlpatterns = [
    path('' , ChatConsumer.as_asgi()) , 
] 

