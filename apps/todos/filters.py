import django_filters

from todos.models import Todos


class TodosFilter(django_filters.FilterSet):
    status = django_filters.CharFilter()

    class Meta:
        model = Todos
        fields = ['status']
