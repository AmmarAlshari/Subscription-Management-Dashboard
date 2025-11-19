from django.db import models
from datetime import timedelta

class Subscription(models.Model):
    BILLING_CHOICES = [
        ('monthly', 'Monthly'),
        ('yearly', 'Yearly'),
    ]

    name = models.CharField(max_length=100)
    cost = models.FloatField()
    billing_cycle = models.CharField(max_length=10, choices=BILLING_CHOICES)
    start_date = models.DateField()
    renewal_date = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    category = models.CharField(max_length=50, blank=True, null=True)

    # Auto-calc renewal date before saving
    def save(self, *args, **kwargs):
        # Always recalc renewal_date based on billing_cycle
        if self.billing_cycle == 'monthly':
            self.renewal_date = self.start_date + timedelta(days=30)
        elif self.billing_cycle == 'yearly':
            self.renewal_date = self.start_date + timedelta(days=365)

        super().save(*args, **kwargs)  # always save!

    def __str__(self):
        return self.name
