from django.test import TestCase

from tours.models import Tour


class TourListAPITests(TestCase):
    def test_tour_list_returns_active_tours(self):
        Tour.objects.create(
            title='Test Tour',
            description='A test tour',
            location='Nairobi',
            price_per_person=1200,
            duration_days=3,
            max_group_size=10,
            is_active=True,
        )

        response = self.client.get('/api/tours/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]['title'], 'Test Tour')
