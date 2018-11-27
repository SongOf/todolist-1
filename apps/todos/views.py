# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from todos.models import Todos
from util.constants import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import Serializer


# Create your views here.
@api_view(['GET', 'POST'])
def undo_list(request):
    if request.method == 'GET':
        undos = Todos.objects.filter(status=UNDO)
        serializer = Serializer(undos, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def update_undo(request, undo_id):
    try:
        undo = Todos.objects.get(id=undo_id)
        if int(undo.status) == DELETED: # if undo is delete, raise DoseNotExist
            raise Todos.DoesNotExist
    except Todos.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = Serializer(undo)
        return Response(serializer.data)

    if request.method == 'PUT': # update undo text or done , here should check either status changed or not.
        serializer = Serializer(undo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        undo.status = DELETED # fake delete
        undo.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def done_list(request):
    if request.method == 'GET':
        dones = Todos.objects.filter(status=DONE)
        serializer = Serializer(dones, many=True)
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'POST'])
# def expiredViewSet(request):
#     queryset = Todos.objects.filter(status=TODOS)
#     serializers_class = Serializer
