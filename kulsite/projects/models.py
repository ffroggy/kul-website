from django.db import models


class Skill(models.Model):
    name = models.TextField(default="")
    description = models.TextField(default="")
    s_id = models.TextField(default="")
    show_logo = models.BooleanField(default=True)
    show_text = models.BooleanField(default=False)
    proficiency = models.IntegerField(default=1)


class Position(models.Model):
    title = models.TextField(default="")
    organization = models.TextField(default="")
    description = models.TextField(default="")
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)

    @property
    def current_position(self):
        return self.end_date is None


class Project(models.Model):
    name = models.TextField(default="")
    skills = models.ManyToManyField(Skill)
    description = models.TextField(default="")
    positions = models.ManyToManyField(Position)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)

    @property
    def current_project(self):
        return self.end_date is None


class CompletionLog(models.Model):
    date = models.DateField(auto_now_add=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.CharField(max_length=30, default="Project Update")
    percentage_complete = models.IntegerField(default=0)
