from django.shortcuts import render
from django.http import HttpResponse
import datetime


# Create your views here.
def courses_edit(request):
    return render(request, 'polls/courses_edit.html')


def courses_empty(request):
    return render(request, 'polls/courses_empty.html')


def courses(request):
    return render(request, 'polls/courses-main.html')


def journal(request):
    return render(request, 'polls/journal.html')


def organization_edit(request):
    return render(request, 'polls/organization_edit.html')


def organization_main(request):
    return render(request, 'polls/organization_main.html')


def participants(request):
    return render(request, 'polls/participants.html')


def festivals(request):
    return render(request, 'polls/festivals.html')


def portfolio(request):
    return render(request, 'polls/portfolio.html')


def current_datetime(request):
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)