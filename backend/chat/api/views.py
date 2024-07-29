
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework import serializers


@api_view(['GET'])
def index(request):
    routes = [
        '/api/token',
        '/api/token/refrech'
    ]
    return Response(routes)


@api_view(['POST'])
def CreateUser(request):
    username = request.data['username']
    password = request.data['password']
    email = request.data['email']
    user = User.objects.create_user(username=username, password=password, email=email)
    return Response("user created", 200)

class UserSerliazer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serlizer = UserSerliazer(users,many=True)
    return Response(serlizer.data, 200)