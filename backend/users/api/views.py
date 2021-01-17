from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from users.api.serializers import UserSerializer
from users.models import User

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        User.objects.get(username=username, password=password)
        request.session['username'] = username
        return Response('success', status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response('fail', status.HTTP_403_FORBIDDEN)