from django.shortcuts import render
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from rest_framework import status



from .models import *
from .serializer import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated


# Create your views here.
@api_view(['POST'])
def register(request):
    serializers = UserSerializer(data = request.data) # Llena el serializer con  los datos de la peticion
    print(serializers)
    if serializers.is_valid():
        user = serializers.save() # Esto crea , guarda y recupera datos del usuario 
        refresh = RefreshToken.for_user(user)
        return Response({'mensaje' : 'Su cuenta se a registrado correctamente', 'refresh' : str(refresh) , 'access' : str(refresh.access_token) },status=status.HTTP_201_CREATED)
    return Response(serializers._errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def crear_post(request) :
    data_copy = request.data.copy()
    print(data_copy)
    data_copy['autor'] = request.user.id # Recuperamos el usuario logueado 
    
    
    serializer = PostSerializer(data = data_copy) # Guardamos el dato copiado en los datos del serializador
    print ("Serializer de los Posts  :  ",serializer) # Mostramos solo en el backend para testear
    
    if serializer.is_valid():
        serializer.save()
        return Response({'mensaje' : 'Tu Post Se A Publicado' },status=status.HTTP_201_CREATED)
    return Response(serializer._errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def actualizar_post(request,pk):
    try:
        post = Posts.objects.get(pk = pk , autor= request.user)
    except Posts.DoesNotExist:
        return Response({"error": "Post no encontrado o no autorizado"}, status=404)
    
    data_copy = request.data.copy()
    print(data_copy)
    
    data_copy['autor'] = request.user.id  # aseguras que el autor no se cambie
    
    serializer = PostSerializer(post,data=data_copy)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def eliminar_post(request,pk):
    try:
        post = Posts.objects.get(pk = pk , autor= request.user)
    except Posts.DoesNotExist:
        return Response({"error": "Post no encontrado o no autorizado"}, status=404)
    
    post.delete()
    return Response({"mensaje": "Eliminado correctamente"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_posts(request):
    posts = Posts.objects.all() # Recupero todos los posts creados en la base de datos
    serializer = PostSerializer(posts,many=True) # convertir datos de la base de datos a un formato que pueda entender el frontend (JSON).
    return Response(serializer.data) # se envian los datos en json 



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_posts_de_usuario(request):
    user = request.user # recupero los datos del usuario logueado que vienen del frontend
    posts = user.post_autor.all() # Listamos las publicaciones que creo cada usuario 
    serializer = PostSerializer(posts, many=True) # convertir los datos en formato json 
    return Response(serializer.data) # se envian los datos en json



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_usuarios(request):
    usuarios = User.objects.all() # Recupero todos los posts creados en la base de datos
    usuarios = usuarios.filter(is_superuser =False)
    serializer = UserSerializer(usuarios,many=True) # convertir datos de la base de datos a un formato que pueda entender el frontend (JSON).
    return Response(serializer.data) # se envian los datos en json 