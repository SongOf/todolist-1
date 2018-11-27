from django.conf.urls import  url
from todos import views

urlpatterns = [
    url(r'^undos/$', views.TodoList.as_view()),
    url(r'^undos/(?P<id>[0-9]+)$', views.TodoDetail.as_view()),
    # url(r'^dones/$', views.done_list),
    # url(r'^expired/$', views.ExpiredViewSet)
]