from django.contrib import admin
from .models import Project, Position, CompletionLog, Skill

# Register your models here.
admin.site.register(Project)
admin.site.register(Position)
admin.site.register(CompletionLog)
admin.site.register(Skill)
