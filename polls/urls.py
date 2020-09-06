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
    path('courses_upload_files/', views.courses_upload_files, name='course_upload_files'),
    path('answer_detail/', views.answer_detail, name="answer_detail"),
    path('test/', views.test, name="test"),
    path('activity_edit', views.activity_edit, name="activity_edit"),
    path('', views.authorization_page, name="authorization_page"),
    path('register/', views.registration_page, name="registration_page")
]

# {% url 'festivals' %}

