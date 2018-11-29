# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from todos.models import Todos
from todos.serializer import Serializer
from rest_framework import generics

from util.constants import *


# Create your views here.


class TodoList(generics.ListCreateAPIView):
    """
    List all valid tasks, or create a new task.
    """
    queryset = Todos.objects.all().filter(status=UNDO)
    serializer_class = Serializer
    # pagination_class = StandardPagination


class DetailGenericAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todos.objects.all()
    serializer_class = Serializer
    lookup_field = 'id'


class TodoDetail(DetailGenericAPIView):
    """
    Retrieve, update or delete a task.
    """
    queryset = Todos.objects.all().filter(status=UNDO)
    serializer_class = Serializer


class DoneList(generics.ListAPIView):
    queryset = Todos.objects.all().filter(status=DONE)
    serializer_class = Serializer
    # pagination_class = StandardPagination


class DoneDetail(DetailGenericAPIView):
    queryset = Todos.objects.all().filter(status=DONE)
    serializer_class = Serializer
