from django.urls import path

from .views import UserRegistrationView
from .views import LoginView
from .views import MeView

urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("me/", MeView.as_view(), name="me"),
]

