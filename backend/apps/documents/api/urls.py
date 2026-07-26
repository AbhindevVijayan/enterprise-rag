from django.urls import path
from .views import SearchView
from .views import( DocumentUploadView,
                    DocumentDeleteView,
                    
                   )

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
    
    path(
        "<int:pk>/",
        DocumentDeleteView.as_view(),
        name="document-delete",
    ),
    
    
    
]