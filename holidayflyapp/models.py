from django.db import models
from django.utils.timezone import now, datetime

# Create your models here.
class Newuser(models.Model):
    FirstName = models.CharField(max_length=50)
    LastName = models.CharField(max_length=50)
    uemail = models.EmailField(max_length=100)
    umobile = models.CharField(max_length=100)
    upassword = models.CharField(max_length=150)
    class Meta:
        db_table = "hdf_user"


class Airportdata(models.Model):
    AirportCode = models.CharField(max_length=3)
    ICAO = models.CharField(max_length=4)
    CountryCode = models.EmailField(max_length=2)
    DO = models.IntegerField()
    cn = models.CharField(max_length=43)
    label = models.CharField(max_length=150)
    ContName = models.CharField(max_length=100)
    class Meta:
        db_table = "airportdata"


class TempData(models.Model):
    TraceId = models.CharField(max_length=200)
    json_data = models.TextField()
    created_at = models.DateTimeField(default=now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        db_table = "temp_data"

