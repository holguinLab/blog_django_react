from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Posts (models.Model):
    autor = models.ForeignKey(User,on_delete=models.CASCADE,related_name="post_autor",blank=False,null=False )
    titulo = models.CharField(max_length=100,blank=False,null=False)
    cuerpo = models.TextField(blank=False,null=False)


