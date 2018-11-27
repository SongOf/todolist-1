# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import Http404

from todos.models import Todos
from util.constants import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import Serializer
from rest_framework.views import APIView


# Create your views here.


class TodoList(APIView):
    """
    List all tasks, or create a new task.
    """

    def get(self, request, format=None):
        query_status = request.GET.get('status')

        if query_status == DELETED:
            tasks = Todos.objects.all().filter(status=DELETED)
        elif query_status == DONE:
            tasks = Todos.objects.all().filter(status=DONE)
        else:
            tasks = Todos.objects.all().filter(status=UNDO)
        serializer = Serializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TodoDetail(APIView):
    """
    Retrive, update or delete a task.
    """

    def get_object(self, task_id):
        try:
            task = Todos.objects.get(id=task_id)
            if task.status == DELETED:
                raise Http404
            else:
                return task
        except Todos.DoesNotExist:
            raise Http404

    def get(self, request, task_id, format=None):
        task = self.get_object(task_id)
        return Response(Serializer(task).data)

    def put(self, request, task_id, format=None):
        if 'status' in request.data and request.data['status'] == DELETED:  # only allow DELETE by HTTP method.
            return Response(status.HTTP_403_FORBIDDEN)

        task = self.get_object(task_id)
        serializer = Serializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, task_id, format=None):
        task = self.get_object(task_id)
        task.status = DELETED
        task.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
