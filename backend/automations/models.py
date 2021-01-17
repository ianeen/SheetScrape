from django.db import models

# Create your models here.

class Automation(models.Model):
    sheet_name = models.CharField(max_length=25)
    url = models.TextField()
    cols = models.TextField()
    owner = models.CharField(max_length=10)
