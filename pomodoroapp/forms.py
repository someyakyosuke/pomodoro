from django import forms
from django.contrib.admin import widgets
from .models import Focus
import os



class SampleForm(forms.ModelForm):  
    class Meta:
        model=Focus
        fields={'shuutyuudo',}
        widgets={
            'shuutyuudo': forms.RadioSelect()
        }

    
