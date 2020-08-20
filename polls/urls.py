from django.urls import path

from . import views

urlpatterns = [
    path('courses_edit/', views.courses_edit, name='courses_edit'),
    path('courses_empty/', views.courses_empty, name='courses_empty'),
    path('organization_edit/', views.organization_edit, name="organization_edit"),
    path('organization/', views.organization_main, name="organization_main"),
    path('participants/', views.participants, name="participants"),
    path('journal/', views.journal, name='journal'),
    path('festivals/', views.festivals, name='festivals'),
    path('portfolio/', views.portfolio, name='portfolio'),
    path('date/', views.current_datetime, name='datetime'),
    path('courses/', views.courses, name='courses_main'),
    path('test/', views.test, name="test")
]

# {% url 'festivals' %}

