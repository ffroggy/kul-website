from django.db import models


class Skill(models.Model):
    name = models.TextField(default="")
    description = models.TextField(default="")
    s_id = models.TextField(default="")
    show_logo = models.BooleanField(default=True)
    show_text = models.BooleanField(default=False)
    proficiency = models.IntegerField(default=1)  # Expecting an integer value between 1 and 5

    def __str__(self):
        return str(self.name)+": "+str(self.proficiency)+"/5"


class Position(models.Model):
    title = models.TextField(default="")
    organization = models.TextField(default="")
    description = models.TextField(default="")
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)

    @property
    def current_position(self):
        return self.end_date is None

    def __str__(self):
        return str(self.title)+" at "+str(self.organization)


class Project(models.Model):
    STATUSES = (
        ('ip', 'In Progress'),
        ('fn', 'Finished'),
        ('dp', 'Deprecated'),
        ('uf', 'Unfinished'),
        ('bb', 'Back Burner'),
        ('up', 'Upcoming'),
    )
    MAGNITUDES = (
        ('sm', 'Small'),
        ('md', 'Medium'),
        ('lg', 'Large')
    )

    name = models.TextField(default="")
    skills = models.ManyToManyField(Skill)
    description = models.TextField(default="")
    positions = models.ManyToManyField(Position)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=2, default='ip', choices=STATUSES)
    magnitude = models.CharField(max_length=2, default='sm', choices=MAGNITUDES)

    @property
    def current_project(self):
        return self.end_date is None

    def __str__(self):
        return self.name


class CompletionLog(models.Model):
    date = models.DateField(auto_now_add=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.CharField(max_length=30, default="Project Update")
    percentage_complete = models.IntegerField(default=0)  # Expected to be an integer between 0 and 100

    def __str__(self):
        return str(self.project)+": "+str(self.title)+", "+str(self.percentage_complete)+"% complete on"+str(self.date)
