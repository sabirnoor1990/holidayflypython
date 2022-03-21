from django.http import HttpResponse
from django.http.response import JsonResponse
from django.shortcuts import render, redirect
from django.conf import settings
from holidayflyapp.models import Airportdata, TempData
import requests
import json
import time
import ast

# Create your views here.


def autocompleteairport(request):
    if 'term' in request.GET:
        terms = request.GET.get('term')
        if not terms:
            terms = 'Del'
        dl = Airportdata.objects.filter(
            AirportCode__icontains=terms) | Airportdata.objects.filter(label__icontains=terms)
        dataArray = list()
        for v in dl:
            dataSet = {'AirportCode': v.AirportCode, 'CountryCode': v.CountryCode,
                       'label': v.label, 'ContName': v.ContName}
            dataArray.append(dataSet)
        return JsonResponse(dataArray, safe=False)


def flightdata(request, TraceId):
    data = TempData.objects.get(TraceId=TraceId)
    SearchData = ast.literal_eval(data.json_data)
    url = settings.APIURL['TRIPJACK_FL_SEARCHALL_URL']
    SearchData['SearchTraceId'] = TraceId
    payload = json.dumps(SearchData)
    print(payload)
    headers = {
        'apikey': settings.APIURL['APIKEY'],
        'Content-Type': 'application/json',
        
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    responseData = json.loads(response.text)
    #responseData = json.loads(payload)
    #print(response.text)
    
    return JsonResponse(responseData, safe=False)

def FarerulesCancellation(request,PriceID):
    print(PriceID)
    url = settings.APIURL['TRIPJACK_FL_API_FARE_RULE_URL']
    SearchData = {}
    SearchData['PriceID'] = PriceID

    payload = json.dumps(SearchData)
    
    headers = {
        'apikey': settings.APIURL['APIKEY'],
        'Content-Type': 'application/json',
        
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    responseData = json.loads(response.text)
    print(response.text)
    return JsonResponse(responseData, safe=False)
