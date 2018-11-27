# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.pagination import PageNumberPagination
from todos.models import Todos
from todos.serializer import Serializer
from rest_framework import generics

from util.constants import *
from .filters import TodosFilter


# Create your views here.

class StandardPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    page_query_param = 'page'
    max_page_size = 100


class TodoList(generics.ListCreateAPIView):
    """
    List all valid tasks, or create a new task.
    """
    queryset = Todos.objects.all()
    serializer_class = Serializer
    pagination_class = StandardPagination
    filter_class = TodosFilter


class TodoDetailGenericAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todos.objects.all()
    serializer_class = Serializer
    lookup_field = ('id')


class TodoDetail(TodoDetailGenericAPIView):
    """
    Retrieve, update or delete a task.
    """
    queryset = Todos.objects.all()
    serializer_class = Serializer
