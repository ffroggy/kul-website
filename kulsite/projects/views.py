from kulsite.views import load_page
from django.http import JsonResponse
from .models import Skill


def index(request):
    context = {
        'curr_page': 'projects'
    }
    return load_page(request, 'projects/index.html', context)


def ajax_skill(request, skill_id):
    skill = Skill.objects.filter(s_id=skill_id).first()
    if not skill:
        return JsonResponse({'result': 'bad skill_id'})

    skill_out = {
        'status': 'success',
        'name': skill.name,
        'descr': skill.description,
        'prof': skill.proficiency,
    }
    return JsonResponse(skill_out)
