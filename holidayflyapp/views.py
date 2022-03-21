from django.http import HttpResponse
from django.http.response import JsonResponse
from django.shortcuts import render, redirect
from django.conf import settings
from holidayflyapp.forms import NewUserForm
from holidayflyapp.models import Newuser
from holidayflyapp.models import Airportdata, TempData
from datetime import date, time, datetime
import requests
import json
import uuid
import ast
import datetime

# Create your views here.


def index(request):
    listData = Newuser.objects.all()

    # url = "https://api.tripjack.com/fms/v1/air-search-all"

    # payload = json.dumps({
    # "searchQuery": {
    #     "cabinClass": "ECONOMY",
    #     "paxInfo": {
    #     "ADULT": "1",
    #     "CHILD": "0",
    #     "INFANT": "0"
    #     },
    #     "routeInfos": [
    #     {
    #         "fromCityOrAirport": {
    #         "code": "DEL"
    #         },
    #         "toCityOrAirport": {
    #         "code": "BOM"
    #         },
    #         "travelDate": "2021-10-21"
    #     }
    #     ],
    #     "searchModifiers": {
    #     "isDirectFlight": False,
    #     "isConnectingFlight": False
    #     }
    # }
    # })
    # headers = {
    # 'apikey': '71003292899e6c83-b2a9-4a3a-a668-931a4eb4a3d6',
    # 'Content-Type': 'application/json'
    # }

    # response = requests.request("POST", url, headers=headers, data=payload)

    # return HttpResponse(response.text)
    if 'searchSession' in request.session:
        searchSession = request.session['searchSession']
    else:
        searchSession = {}

    currentdate = (datetime.datetime.now().strftime ("%d/%m/%Y"))
    strcurrentdate = (datetime.datetime.now().strftime ("%Y-%m-%d"))
    return render(request, "index.html", {'searchSession': searchSession, 'strcurrentdate': strcurrentdate,'currentdate': currentdate, 'FLIGHTCLASSES': settings.FLIGHTCLASSES})

# add new user


def addnew(request):
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            try:
                form.save()
                return redirect('/')
            except:
                pass
    else:
        form = NewUserForm()
    return render(request, "adduser.html", {'form': form})
# Delete function


def delete_user(request, id):
    if request.method == "POST":
        dl = Newuser.objects.get(pk=id)
        dl.delete()
        return redirect('/')


def edituser(request, id):
    dt = Newuser.objects.get(pk=id)
    if request.method == "POST":
        form = NewUserForm(request.POST, instance=dt)
        if form.is_valid():
            try:
                form.save()
                return redirect('/')
            except:
                pass
    else:
        form = NewUserForm(instance=dt)
    return render(request, "edituser.html", {'form': form})


def searchflight(request, TraceId):
    data = TempData.objects.get(TraceId=TraceId)
    SearchData = ast.literal_eval(data.json_data)
    #print(TraceId)
    print(settings.APIURL['TRIPJACK_FL_SEARCHALL_URL'])
    TotalPax = (int(SearchData['Adults'])+int(SearchData['Childs'])+int(SearchData['Infants']))
    #TotalPax = (int(SearchData['route']))
    #route = SearchData['route']
    #international = SearchData['international']
    return render(request, "flight_search.html", {'FLIGHTCLASSES': settings.FLIGHTCLASSES,'TotalPax':TotalPax,'SearchData':SearchData,'TraceId':TraceId})

# def flightdata(request):
#     if 'searchSession' in request.session:
#         searchSession = request.session['searchSession']
#     else:
#         searchSession = {}
#     print(searchSession)
#     if request.method == "GET":
#         listData = Airportdata.objects.all()
#         dataArray = list()
#         for v in listData:
#             dataSet = {'AirportCode' : v.AirportCode, 'CountryCode':v.CountryCode, 'label':v.label,'ContName':v.ContName,'searchSession':searchSession}
#             dataArray.append(dataSet)
#         return JsonResponse(dataArray, safe=False)


def requestSearch(request):
    TraceId = uuid.uuid4()
    base_url = "/flight-search/"
    dataSet = {
        'leaving': request.POST.get('flightFrom'),
        'going': request.POST.get('flightTo'),
        'departure': request.POST.get('flightDepart'),
        'strdeparture': request.POST.get('strflightDepart'),
        'return': request.POST.get('flightReturn'),
        'strReturn': request.POST.get('strflightReturn'),
        'Adults': request.POST.get('adult'),
        'Childs': request.POST.get('child'),
        'Infants': request.POST.get('infant'),
        'fromcode': request.POST.get('fromcode'),
        'tocode': request.POST.get('tocode'),
        'international': request.POST.get('international'),
        'classes': request.POST.get('flight-class'),
        'route': request.POST.get('flight-trip'),
    }
    createObj = TempData.objects.create(
        TraceId=TraceId,
        json_data=(dataSet),
    )
    createObj.save()
    return redirect("{}{}".format(base_url, TraceId))
