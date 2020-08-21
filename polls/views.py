from django.shortcuts import render
from django.http import HttpResponse
import datetime
import json


# Create your views here.
def courses_edit(request):
    def CompileJSON():
        res = {
            "username": 'example-mail@gmail.com',
            "members_notification": 0,
            "journal_notification": 0,
            "balance": 1330,

            "direction": "Инженерные и ИТ",
            "directions": [
                "Естественно научные",
                "Инженерные и ИТ",
                "Предпринимательские",
                "Социально-общественные",
                "Творчество",
                "Физкультурно-спортивные",
                "Языковые"
            ],
            "directionId": 0,
            "tag": "#someTag",
            "name": "Rocket Science",
            "ageGroup": "Для школьников",
            "ageGroupNumbers": "50-55",
            "description": "Какое то описание",
            "beginDate": "2020-09-25",
            "endDate": "2020-10-10",
            "address": "Адрес №3",
            "addresses": [
                "Адрес №1",
                "Адрес №2",
                "Адрес №3"
            ],
            "images": [
                "/static/assets/Aristotle.jpg",
                "/static/assets/Aristotle.jpg",
                "/static/assets/Aristotle.jpg"
            ]
        }
        return res
    data = CompileJSON()
    return (render(request, 'polls/courses_edit.pug', locals()))


def courses_empty(request):
    def CompileJSON():
        res = {
            "username": 'example-mail@gmail.com',
            "members_notification": 999,
            "journal_notification": 10,
            "balance": 1330,
        }
        return res

    data = CompileJSON()
    return (render(request, 'polls/courses_empty.pug', locals()))


