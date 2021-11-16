from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, views, response, status, exceptions
from rest_framework.exceptions import PermissionDenied
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from .serializer import UserSerializer


# Create your views here.

User = get_user_model()


class RegisterPage(APIView):

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({'message': 'Registration Successful'}, status=status.HTTP_202_ACCEPTED)
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginPage(APIView):

    def post(self, request):

        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user_to_login = User.objects.get(username=username)
        except User.DoesNotExist:
            raise PermissionDenied(detail='User does not exist')
        if not user_to_login.check_password(password):
            raise PermissionDenied(detail='password not working')

        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            {'sub': user_to_login.id, 'exp': int(dt.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        print(token)
        return Response({'token': token, 'message': f"Welcome back {user_to_login.username}"})


# class UserList(views.APIView):
#     def get(self, _request):
#         personas = Persona.objects.all()
#         serialized_persona = PersonaSerializer(personas, many=True)
#         return response.Response(serialized_persona.data, status=status.HTTP_200_OK)


class UserDetailView(views.APIView):
    def get_user_by_id(self, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            raise exceptions.NotFound(detail="User does not exist")

    def get(self, _request, id):
        user = self.get_user_by_id(id)
        serialized_user = UserSerializer(user)
        return response.Response(serialized_user.data, status=status.HTTP_200_OK)

    # def delete(self, _request, id):
    #     persona = self.get_persona_by_id(id)
    #     persona.delete()
    #     return response.Response(status=status.HTTP_204_NO_CONTENT)

    # def put(self, request, id):
    #     persona = self.get_persona_by_id(id)
    #     updated_persona = UserSerializer(persona, data=request.data)
    #     if updated_persona.is_valid():
    #         updated_persona.save()
    #         return response.Response(updated_persona.data, status=status.HTTP_202_ACCEPTED)
    #     return response.Response(updated_persona.errors, status=status.HTTP_400_BAD_REQUEST)
