from forumapp.enums import ActivityActionEnum, ActivityTypeEnum
from django.db import models
from django.contrib.auth.models import User

class Vote(models.Model):
    type = models.CharField(max_length=1)
    model = models.CharField(max_length=20)
    model_id = models.IntegerField()
    date = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __repr__(self):
        return '{0} - {1} ({2})'.format(self.pk, self.type, self.date)

    def __str__(self):
        return '{0} - {1} ({2})'.format(self.pk, self.type, self.date)

class Category(models.Model):
    name = models.CharField(max_length=250)
    description = models.CharField(max_length=1000)
    created_date = models.DateField()

    def __repr__(self):
        return '{0} - {1} ({2})'.format(self.pk, self.name, self.created_date)

    def __str__(self):
        return '{0} - {1} ({2})'.format(self.pk, self.name, self.created_date)

class Post(models.Model):
    title = models.CharField(max_length=1000)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    content = models.CharField(max_length=5000, blank=True, null=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    created_date = models.DateField()
    modified_date = models.DateField()
    rating = models.IntegerField()
    is_answered = models.BooleanField()
    selected_answer_id = models.IntegerField(blank=True, null=True)

    def __repr__(self):
        return '{0} - {1} ({2})'.format(self.pk, self.title, self.created_date)

    def __str__(self):
        return '{0} - {1} ({2})'.format(self.pk, self.title, self.created_date)

class Answer(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.CharField(max_length=5000)
    created_date = models.DateField()
    modified_date = models.DateField()

    def __repr__(self):
        return '{0} - {1} ({2})'.format(self.pk, self.creator.username, self.created_date)

    def __str__(self):
        return '{0} - {1} ({2})'.format(self.pk, self.creator.username, self.created_date)

class Activity(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    model = models.CharField(
        max_length=20,
        choices=ActivityTypeEnum.choices()
    )
    action = models.CharField(
        max_length=20,
        choices=ActivityActionEnum.choices()
    )
    model_id = models.IntegerField()
    created_date = models.DateTimeField()

    def __repr__(self):
        return '{0} - {1} {2} {3} ({4})'.format(self.pk, self.creator.username, self.action, self.model, self.created_date)

    def __str__(self):
        return '{0} - {1} {2} {3} ({4})'.format(self.pk, self.creator.username, self.action, self.model, self.created_date)
