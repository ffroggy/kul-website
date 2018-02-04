from kulsite.views import load_page
from django.http import JsonResponse
from .models import Skill, Project, Position


def index(request):
    positions = Position.objects.all()
    pos_projects = []
    for pos in positions:
        pos_projects.append([pos, Project.objects.filter(positions__id=pos.id).order_by('-start_date')])
    context = {
        'curr_page': 'projects',
        'pos_projects': pos_projects,
    }
    return load_page(request, 'projects/index.html', context)


def ajax_skill(request, skill_id):
    skill_id = skill_id[1:]

    skill = Skill.objects.get(id=skill_id)
    projects = Project.objects.filter(skills__id=skill_id)
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


def ajax_project(request, proj_id):
    proj_id = proj_id[1:]
    project = Project.objects.get(id=proj_id)

    skill_out = []
    for skill in project.skills.all():
        skill_out.append({
            'name': skill.name,
            'img': skill.s_id,
            'show_logo': skill.show_logo,
            'show_text': skill.show_text,
        })

    project_out = {
        'status': "success",
        'name': project.name,
        'descr': project.description,
        'skills': skill_out,
    }

    return JsonResponse(project_out)
