from django.urls import path
from .views import SearchView
from .views import DocumentUploadView

urlpatterns = [
    path(
        "upload/",
        DocumentUploadView.as_view(),
        name="document-upload",
    ),
    
    path(
    "search/",
    SearchView.as_view(),
    name="semantic-search",
),
]