from django.conf.urls import  url
from todos import views

urlpatterns = [
    url(r'^undos/$', views.undo_list),
    url(r'^undos/(?P<undo_id>[0-9]+)$', views.update_undo),
    url(r'^dones/$', views.done_list),
    # url(r'^expired/$', views.ExpiredViewSet)
]