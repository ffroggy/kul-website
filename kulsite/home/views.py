from django.shortcuts import render, HttpResponse
from kulsite.views import load_page


def index(request):
    return load_page(request, 'home/index.html', {})