def courses(request, id_category=None, id_course=None):
    def CompileJSON():
        res = {
            "username": 'example-mail@gmail.com',
            "members_notification": 0,
            "journal_notification": 0,
            "balance": 9990,
            "months": ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],

            "courseCategories": [
                {'title': "Физкультурно-спортивные", 'id': 1},
                {'title': "Естественно-научные", 'id': 2},
                {'title': "Социально-спортивные", 'id': 3},
                {'title': "Инженерные и ИТ", 'id': 4},
                {'title': "Языковые", 'id': 5},
                {'title': "Творчество", 'id': 6},
                {'title': "Предпринимательские", 'id': 7},
            ],
            "courses": [
                {
                    "name": "Программирование",
                    "rating": 5,
                    "isEnabled": False,
                    "id": 452,
                    "directionId": 1
                },
                {
                    "name": "Философия",
                    "rating": 3,
                    "isEnabled": True,
                    "id": 123,
                    "directionId": 3
                },
                {
                    "name": "Экономика",
                    "rating": 2,
                    "isEnabled": False,
                    "id": 4,
                    "directionId": 2
                },
                {
                    "name": "Юриспруденция",
                    "rating": 1,
                    "isEnabled": True,
                    "id": 56,
                    "directionId": 6
                },
                {
                    "name": "Физическая культура",
                    "rating": 1,
                    "isEnabled": False,
                    "id": 53,
                    "directionId": 6
                }
            ],
            "course": {
                    'id': 1,
                    'name': "Философия",
                    'rating': 5,
                    'visible': True,
                    'info': {
                        'mainTag': "#java",
                        'secondaryTag': "#программирование",
                        'ageGroup': "9 – 18",
                        'category': "Естественно-научные",
                        'educationFormat': "Онлайн",
                        'trialLesson': "Есть",
                        'description': "Программирование с нуля",
                        'address': "г. Якутск, ул. Ленина 1, каб 23"
                    },
                    'schedule': [
                        {
                            'date': "ЧТ (18:00-20:00)",
                            'address': "Якутск, ул. Дзержинского 48, к. 128"
                        },
                        {
                            'date': "ПТ (18:00-20:00)",
                            'address': "Якутск, ул. Ленина 1, к. 223"
                        },
                        {
                            'date': "ПН (18:00-20:00)",
                            'address': "Якутск, ул. Дзержинского 48, к. 128"
                        },
                        {
                            'date': "ВТ (18:00-20:00)",
                            'address': "Якутск, ул. Ленина 1, к. 223"
                        },
                        {
                            'date': "СР (18:00-20:00)",
                            'address': "Якутск, ул. Дзержинского 48, к. 128"
                        }
                    ],
                    'educationPeriod': {
                        'start': "15.06.2020",
                        'end': "15.08.2020"
                    },
                    'requests': 64,
                    'numberOfGroups': 4,
                    'groupsCapacity': 15,
                    'places': {
                        'occupied': 4,
                        'available': 13
                    },
                    'charts': {
                        'geography': [
                            {
                                'name': 'Якутск',
                                'value': 4
                            },
                            {
                                'name': 'Нерюнгри',
                                'value': 1
                            },
                            {
                                'name': 'Мирный',
                                'value': 2
                            },
                            {
                                'name': 'Алдан',
                                'value': 3
                            }
                        ],
                        'payments': {
                            'paid': 23,
                            'total': 100
                        },
                        'groups': 100,
                        'vacants': {
                            'occupied': 2,
                            'total': 15
                        },
                        'requests': {
                            'accepted': 20,
                            'total': 33
                        },
                        'directions': [
                            {
                                'name': 'Программирование',
                                'value': 4
                            },
                            {
                                'name': 'Веб дизайн',
                                'value': 1
                            },
                            {
                                'name': 'История',
                                'value': 2
                            },
                            {
                                'name': 'Философия',
                                'value': 3
                            },
                        ],
                        'popularity': [
                            {
                                'paid': 7,
                                'requested': 8,
                                'total': 10
                            },
                            {
                                'paid': 10,
                                'requested': 15,
                                'total': 25
                            },
                            {
                                'paid': 1,
                                'requested': 2,
                                'total': 3
                            },
                            {
                                'paid': 7,
                                'requested': 8,
                                'total': 10
                            },
                            {
                                'paid': 10,
                                'requested': 15,
                                'total': 25
                            },
                            {
                                'paid': 1,
                                'requested': 2,
                                'total': 3
                            },
                            {
                                'paid': 7,
                                'requested': 8,
                                'total': 10
                            },
                            {
                                'paid': 5,
                                'requested': 40,
                                'total': 40
                            },
                            {
                                'paid': 1,
                                'requested': 2,
                                'total': 3
                            },
                            {
                                'paid': 0,
                                'requested': 0,
                                'total': 10
                            },
                            {
                                'paid': 10,
                                'requested': 15,
                                'total': 25
                            },
                            {
                                'paid': 1,
                                'requested': 2,
                                'total': 3
                            }
                        ],
                    }
                },
        }
        return (res)
    # title = data if cond else expr2
    data = CompileJSON()
    return (render(request, 'polls/courses-main.pug', locals()))


def journal(request):
    return render(request, 'polls/journal.html')


def organization_edit(request):
    return render(request, 'polls/organization_edit.html')


def organization_main(request):
    return render(request, 'polls/organization_main.html')


def participants(request):
    return render(request, 'polls/participants.html')


def festivals(request):
    def CompileJSON():
        res = {
            "username": 'example-mail@gmail.com',
            "members_notification": 999,
            "journal_notification": 0,
            "balance": 1330,
        }
        return res

    data = CompileJSON()
    return (render(request, 'polls/festivals.pug', locals()))


def test(request):
    return render(request, 'polls/test.pug')


def portfolio(request):
    return render(request, 'polls/portfolio.html')


def courses_upload_files(request):
    def CompileJSON():
        res = {
            "username": 'example-mail@gmail.com',
            "members_notification": 999,
            "journal_notification": 10,
            "balance": 1330,
        }
        return res

    data = CompileJSON()
    return (render(request, 'polls/courses_upload_files.pug', locals()))


def current_datetime(request):
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)