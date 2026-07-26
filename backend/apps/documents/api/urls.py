from django.urls import path
from .views import SearchView
from .views import( DocumentUploadView,
                    DocumentDeleteView,
                    DocumentListView,
                    DocumentDetailView,
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
    
    path(
        "",
        DocumentListView.as_view(),
        name="document-list",
    ),
    
    path(
        "<int:pk>/detail/",
         DocumentDetailView.as_view(),
         name="document-detail",
    ),
    
]