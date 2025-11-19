from rest_framework import viewsets
from .models import Subscription
from .serializers import SubscriptionSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils.timezone import now
from datetime import timedelta
from django.db.models import Sum

class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer


@api_view(['GET'])
def subscription_stats(request):
    today = now().date()
    next_week = today + timedelta(days=7)

    # total monthly cost
    monthly_cost = Subscription.objects.filter(is_active=True, billing_cycle="monthly").aggregate(Sum('cost'))['cost__sum'] or 0

    # total yearly cost converted to monthly equivalent
    yearly_cost = Subscription.objects.filter(is_active=True, billing_cycle="yearly").aggregate(Sum('cost'))['cost__sum'] or 0
    yearly_cost_to_monthly = yearly_cost / 12

    # combine them
    total_monthly_cost = monthly_cost + yearly_cost_to_monthly
    total_yearly_cost = (monthly_cost * 12) + yearly_cost

    # active count
    active_count = Subscription.objects.filter(is_active=True).count()

    # expiring within 7 days
    expiring = Subscription.objects.filter(renewal_date__range=[today, next_week])

    expiring_data = [
        {"name": sub.name, "renewal_date": sub.renewal_date}
        for sub in expiring
    ]

    # cost by category
    subscriptions = Subscription.objects.all()
    cost_by_category = {}
    for sub in subscriptions:
        cost_by_category[sub.category] = cost_by_category.get(sub.category, 0) + float(sub.cost)

    # upcoming renewals (sorted)
    upcoming = subscriptions.order_by('renewal_date')[:5]
    upcoming_data = [
        {"name": sub.name, "renewal_date": sub.renewal_date}
        for sub in upcoming
    ]

    return Response({
        "total_monthly_cost": round(total_monthly_cost, 2),
        "total_yearly_cost": round(total_yearly_cost, 2),
        "active_count": active_count,
        "expiring_soon": expiring_data,
        "cost_by_category": cost_by_category,
        "upcoming_renewals": upcoming_data
    })