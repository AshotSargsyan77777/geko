from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=50, unique=True, default="Apranq")
    price = models.DecimalField(decimal_places=2,max_digits=7)
    description = models.TextField(max_length=1000,blank=True,null=True)
    valid = models.DateField()
    quantity = models.IntegerField(default=0)
    # image = models.ImageField(upload_to=)
