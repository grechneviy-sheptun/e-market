from .serializers import CreateItemSerializer
from .models import CreateItem
from .permissions import IsOnwerOrReadOnly
from .utils import ItemFilter
from auth_app.authentication import OwnAuthentication

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.generics import ListAPIView

from django.utils.translation import gettext_lazy as _
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
class CreateItemView(APIView):

    serializer_class = CreateItemSerializer
    permission_classes=(IsOnwerOrReadOnly, IsAuthenticatedOrReadOnly)
        
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=self.request.user)
        return Response(_('item created successfully'), status=status.HTTP_201_CREATED)
    
    def get(self, request, pk, format=None):
        items = CreateItem.object.all()
        serializer = CreateItemSerializer(items, many=True)
        return Response({'items': serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        instance = get_object_or_404(CreateItem, id=pk)
        serializer = CreateItemSerializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(_("item updated successfully"), status=status.HTTP_200_OK)
    
    def delete(self, request, pk):
        item = CreateItem.object.get(id=pk)
        item.delete()
        return Response(_("item deleted successfully"), status=status.HTTP_204_NO_CONTENT)


class GetItemView(APIView):
    def get(self, request):
        items = CreateItem.object.all()
        serializer = CreateItemSerializer(items, many=True)
        return Response({'items': serializer.data}, status=status.HTTP_200_OK)


class FilterItemView(ListAPIView):
    serializer_class =  CreateItemSerializer
    filter_backends = [DjangoFilterBackend, ]
    filterset_class = ItemFilter

    def get_queryset(self):
        items = CreateItem.object.filter()
        return items