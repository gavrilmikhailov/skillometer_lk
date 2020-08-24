from django.shortcuts import render
from django.http import HttpResponse
import datetime
import json


# Create your views here.
def courses_edit(request):
    def CompileJSON():
        res = {
            "username": "example-mail@gmail.com",
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
    return (render(request, "polls/courses_edit.pug", locals()))


def courses_empty(request):
    def CompileJSON():
        res = {
            "username": "example-mail@gmail.com",
            "members_notification": 999,
            "journal_notification": 10,
            "balance": 1330,
        }
        return res

    data = CompileJSON()
    return (render(request, "polls/courses_empty.pug", locals()))


def courses(request, id_category=None, id_course=None):
    title = "Курсы"
    organizationAddress = "Вот эта улица"
    user = {"email": "test@test.te", }
    course = {
        "name": "Rocket Science",
        "tag": "#someTag",
        "age": "50-55",
        "speciality": {"id": 12, "name": "Языковые", },
        "description": "Какое то описание",
        "address": "Вот этот дом",
    }
    courses = [
        {
            "name": "j J j J j J j j j j j j j j j j j j j j J j J j J j j j j j j j j j j j j j j J j J j J j j j j j j j j j j j j j j J j J j J j j j j j j j j j j j j j j J j J j J j j j j j j j j j j j j j ",
            "rating": 5,
            "isEnabled": False,
            "id": 452,
            "selected": False,
            "directionId": 1
        },
        {
            "name": "Философия",
            "rating": 3,
            "isEnabled": True,
            "selected": True,
            "id": 123,
            "directionId": 3
        },
        {
            "name": "Экономика",
            "rating": 2,
            "isEnabled": False,
            "selected": False,
            "id": 4,
            "directionId": 2
        },
        {
            "name": "Юриспруденция",
            "rating": 1,
            "isEnabled": True,
            "selected": False,
            "id": 56,
            "directionId": 6
        },
        {
            "name": "Физическая культура",
            "rating": 1,
            "isEnabled": False,
            "selected": False,
            "id": 53,
            "directionId": 6
        }
    ]
    courseCategories = [
        {"title": "Физкультурно-спортивные", "id": 1},
        {"title": "Естественно-научные", "id": 2},
        {"title": "Социально-спортивные", "id": 3},
        {"title": "Инженерные и ИТ", "id": 4},
        {"title": "Языковые", "id": 5},
        {"title": "Творчество", "id": 6},
        {"title": "Предпринимательские", "id": 7},
    ]
    courseMemberCount = 0
    months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']

    return (render(request, "polls/courses-main.pug", locals()))


def journal(request):
    def CompileJSON():
        res = {
            "username": "example-mail@gmail.com",
            "members_notification": 999,
            "journal_notification": 0,
            "balance": 1330,
            "lesson": {
                "title": "Основы программирования",
                "duration": "3 дня",
                "scores": {
                    "max": 50,
                    "passing": 40
                },
                "course": {
                    "name": "Информатика",
                    "category": "Инженерные и ИТ",
                    "numberOfTasks": 20
                },
                "total": 20,
                "turnedOut": 15,
                "averageScore": 45,
                "passed": 15,
                "notPassed": 4,
                "failed": 5,
                "answersLen": 6,
                "answersMissingLen": 3,
                "answers": [
                    {
                        "id": 1,
                        "name": "Иванов Сергей",
                        "image": "/static/assets/user_icon_red.svg",
                        "group": "АБ-13",
                        "attemptsNumber": "1 (5)",
                        "score": "45 / 50 (85%)",
                        "taskNumber": 5,
                        "description": "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичный образ жизни.",
                        "time": "15:30",
                        "date": "30.06.20",
                        "attempts": [
                            {
                                "body": "Далеко далеко что то происходит, оцените на пять плз",
                                "mark": 2,
                                "isCorrect": False,
                                "comment": "Тут должен быть комментарий преподавателя"
                            },
                            {
                                "body": "Это вторая попытка и ответ неверный",
                                "mark": 3,
                                "isCorrect": False,
                                "comment": "Тут должен быть комментарий преподавателя"
                            },
                            {
                                "body": "Это третья попытка и все должно быть верно",
                                "mark": 5,
                                "isCorrect": True,
                            }
                        ],
                    },
                    {
                        "name": "Петрова Наталья",
                        "image": "/static/assets/user_icon_red.svg",
                        "group": "АБ-12",
                        "attemptsNumber": "2 (5)",
                        "score": "15 / 50 (30%)",
                        "taskNumber": 3,
                        "description": "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичный образ жизни.",
                        "time": "15:35",
                        "date": "30.06.20",
                        "id": 2,
                        "attempts": [
                            {
                                "body": "Далеко далеко что то происходит, оцените на пять плз",
                                "mark": 2,
                                "isCorrect": False,
                                "comment": "Тут должен быть комментарий преподавателя"
                            },
                            {
                                "body": "Это вторая попытка и ответ неверный",
                                "mark": 3,
                                "isCorrect": False,
                                "comment": "Тут должен быть комментарий преподавателя"
                            },
                            {
                                "body": "Это третья попытка и все должно быть верно",
                                "mark": 5,
                                "isCorrect": True,
                                "comment": "Тут должен"
                            },
                            {
                                "body": "Это еще не проверенное задание",
                                "mark": 5,
                                "isCorrect": True,
                                "comment": "Тут должен"
                            }
                        ]
                    },
                    {
                        "name": "Майкл Джексон",
                        "image": "/static/assets/user_icon_red.svg",
                        "group": "АБ-11",
                        "attemptsNumber": "3 (5)",
                        "score": "35 / 50 (70%)",
                        "taskNumber": 4,
                        "description": "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичный образ жизни.",
                        "attempts": [
                            {
                                "body": "Далеко далеко что то происходит, оцените на пять плз",
                                "mark": 2,
                                "isCorrect": False,
                                "comment": "Тут должен быть комментарий преподавателя"
                            },
                            {
                                "body": "Это вторая попытка и ответ неверный",
                                "mark": 3,
                                "isCorrect": False,
                                "comment": "Тут должен быть комментарий преподавателя"
                            },
                            {
                                "body": "Это третья попытка и все должно быть верно",
                                "mark": 5,
                                "isCorrect": True,
                                "comment": "Тут должен"
                            }
                        ],
                        "time": "15:40",
                        "date": "29.06.20",
                        "id": 3
                    },
                    {
                        "name": "Майк Тайсон",
                        "image": "/static/assets/user_icon_red.svg",
                        "group": "АБ-10",
                        "attemptsNumber": "1 (5)",
                        "score": "10 / 50 (20%)",
                        "taskNumber": 2,
                        "description": "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичный образ жизни.",
                        "attempts": [
                            {
                                "body": "Далеко далеко что то происходит, оцените на пять плз",
                            "mark": 2,
                    "isCorrect": False,
                    "comment": "Тут должен быть комментарий преподавателя"
                    },
                    {
                        "body": "Это вторая попытка и ответ неверный",
                        "mark": 3,
                        "isCorrect": False,
                        "comment": "Тут должен быть комментарий преподавателя"
                    },
                    {
                        "body": "Это третья попытка и все должно быть верно",
                        "mark": 5,
                        "isCorrect": True,
                        "comment": "Тут должен"
                    }
                    ],
                    "time": "10:50",
                    "date": "30.06.20",
                    "id": 4
                    },
                    {
                        "name": "Ксения Собчак",
                        "image": "/static/assets/user_icon_red.svg",
                        "group": "АБ-15",
                        "attemptsNumber": "4 (5)",
                        "score": "50 / 50 (100%)",
                        "time": "15:20",
                        "date": "28.06.20",
                        "id": 5,
                        "taskNumber": 1,
                        "description": "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичный образ жизни.",
                        "attempts": [
                            {
                                "body": "Далеко далеко что то происходит, оцените на пять плз",
                             "mark": 2,
                    "isCorrect": False,
                    "comment": "Тут должен быть комментарий преподавателя",
                    "date": "2020-06-20T10:40+09:00"
                    },
                    {
                        "body": "Это вторая попытка и ответ неверный",
                        "mark": 3,
                        "isCorrect": False,
                        "comment": "Тут должен быть комментарий преподавателя"
                    },
                    {
                        "body": "Это третья попытка и все должно быть верно",
                        "mark": 5,
                        "isCorrect": True,
                        "comment": "Тут должен"
                    }
                    ],
                    },
                    {
                        "name": "Билл Гейтс",
                        "image": "/static/assets/user_icon_red.svg",
                        "group": "АБ-10",
                        "attemptsNumber": "2 (5)",
                        "score": "45 / 50 (85%)",
                        "taskNumber": 8,
                        "description": "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичный образ жизни.",
                        "attempts": [
                            {
                                "body": "Далеко далеко что то происходит, оцените на пять плз",
                             "mark": 2,
                    "isCorrect": False,
                    "comment": "Тут должен быть комментарий преподавателя"
                    },
                    {
                        "body": "Это вторая попытка и ответ неверный",
                        "mark": 3,
                        "isCorrect": False,
                        "comment": "Тут должен быть комментарий преподавателя"
                    },
                    {
                        "body": "Это третья попытка и все должно быть верно",
                        "mark": 5,
                        "isCorrect": True,
                        "comment": "Тут должен"
                    }
                    ],
                    "time": "15:30",
                    "date": "25.06.20",
                    "id": 6
                    }
                ],
                "answersMissing": [
                        {
                            "name": "Майкл Джексон",
                            "image": "/static/assets/user_icon_red.svg",
                            "group": "АБ-88",
                            "attemptsNumber": "3 (5)",
                            "score": "35 / 50 (60%)",
                            "taskNumber": 6,
                            "description": "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичный образ жизни.",
                            "attempts": [
                                {
                                    "body": "Далеко далеко что то происходит, оцените на пять плз",
                                    "mark": 2,
                                    "isCorrect": False,
                                    "comment": "Тут должен быть комментарий преподавателя"
                                },
                                {
                                    "body": "Это вторая попытка и ответ неверный",
                                    "mark": 3,
                                    "isCorrect": False,
                                    "comment": "Тут должен быть комментарий преподавателя"
                                },
                                {
                                    "body": "Это третья попытка и все должно быть верно",
                                    "mark": 5,
                                    "isCorrect": True,
                                    "comment": "Тут должен"
                                },
                                {
                                    "body": "Далеко далеко что то происходит, оцените на пять плз",
                                    "mark": 2,
                                    "isCorrect": False,
                                    "comment": "Тут должен быть комментарий преподавателя"
                                },
                                {
                                    "body": "Это вторая попытка и ответ неверный",
                                    "mark": 3,
                                    "isCorrect": False,
                                    "comment": "Тут должен быть комментарий преподавателя"
                                },
                                {
                                    "body": "Это третья попытка и все должно быть верно",
                                    "mark": 5,
                                    "isCorrect": True,
                                    "comment": "Тут должен"
                                },
                                {
                                    "body": "Далеко далеко что то происходит, оцените на пять плз",
                                    "mark": 2,
                                    "isCorrect": False,
                                    "comment": "Тут должен быть комментарий преподавателя"
                                },
                                {
                                    "body": "Это вторая попытка и ответ неверный",
                                    "mark": 3,
                                    "isCorrect": False,
                                    "comment": "Тут должен быть комментарий преподавателя"
                                },
                                {
                                    "body": "Это третья попытка и все должно быть верно",
                                    "mark": 5,
                                    "isCorrect": True,
                                    "comment": "Тут должен"
                                }
                            ],
                            "time": "15:40",
                            "date": "20.05.20",
                            "id": 7
                        },
                        {
                            "name": "Петрова Наталья",
                            "image": "/static/assets/user_icon_red.svg",
                            "group": "АБ-83",
                            "attemptsNumber": "2 (5)",
                            "score": "15 / 50 (100%)",
                            "taskNumber": 7,
                            "description": "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичный образ жизни.",
                            "attempts": [
                                {
                                    "body": "Далеко далеко что то происходит, оцените на пять плз",
                                    "mark": 2,
                                    "isCorrect": False,
                                    "comment": "Тут должен быть комментарий преподавателя"
                                },
                                {
                                    "body": "Это вторая попытка и ответ неверный",
                                    "mark": 3,
                                    "isCorrect": False,
                                    "comment": "Тут должен быть комментарий преподавателя"
                                },
                                {
                                    "body": "Это третья попытка и все должно быть верно",
                                    "mark": 5,
                                    "isCorrect": True,
                                    "comment": "Тут должен"
                                }
                            ],
                            "time": "15:15",
                            "date": "30.06.20",
                            "id": 8
                        },
                        {
                            "name": "Иванов Сергей",
                            "image": "/static/assets/user_icon_red.svg",
                            "group": "АБ-90",
                            "attemptsNumber": "1 (5)",
                            "score": "45 / 50 (85%)",
                            "taskNumber": 10,
                            "description": "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичный образ жизни.",
                            "attempts": [
                                {
                                    "body": "Далеко далеко что то происходит, аоцените на пять плз",
                                    "mark": 2,
                                    "isCorrect": False,
                                    "comment": "Тут должен быть комментарий преподавателя"
                                },
                                {
                                    "body": "Это вторая попытка и ответ неверный",
                                    "mark": 3,
                                    "isCorrect": False,
                                    "comment": "Тут должен быть комментарий преподавателя"
                                },
                                {
                                    "body": "Это третья попытка и все должно быть верно",
                                    "mark": 5,
                                    "isCorrect": True,
                                    "comment": "Тут должен"
                                }
                            ],
                            "time": "15:10",
                            "date": "25.06.20",
                            "id": 9
                        },
                    ]
            },
            "lessons": [
                {
                    "name": "Занятие №1",
                    "id": 12
                }
            ]
        }
        return res
    data = CompileJSON()
    return render(request, "polls/journal.pug", locals())


def organization_edit(request):
    return render(request, "polls/organization_edit.html")


def answer_detail(request):
    return render(request, "polls/answer_detail.pug", locals())


def organization_main(request):
    return render(request, "polls/organization_main.html")


def participants(request):
    return render(request, "polls/participants.html")


def festivals(request):
    def CompileJSON():
        res = {
            "username": "example-mail@gmail.com",
            "members_notification": 999,
            "journal_notification": 0,
            "balance": 1330,
        }
        return res

    data = CompileJSON()
    return (render(request, "polls/festivals.pug", locals()))


def test(request):
    return render(request, "polls/test.pug")


def portfolio(request):
    return render(request, "polls/portfolio.html")


def courses_upload_files(request):
    def CompileJSON():
        res = {
            "username": "example-mail@gmail.com",
            "members_notification": 999,
            "journal_notification": 10,
            "balance": 1330,
        }
        return res

    data = CompileJSON()
    return (render(request, "polls/courses_upload_files.pug", locals()))


def current_datetime(request):
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)