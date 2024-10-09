from .views import CreateItemView, FilterItemView, GetItemView, AddItemToCart, RemoveItemFromCart
from django.urls import path
urlpatterns = [
    path('item-create/', CreateItemView.as_view(), name='item-create'),
    path('item-create/<int:pk>', CreateItemView.as_view(), name='item-create'),
    path('items-get/', GetItemView.as_view(), name='items-get'),
    path('item-filter/<slug:slug>', FilterItemView.as_view(), name='item-filter'),
    path('item-cart-add/<int:product_id>', AddItemToCart.as_view(), name='add-item-cart'),
    path('item-cart-remove/<int:item_id>', RemoveItemFromCart.as_view(), name='remove-item-cart'),
]