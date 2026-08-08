from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view() , name="register_user"),
    path("login/", views.LoginView.as_view() ,name="login_user"),
    path('current-user/',views.CurrentUser
    .as_view(), name="current_user"),
    path("profile/" , views.ProfileView.as_view() , name="user-profile")
]
