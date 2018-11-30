from rest_framework import serializers
from todos.models import Todos


class Serializer(serializers.ModelSerializer):
    Todos.expired_at = serializers.DateTimeField(format="YYYY-MM-DD HH:mm:ss", input_formats="YYYY-MM-DD HH:mm:ss")
    Todos.created_at = serializers.DateTimeField(format="YYYY-MM-DD HH:mm:ss", input_formats="YYYY-MM-DD HH:mm:ss")
    class Meta:
        model = Todos
        fields = "__all__"
