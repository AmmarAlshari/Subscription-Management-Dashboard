from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SubscriptionViewSet,subscription_stats

router = DefaultRouter()
router.register(r'subscriptions', SubscriptionViewSet, basename='subscription')

urlpatterns = router.urls

urlpatterns += [
    path('stats/', subscription_stats),
]