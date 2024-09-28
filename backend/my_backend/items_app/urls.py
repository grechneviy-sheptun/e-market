from .views import CreateItemView, FilterItemView
from django.urls import path
urlpatterns = [
    path('item-create/', CreateItemView.as_view(), name='item-create'),
    path('item-create/<int:pk>', CreateItemView.as_view(), name='item-create'),
    path('item-filter/<slug:slug>', FilterItemView.as_view(), name='item-filter'),
]