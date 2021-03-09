from django.http import JsonResponse
from django.http import HttpResponse
from django.shortcuts import render
from django.views import generic
from .models import Focus
from .forms import SampleForm
from django.contrib import messages
from django.urls import reverse_lazy
from django.utils import timezone

#ajax用に追加
class AjaxFormMixin(object):
    print('とりあえず動いてますよ')
    def form_invalid(self, form):
        print('無効ですが AJAXは送信されてますよ')
        response = super(AjaxFormMixin, self).form_invalid(form)
        if self.request.is_ajax():
            messages.error(self.request,"失敗しました")
            return JsonResponse(form.errors, status=400)
        else:
            return response

    def form_valid(self, form):
        print('有効で AJAXは送信されてますよ')
        focus = form.save(commit=False)
        focus.user = self.request.user
        focus.save()
        print('有効で saveまでできてますよ')
        if self.request.is_ajax():
            messages.success(self.request,'ただいまの時間の集中度を記録しました')
            return HttpResponse('ただいまの時間の集中度を記録しました')
        else:
            messages.success(self.request,'ajaxでないただいまの時間の集中度を記録しました')
            response = super(AjaxFormMixin, self).form_valid(form)
            return response

# Create your views here.
class IndexView(AjaxFormMixin,generic.CreateView):
    template_name="index.html"
    model = Focus
    form_class = SampleForm
    success_url=reverse_lazy('pomodoroapp:index')

class GraphView(generic.TemplateView):
    template_name="graph.html"
    model = Focus
    def get_context_data(self, **kwargs):
        # 継承元のメソッド呼び出し
        context = super().get_context_data(**kwargs) 
        today = timezone.now().date()
        print(today)
        context['graph_data'] = Focus.objects.filter(user=self.request.user,start_at__date=today)
        return context
