#this is so only signed in users can access live chat, code was adapted from below
#https://stackoverflow.com/questions/65297148/django-channels-jwt-authentication

from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework_simplejwt.state import *
from channels.middleware import BaseMiddleware
from channels.auth import AuthMiddlewareStack
from urllib.parse import parse_qs
from jwt import decode as jwt_decode
from django.conf import settings
from channels.exceptions import DenyConnection



@database_sync_to_async
def get_user(user_id):
    User = get_user_model()
    try:
        return get_user_model().objects.get(id=user_id)
    except get_user_model.DoesNotExist:
        return None
		
class JwtAuthMiddleware(BaseMiddleware):
	async def __call__(self, scope, receive, send):
		
		token = parse_qs(scope["query_string"].decode("utf8"))["token"][0]
		if not token:
			raise DenyConnection
		try:
			UntypedToken(token)
		except(InvalidToken, TokenError):
			raise DenyConnection
		else:
			decoded_data = jwt_decode(token, settings.SECRET_KEY, algorithms=["HS256"])
			user_id = decoded_data.get("user_id")
			scope["user"] = await get_user(user_id)
		return await super().__call__(scope, receive, send)
	
		
