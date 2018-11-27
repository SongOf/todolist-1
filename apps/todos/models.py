# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Todos(models.Model):
    todo = models.CharField(max_length=100)
    status = models.CharField(max_length=2, default='0')
    priority = models.CharField(max_length=2, default='0')
    created_at = models.DateTimeField(auto_now_add=True)
    expired_at = models.DateTimeField(null=True)

    def __unicode__(self):
        return u'%d %s %s' % (self.id, self.todo, self.status)

    class Meta:
        ordering = ['status', '-priority', 'created_at']
