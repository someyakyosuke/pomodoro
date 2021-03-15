from django.http import JsonResponse
from django.http import HttpResponse
from django.shortcuts import render
from django.views import generic
from .models import Focus
from .forms import SampleForm
from django.contrib import messages
from django.urls import reverse_lazy
from django.utils import timezone
from django.utils.timezone import localtime # 追加（日本時間にするため）
from datetime import datetime, date,timedelta

#ラジオボタンの入力データを送信（ajax用に追加）
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

#グラフの表示データ切り替え用のクラス

# Create your views here.
class IndexView(AjaxFormMixin,generic.CreateView):
    template_name="index.html"
    model = Focus
    form_class = SampleForm
    success_url=reverse_lazy('pomodoroapp:index')

class GraphView(generic.TemplateView):
    template_name="graph.html"
    model = Focus
    def get_context_data(self,**kwargs):
        # 継承元のメソッド呼び出し
        context = super().get_context_data(**kwargs) 
        today = localtime(timezone.now()).date()
        print(today)
        print('この上でタイムゾーンが出力されます')
        context['graph_data'] = Focus.objects.filter(user=self.request.user,start_at__date=today)
        print(context)
        return context
    def post(self,request,**kwargs):
        if self.request.is_ajax():
            button_day = request.POST.get('button_value')
            print(button_day + "この値がdaysに入る")
            today = localtime(timezone.now())+timedelta(days=int(button_day))
            today_day = today.date()
            print(today_day)
            object_data= Focus.objects.filter(user=self.request.user,start_at__date=today_day)
            print (object_data)
            graph_timedata = []
            graph_shuutyuudata = []
            for item in object_data:
                graph_timedata.append(item.start_at.strftime("%H:%M"))
                graph_shuutyuudata.append(int(item.shuutyuudo))
            print (graph_timedata)
            print (graph_shuutyuudata)
            return JsonResponse({'graph_time':graph_timedata,'graph_shuutyuu':graph_shuutyuudata},status=200)


    
