from django import forms
from django.db.models import fields
from django.db.models.base import Model
from holidayflyapp.models import Newuser

class NewUserForm(forms.ModelForm):
    class Meta:
        model = Newuser
        fields = ("FirstName","FirstName","LastName","uemail","umobile","upassword") # for all "__all__"