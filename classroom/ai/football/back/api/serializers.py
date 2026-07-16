from rest_framework import serializers
from .models import Product, Order, OrderItem, NewsletterSubscriber


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    product_id = serializers.CharField(source='product.id', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = [
            'id',
            'product_id',
            'product_name',
            'product_name_snapshot',
            'size',
            'quantity',
            'custom_name',
            'custom_number',
            'price_at_purchase',
        ]


class OrderCreateItemSerializer(serializers.Serializer):
    """
    Used only during order creation payload parsing.
    """
    product_id = serializers.CharField()
    size = serializers.CharField(max_length=10)
    quantity = serializers.IntegerField(min_value=1)
    custom_name = serializers.CharField(max_length=50, required=False, allow_blank=True, allow_null=True)
    custom_number = serializers.CharField(max_length=10, required=False, allow_blank=True, allow_null=True)


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    raw_items = OrderCreateItemSerializer(many=True, write_only=True)  # Client passes items here during POST

    class Meta:
        model = Order
        fields = [
            'id',
            'order_number',
            'first_name',
            'last_name',
            'email',
            'phone',
            'street_address',
            'city',
            'state_region',
            'zip_code',
            'country',
            'payment_method',
            'subtotal',
            'discount_percent',
            'shipping',
            'tax',
            'total',
            'created_at',
            'items',
            'raw_items',
        ]
        read_only_fields = ['order_number', 'created_at']

    def create(self, validated_data):
        raw_items_data = validated_data.pop('raw_items')
        
        # Generate an order number automatically
        import random
        import string
        chars = string.ascii_uppercase + string.digits
        order_num = "FCB-" + "".join(random.choices(chars, k=10))
        validated_data['order_number'] = order_num
        
        # Save order parent
        order = Order.objects.create(**validated_data)
        
        # Save nested order items
        for item_data in raw_items_data:
            product_id = item_data.get('product_id')
            try:
                product = Product.objects.get(id=product_id)
                price = product.price
                name_snapshot = product.name
            except Product.DoesNotExist:
                # Fallback if product was somehow not found
                product = None
                price = 149.99  # default Barça price
                name_snapshot = f"Barca Kit ({product_id})"
                
            OrderItem.objects.create(
                order=order,
                product=product,
                product_name_snapshot=name_snapshot,
                size=item_data.get('size'),
                quantity=item_data.get('quantity'),
                custom_name=item_data.get('custom_name', ''),
                custom_number=item_data.get('custom_number', ''),
                price_at_purchase=price
            )
            
        return order


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = '__all__'
