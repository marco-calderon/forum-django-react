from forumapp.enums import ActivityActionEnum, ActivityTypeEnum
from django.contrib.auth.models import User
from forumapp.models import Activity, Answer, Category, Post, Vote
from graphene_django import DjangoObjectType
import graphene
from datetime import datetime
import graphql_jwt
from graphql_jwt.decorators import login_required
from django.dispatch import receiver
from graphql_jwt.refresh_token.signals import refresh_token_rotated

# Revoke refresh
@receiver(refresh_token_rotated)
def revoke_refresh_token(sender, request, refresh_token, **kwargs):
    refresh_token.revoke(request)

class VoteType(DjangoObjectType):
    class Meta:
        model = Vote
        fields = ('id', 'type', 'model', 'model_id', 'date', 'user')

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ('id', 'username')

class AnswerType(DjangoObjectType):
    upvotes = graphene.Field(graphene.Int)
    downvotes = graphene.Field(graphene.Int)

    def resolve_upvotes(self, info):
        return Vote.objects.filter(model='Answer', model_id=self.id, type='U').count()

    def resolve_downvotes(self, info):
        return Vote.objects.filter(model='Answer', model_id=self.id, type='D').count()

    class Meta:
        model = Answer
        fields = ('id', 'content', 'creator', 'post', 'created_date', 'modified_date', 'upvotes', 'downvotes')

class PostType(DjangoObjectType):
    answers = graphene.List(AnswerType)
    upvotes = graphene.Field(graphene.Int)
    downvotes = graphene.Field(graphene.Int)
    selected_answer = graphene.Field(AnswerType)
    answers_count = graphene.Field(graphene.Int)

    def resolve_upvotes(self, info):
        return Vote.objects.filter(model='Post', model_id=self.id, type='U').count()

    def resolve_downvotes(self, info):
        return Vote.objects.filter(model='Post', model_id=self.id, type='D').count()

    def resolve_answers(self, info):
        return Answer.objects.filter(post__id=self.id)

    def resolve_selected_answer(self, info):
        return Answer.objects.filter(id=self.selected_answer_id).first()

    def resolve_answers_count(self, info):
        return Answer.objects.filter(post__id=self.id).count()

    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'category', 'creator', 'created_date', 'modified_date', 'rating', 'upvotes', 'downvotes', 'answers', 'is_answered', 'selected_answer_id', 'answers_count')

class CategoryType(DjangoObjectType):
    posts = graphene.List(PostType)
    posts_count = graphene.Field(graphene.Int)

    def resolve_posts(self, info):
        return Post.objects.filter(category__id=self.id)

    def resolve_posts_count(self, info):
        return Post.objects.filter(category__id=self.id).count()

    class Meta:
        model = Category
        fields = ('id', 'name', 'description', 'created_date', 'posts', 'posts_count')

class ActivityType(DjangoObjectType):
    class Meta:
        model = Activity
        fields = ('id', 'model', 'model_id', 'action', 'created_date', 'creator')

class AnswerMutation(graphene.Mutation):
    class Arguments:
        content = graphene.String(required=True)
        post_id = graphene.Int(required=True)
    
    answer = graphene.Field(AnswerType)

    @classmethod
    @login_required
    def mutate(cls, root, info, content, post_id):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        answer = Answer(
            content=content,
            creator=user,
            created_date=datetime.now(),
            modified_date=datetime.now(),
            post=Post.objects.get(id=post_id)
        )
        answer.save()

        # Add activity record
        Activity(
            creator=user,
            type=ActivityTypeEnum.ANSWER,
            type_id=answer.id,
            action=ActivityActionEnum.CREATED,
            created_date=datetime.now()
        ).save()

        return AnswerMutation(answer=answer)

class PostMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        content = graphene.String(required=True)
        category_id = graphene.Int(required=True)

    post = graphene.Field(PostType)

    @classmethod
    @login_required
    def mutate(cls, root, info, title, content, category_id):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        post = Post(
            title=title,
            content=content,
            creator=user,
            created_date=datetime.now(),
            modified_date=datetime.now(),
            category=Category.objects.get(id=category_id),
            rating=0,
            is_answered=False
        )
        post.save()

        # Add activity record
        Activity(
            creator=user,
            type=ActivityTypeEnum.POST,
            type_id=post.id,
            action=ActivityActionEnum.CREATED,
            created_date=datetime.now()
        ).save()

        return PostMutation(post=post)

class AnsweredPostMutation(graphene.Mutation):
    class Arguments:
        post_id = graphene.Int(required=True)
        answer_id = graphene.Int(required=True)

    post = graphene.Field(PostType)
    answer = graphene.Field(AnswerType)

    @classmethod
    @login_required
    def mutate(cls, root, info, post_id, answer_id):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')

        # Check if it is owner
        post = Post.objects.filter(id=post_id, creator__id=user.id).first()
        answer = Answer.objects.filter(id=answer_id)

        if answer is None:
            raise Exception('No such answer exists')

        if post is not None:
            post.is_answered = True
            post.selected_answer_id = answer_id
            post.save()

            # Add activity record
            Activity(
                creator=user,
                type=ActivityTypeEnum.POST,
                type_id=post.id,
                action=ActivityActionEnum.ANSWERED,
                created_date=datetime.now()
            ).save()
        else:
            raise Exception('No post exists with that owner')

        return PostMutation(post=post)

class Query(graphene.ObjectType):
    all_categories = graphene.List(CategoryType)
    all_posts = graphene.List(PostType)
    category_by_name = graphene.Field(CategoryType, name=graphene.String(required=True))
    category_by_id = graphene.Field(CategoryType, id=graphene.Int(required=True))
    post_by_id = graphene.Field(PostType, id=graphene.Int(required=True))
    top_posts = graphene.List(PostType)
    answers_by_post_id = graphene.List(AnswerType, id=graphene.Int(required=True))
    user = graphene.Field(UserType)
    feed_posts = graphene.List(PostType)
    trending = graphene.List(CategoryType)
    recent_activity = graphene.List(ActivityType)

    def resolve_all_categories(root, info):
        return Category.objects.all()

    def resolve_all_posts(root, info):
        return Post.objects.all()
    
    def resolve_category_by_name(root, info, name):
        try:
            return Category.objects.get(name=name)
        except Category.DoesNotExist:
            return None

    def resolve_category_by_id(root, info, id):
        try:
            return Category.objects.get(id=id)
        except Category.DoesNotExist:
            return None

    def resolve_post_by_id(root, info, id):
        try:
            return Post.objects.get(id=id)
        except Post.DoesNotExist:
            return None

    def resolve_top_posts(root, info):
        return Post.objects.order_by('-rating')[:5]

    def resolve_answers_by_post_id(root, info, id):
        return Answer.objects.filter(post__id=id)

    @login_required
    def resolve_user(root, info):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return user

    def resolve_feed_posts(root, info):
        return Post.objects.order_by('-created_date')[:20]

    def resolve_trending(root, info):
        return Category.objects.all()[:3]

    def resolve_recent_activity(root, info):
        return Activity.objects.order_by('-created_date')[:3]

class Mutation(graphene.ObjectType):
    create_answer = AnswerMutation.Field()
    create_post = PostMutation.Field()
    answer_post = AnsweredPostMutation.Field()

    # JWT Authentication
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)