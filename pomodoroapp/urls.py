from django.urls import path

from.import views

app_name = 'pomodoroapp'
urlpatterns = [
    path('',views.IndexView.as_view(),name="index"),
    path('graph/',views.GraphView.as_view(),name="graph")
]