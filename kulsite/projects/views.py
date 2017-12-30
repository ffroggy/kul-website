from kulsite.views import load_page
from django.http import JsonResponse
from .models import Skill, Project


def index(request):
    context = {
        'curr_page': 'projects'
    }
    return load_page(request, 'projects/index.html', context)


def ajax_skill(request, skill_id):
    skill = Skill.objects.filter(s_id=skill_id).first()
    projects = Project.objects.filter(skills__s_id=skill_id)
    proj_out = []
    for project in projects:
        proj_out.append({
            'id': project.pk,
            'name': project.name,
            'descr': project.description,
            'start': project.start_date,
            'end': project.end_date,
            'mag': project.magnitude,
            'mag_nice': project.get_magnitude_display(),
        })

    if not skill:
        return JsonResponse({'result': 'bad skill_id'})

    skill_out = {
        'status': 'success',
        'name': skill.name,
        'descr': skill.description,
        'prof': skill.proficiency,
        'proj': proj_out,
    }
    return JsonResponse(skill_out)
