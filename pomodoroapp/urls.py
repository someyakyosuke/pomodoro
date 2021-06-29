from django.urls import path
from.import views

app_name = 'pomodoroapp'
urlpatterns = [
    path('',views.IndexView.as_view(),name="index"),
    path('graph/',views.GraphView.as_view(),name="graph"),
    path('setumei/',views.SetumeiView.as_view(),name="setumei"),
    path('kihon/',views.KihonView.as_view(),name="kihon"),
    path('houshu/',views.HoushuView.as_view(),name="houshu"),
    path('situmonaction/',views.SitumonactionView.as_view(),name="situmonaction"),
    path('ifthen/',views.IfthenView.as_view(),name="ifthen"),
    path('technic/',views.TechnicView.as_view(),name="technic")
]