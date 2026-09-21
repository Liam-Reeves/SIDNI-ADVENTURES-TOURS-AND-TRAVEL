from django.test import SimpleTestCase


class RootURLTests(SimpleTestCase):
    def test_root_redirects_to_tours_api(self):
        response = self.client.get('/')

        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/api/tours/')
