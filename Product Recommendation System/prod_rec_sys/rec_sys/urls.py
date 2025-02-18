from django.urls import path
from . import views

urlpatterns = [
    path('recommend/<int:user_id>/', views.recommend_products, name='recommend_products'),
]