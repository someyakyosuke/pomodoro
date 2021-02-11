from django.shortcuts import render
from django.views import generic
from .models import Focus
from .forms import SampleForm

# Create your views here.
class IndexView(generic.CreateView):
    template_name="index.html"
    model = Focus
    form_class = SampleForm

    def form_valid(self,form):
        form.save()
        messages.success(self.request,'ただいまの時間の集中度を記録しました')
        return super().form_valid(form)
            
class GraphView(generic.TemplateView):
    template_name="graph.html"