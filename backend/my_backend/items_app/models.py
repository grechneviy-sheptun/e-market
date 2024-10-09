from typing import Iterable
from django.db import models
from .manager import ItemManager
from auth_app.models import Users
# Create your models here.

class CreateItem(models.Model):
    type_item = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.CharField(max_length=255)
    photo = models.ImageField(upload_to="images/", null=True, blank=True)
    sale_date = models.DateField(auto_now_add=True)

    object = ItemManager()

    def __str__(self):
        return self.name
    

class Basket(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.quantity}'
    
class CartItem(models.Model):
    cart = models.ForeignKey(Basket, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(CreateItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def get_total_price(self):
        return self.quantity * self.product.price

    