from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from .models import *

class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(
        required=True,
        max_length=100,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="Este correo ya está registrado."
            )
        ],
        error_messages={
            'required': 'Este campo es obligatorio',
            'blank': 'Este campo no puede estar vacio',
            'invalid': 'Este correo tiene un formato invalido'
        }
    )
    
    password = serializers.CharField(
        required=True,
        write_only=True,
        min_length=8,
        max_length=100,
        error_messages={
            'required': 'Este campo es obligatorio',
            'blank': 'Este campo no puede estar vacio',
            'min_length': 'La contraseña debe tener mínimo 8 caracteres',
            'max_length': 'La contraseña debe tener máximo 100 caracteres'
        }
    )

    class Meta:
        model = User
        fields = ['email','password','first_name','last_name']
        

    def create(self, validate_data):
        email = validate_data['email']
        password = validate_data['password']
        
        first_name = validate_data.get('first_name', '')
        last_name = validate_data.get('last_name', '')
        
        user = User.objects.create_user(
            username=email,  # o puedes generar uno automático si prefieres
            email=email,
            password=password,
            first_name=first_name,
            last_name = last_name
        )
        return user



class PostSerializer(serializers.ModelSerializer):
    autor_detalle = UserSerializer(source='autor', read_only=True)
    class Meta:
        model = Posts
        fields = '__all__'
        
        extra_kwargs = {
            'titulo' : {
                'required' : True,
                'allow_blank' : False,
                'error_messages' :{
                    'required' : 'El titulo es obligatorio',
                    'blank' : 'Este campo no puede estar vacio ',
                }
            },
            'cuerpo' :{
                'required' : True,
                'allow_blank' : False,
                'error_messages' :{
                    'required' : 'Este campo es obligatorio',
                    'blank' : 'Este campo no puede estar vacio ',
                }
            },'autor': {
                'required': True,
                'error_messages': {
                    'required': 'Este campo es obligatorio',
                    'blank': 'Este campo no puede estar vacio ',
                }
            }
        }


