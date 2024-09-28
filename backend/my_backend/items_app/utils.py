from django_filters import rest_framework as filters
from items_app.models import CreateItem


class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass

class ItemFilter(filters.FilterSet):
    types = CharFilterInFilter(field_name='type_name', lookup_expr='in')

    class Meta:
        model = CreateItem
        fields = ['type_item']