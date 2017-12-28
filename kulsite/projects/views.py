from kulsite.views import load_page
from django.http import JsonResponse


def index(request):
    context = {
        'curr_page': 'projects'
    }
    return load_page(request, 'projects/index.html', context)


def ajax_skill(request, skill_id):
    skill = {'skill': skill_id}
    return JsonResponse(skill)
