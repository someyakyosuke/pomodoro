from django.shortcuts import render
from django.views import generic
from .models import Focus
from .forms import SampleForm
from django.contrib import messages
from django.urls import reverse_lazy

#ajaxように追加
class AjaxFormMixin(object):
    def form_invalid(self, form):
        response = super(AjaxFormMixin, self).form_invalid(form)
        if self.request.is_ajax():
            return JsonResponse(form.errors, status=400)
        else:
            return response

    def form_valid(self, form):
        response = super(AjaxFormMixin, self).form_valid(form)
        if self.request.is_ajax():
            print(form.cleaned_data)
            data = {
                'message': "Successfully submitted form data."
            }
            return JsonResponse(data)
        else:
            return response

# Create your views here.
class IndexView(generic.CreateView):
    template_name="index.html"
    model = Focus
    form_class = SampleForm
    success_url=reverse_lazy('pomodoroapp:index')

    def form_valid(self,form):
        focus = form.save(commit=False)
        focus.user = self.request.user
        focus.save()
        if self.request.is_ajax():
            messages.success(self.request,'ただいまの時間の集中度を記録しました')
        else:
            messages.success(self.request,'ajaxではないただいまの時間の集中度を記録しました')

        return super().form_valid(form)
    def form_invalid(self,form):
        messages.error(self.request,"集中度の記録に失敗しました")
        return super().form_invalid(form)
class GraphView(generic.TemplateView):
    template_name="graph.html"