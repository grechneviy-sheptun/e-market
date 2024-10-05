from .views import CreateItemView, FilterItemView, GetItemView
from django.urls import path
urlpatterns = [
    path('item-create/', CreateItemView.as_view(), name='item-create'),
    path('item-create/<int:pk>', CreateItemView.as_view(), name='item-create'),
    path('items-get/', GetItemView.as_view(), name='items-get'),
    path('item-filter/<slug:slug>', FilterItemView.as_view(), name='item-filter'),
]