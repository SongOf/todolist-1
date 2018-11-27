import django_filters

from todos.models import Todos
from util.constants import UNDO


class TodosFilter(django_filters.FilterSet):
    queryset = Todos.objects.all().filter(status=UNDO)

    class Meta:
        model = Todos
        fields = ['-priority', 'expired_at']
