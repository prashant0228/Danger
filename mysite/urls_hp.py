from django.urls import path
from .ass9view import predict_disease

urlpatterns = [
    path('predict/', predict_disease, name='predict_disease'),
]