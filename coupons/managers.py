from datetime import datetime

from django.db.models import Q


class DiscountBaseManager():
    """
    A manager for ``DiscountBase`` filtering.
    """

    def active(self, at_datetime=None, code=''):
        if not at_datetime:
            at_datetime = datetime.now
        qs = self.filter(Q(is_active=True) &
                         Q(valid_from__lte=at_datetime) &
                         (Q(valid_until__isnull=True) | Q(valid_until__gt=at_datetime)))
        qs = qs.filter(Q(code='') | Q(code=code))
        return qs
