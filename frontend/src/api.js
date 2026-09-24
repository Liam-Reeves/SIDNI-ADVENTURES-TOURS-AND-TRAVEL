import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("sidni_access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const normalizeTour = (tour) => {
  const fallbackImages = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=80",
  ];

  const cleanBaseUrl = API_BASE_URL.replace(/\/$/, "");
  const imagePath = tour.cover_image
    ? String(tour.cover_image).replace(/^\/+/, "")
    : "";

  return {
    id: tour.id,
    title: tour.title,
    location: tour.location,
    description: tour.description,
    duration: `${tour.duration_days || 3} days`,
    groupSize: `${tour.max_group_size || 8} people`,
    price: Number(tour.price_per_person || 0),
    rating: "4.9",
    badge: tour.category_name || "Featured",
    image:
      tour.cover_image && tour.cover_image.startsWith("http")
        ? tour.cover_image
        : imagePath
          ? `${cleanBaseUrl}/${imagePath}`
          : fallbackImages[(tour.id || 1) % fallbackImages.length],
    overview: tour.description,
    highlights: [
      "Curated local experiences",
      "Flexible travel planning",
      "Expert-led tour support",
    ],
    itinerary: [
      "Arrival and welcome briefing",
      "Explore the destination with a local guide",
      "Enjoy a memorable final day experience",
    ],
    includes: [
      "Accommodation",
      "Local transport",
      "Guided experiences",
      "Travel support",
    ],
  };
};

export const fetchTours = async () => {
  const response = await api.get("/api/tours/");
  return response.data.map(normalizeTour);
};

export const fetchTourById = async (tourId) => {
  const response = await api.get("/api/tours/");
  const tours = response.data;
  const match = tours.find((tour) => String(tour.id) === String(tourId));

  if (!match) {
    return null;
  }

  return normalizeTour(match);
};

export const fetchTourAvailabilities = async (tourId) => {
  const response = await api.get("/api/tours/availabilities/", {
    params: { tour_id: tourId },
  });

  return response.data;
};

export const fetchMyBookings = async () => {
  const response = await api.get("/api/bookings/my/");
  return response.data;
};

export const createBooking = async ({ availability_id, number_of_people }) => {
  const response = await api.post("/api/bookings/create/", {
    availability_id,
    number_of_people,
  });

  return response.data;
};

export const createMpesaPayment = async ({ booking_id, phone_number }) => {
  const response = await api.post("/api/payments/create-mpesa/", {
    booking_id,
    phone_number,
  });

  return response.data;
};

export const fetchPaymentStatus = async (bookingId) => {
  const response = await api.get(`/api/payments/status/${bookingId}/`);
  return response.data;
};

export default api;
