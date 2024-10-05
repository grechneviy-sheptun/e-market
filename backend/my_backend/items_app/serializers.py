from .models import CreateItem
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from auth_app.models import Users
from rest_framework import serializers
from django.core.files.base import ContentFile
import base64
import uuid
import imghdr

class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        if isinstance(data, str) and 'data:' in data and ';base64,' in data:
            header, data = data.split(';base64,')
            try:
                decoded_file = base64.b64decode(data)
            except (TypeError, ValueError):
                self.fail('invalid_image')
            file_name = str(uuid.uuid4())[:12] 
            file_extension = self.get_file_extension(file_name, decoded_file)
            complete_file_name = f"{file_name}.{file_extension}"
            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        extension = imghdr.what(file_name, decoded_file)
        return extension or 'jpg'

    def to_representation(self, value):
        if not value:
            return None
        return value.url

class CreateItemSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    photo = Base64ImageField(required=True)
    class Meta:
        model = CreateItem
        fields = '__all__'


    def create(self, validated_data):
        return CreateItem.object.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.type_item = validated_data.get('type_item', instance.type_item)
        instance.price = validated_data.get('price', instance.price)
        instance.photo = validated_data.get('photo', instance.photo)
        instance.save()
        return instance
        
class UserSerializer(serializers.ModelSerializer):
    name = serializers.PrimaryKeyRelatedField(many=True, queryset=Users.objects.all())
    class Meta:
        model = 'Users'
        fields = ('id', 'username', 'name')


