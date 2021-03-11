from forumapp.models import Activity, Answer, Category, Post, Vote
from django.contrib import admin

# Register your models here.
admin.site.register(Post)
admin.site.register(Answer)
admin.site.register(Category)
admin.site.register(Vote)
admin.site.register(Activity)