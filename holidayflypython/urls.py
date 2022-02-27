"""holidayflypython URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from holidayflyapp import views
from holidayflyapp import flightcontrollers

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('addnew/', views.addnew, name='addnew'),
    path('delete/<int:id>/', views.delete_user, name='deletedata'),
    path('edit/<int:id>/', views.edituser, name='editdata'),
    path('flight-search/<str:TraceId>/', views.searchflight, name='flight-search'),
    path('requestSearch', views.requestSearch, name='requestSearch'),
    
    path('autocompleteairport', flightcontrollers.autocompleteairport, name='autocompleteairport'),
    path('flightdata/<str:TraceId>/', flightcontrollers.flightdata, name='flightdata'),
    path('farerulescancel/<str:PriceID>/', flightcontrollers.FarerulesCancellation, name='farerulescancel'),
]
