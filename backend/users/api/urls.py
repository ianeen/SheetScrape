from django.urls import path

from users.api.views import login_view

urlpatterns = [
    path('login', login_view, name="login")
]