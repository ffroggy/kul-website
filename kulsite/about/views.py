from django.shortcuts import render, HttpResponse


def index(request):
    return HttpResponse("Hi, this is the about page!")
