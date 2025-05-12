from django.shortcuts import render
import requests
from django.http import JsonResponse
# Create your views here.

def get_news(request):
    data = requests.get("https://newsapi.org/v2/everything?q=bitcoin&apiKey=f23b97dffae445f0b2ed00fc5f353ddf")
    return JsonResponse(data.json())