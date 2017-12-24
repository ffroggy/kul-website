from django.shortcuts import render


def load_page(request, template, context):
    return render(request, template, context)
