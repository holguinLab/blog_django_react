from django.urls import  path
from .views import *

urlpatterns=[
    path('register/',register,name='register'),
    path('crear_post/',crear_post,name='crear_post'),
    path('listar_posts/',listar_posts,name='listar_posts'),
    path('listar_posts_de_usuario/',listar_posts_de_usuario,name='listar_posts_de_usuario'),
    path('listar_usuarios/',listar_usuarios,name='listar_usuarios'),
    path('actualizar_post/<int:pk>/',actualizar_post,name='actualizar_post'),
    path('eliminar_post/<int:pk>/',eliminar_post,name='eliminar_post')
]