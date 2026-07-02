from django.db import models

class Product(models.Model):

    ORDER_STATUS = [
        ('pending', 'Mshakvum e'),
        ('delivery', 'janaparhin e'),
        ('ready', 'Avartvac e'),
        ('canceled', 'avartvac e'),
        

    ]

    title = models.CharField(max_length=50)
    quanity = models.IntegerField(default=0)
    price = models.DecimalField(decimal_places=2, max_digits=9)
    is_available = models.BooleanField(default=True)
    description = models.TextField(max_length=1000)
    sales = models.PositiveIntegerField()
    status = models.CharField(
        choices=ORDER_STATUS,
        default='pending'
    )


    

