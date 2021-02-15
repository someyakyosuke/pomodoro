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
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        self.fields['shuutyuudo'].widget.attrs["class"]="shuutyuu"

    
