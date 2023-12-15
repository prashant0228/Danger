"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from . import views
from .ass9view import predict_disease




urlpatterns = [ 
    path('predict_disease/', predict_disease, name='predict_disease'),
    path("admin", admin.site.urls),
    path('calculate', views.upload_csv, name='upload_csv' ), 
    path('pearson', views.calculate_pearson, name='pearson' ), 
    path('classify/<str:method>/', views.classify, name='classify'),
    path('regression/', views.regression_classifier, name='regression_classifier'),
    path('naive_bayesian/', views.naive_bayesian_classifier, name='naive_bayesian_classifier'),
    path('knn/', views.knn_classifier, name='knn_classifier'),
    path('ann/', views.ann_classifier, name='ann_classifier'),
    path('dendrogram/', views.dendrogram_view, name='dendrogram'),
    path('kmeans/', views.kmeans_view, name='kmeans'),
    path('kmedoids/', views.kmedoids_view, name='kmedoids'),
    # write path for dbscan_view and birch_view
    path('birch/', views.birch_view, name='birch'),
    path('dbscan/', views.dbscan_view, name='dbscan'),
    # for clustering
    path('clustering/',views.clustering_view,name='clustering'),
    path('run_association_rules/', views.run_association_rules, name='run_association_rules'),
    path('run_association_rules_matrics/', views.run_association_rules_matrics, name='run_association_rules'),
    
    # ass8-=>crawl,pagerank,hitscore
    path('pagerank/', views.get_page_rank, name='calculate_page_rank'),
    path('hitscore/', views.get_hits_scores, name='calculate_hits_scores'),
    path('crawl/', views.crawl_urls, name='crawl_urls'),

    # ass9

    path('admin/', admin.site.urls),
    path('predict/', predict_disease, name='predict_disease'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
