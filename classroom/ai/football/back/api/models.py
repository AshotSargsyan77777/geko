from django.db import models


class Product(models.Model):
    PRODUCT_TYPES = [
        ('home', 'Home Kit'),
        ('away', 'Away Kit'),
        ('third', 'Third Kit'),
        ('champions', 'Limited Edition'),
    ]

    id = models.CharField(max_length=100, primary_key=True)  # Matches React's IDs
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.CharField(max_length=500)  # Stores image CDN/url or path
    player = models.CharField(max_length=100, default="LAMINE YAMAL")  # Default player
    type = models.CharField(max_length=20, choices=PRODUCT_TYPES, default='home')
    is_best_seller = models.BooleanField(default=False)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=5.0)
    reviews_count = models.IntegerField(default=120)

    def __str__(self):
        return f"{self.name} - ${self.price}"


class Order(models.Model):
    PAYMENT_METHODS = [
        ('credit-card', 'Credit Card'),
        ('apple-pay', 'Apple Pay'),
        ('google-pay', 'Google Pay'),
        ('paypal', 'PayPal'),
    ]

    order_number = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state_region = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS, default='credit-card')
    
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    discount_percent = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    shipping = models.DecimalField(max_digits=8, decimal_places=2, default=0.0)
    tax = models.DecimalField(max_digits=8, decimal_places=2, default=0.0)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.order_number} by {self.first_name} {self.last_name}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    product_name_snapshot = models.CharField(max_length=250)  # Preserves name if product deleted
    size = models.CharField(max_length=10)  # S, M, L, XL, XXL
    quantity = models.PositiveIntegerField(default=1)
    
    # Custom jersey prints attributes
    custom_name = models.CharField(max_length=50, blank=True, null=True)
    custom_number = models.CharField(max_length=10, blank=True, null=True)
    
    price_at_purchase = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        custom_str = f" ({self.custom_name} #{self.custom_number})" if self.custom_name else ""
        return f"{self.quantity}x {self.product_name_snapshot} - Size {self.size}{custom_str}"


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
