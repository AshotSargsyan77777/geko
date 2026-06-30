from django.shortcuts import render
from django.http import HttpResponse


def get_product(request):
    return HttpResponse("Barev Dzez")
