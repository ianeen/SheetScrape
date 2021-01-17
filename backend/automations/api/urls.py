from django.urls import path

from automations.api.views import create_view

urlpatterns = [
    path('create', create_view, name="create")
]