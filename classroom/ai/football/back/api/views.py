from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, Order, NewsletterSubscriber
from .serializers import ProductSerializer, OrderSerializer, NewsletterSubscriberSerializer


class ProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing, editing, creating, and deleting Barca jerseys.
    Supports filtering by type (home, away, third, champions) and search queries.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        kit_type = self.request.query_params.get('type', None)
        search = self.request.query_params.get('search', None)

        if kit_type and kit_type != 'all':
            queryset = queryset.filter(type=kit_type)
        if search:
            queryset = queryset.filter(
                models.Q(name__icontains=search) | 
                models.Q(player__icontains=search) | 
                models.Q(description__icontains=search)
            )
        return queryset


class OrderViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling placement of customized shirt orders.
    """
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer
    # In production, order viewing might require authentication, but we allow-all for demonstration
    permission_classes = []


class NewsletterSubscriberViewSet(viewsets.ModelViewSet):
    """
    ViewSet to handle email newsletter subscriptions.
    """
    queryset = NewsletterSubscriber.objects.all().order_by('-subscribed_at')
    serializer_class = NewsletterSubscriberSerializer


@api_view(['POST'])
def seed_database(request):
    """
    Custom endpoint to populate initial official FC Barcelona kit data in SQLite.
    """
    initial_kits = [
        {
            "id": "home-jersey",
            "name": "FC Barcelona 2026/27 Home Jersey",
            "description": "The classic Blaugrana colors return with a revolutionary visual gradient. Engineered with high-ventilation AeroWeave technology, this is the authentic match kit worn by Lamine Yamal and the squad at Spotify Camp Nou.",
            "price": 149.99,
            "image": "https://images.unsplash.com/photo-1518144591331-17a5dd71c477?auto=format&fit=crop&w=800&q=80",
            "player": "LAMINE YAMAL",
            "type": "home",
            "is_best_seller": True,
            "rating": 4.9,
            "reviews_count": 240
        },
        {
            "id": "away-jersey",
            "name": "FC Barcelona 2026/27 Away Jersey",
            "description": "Embrace the sleek obsidian dark aesthetics accented by glowing neon crimson and royal blue. Features moisture-wicking DriFit elements and custom lightweight player nameplates.",
            "price": 139.99,
            "image": "https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80",
            "player": "PEDRI",
            "type": "away",
            "is_best_seller": True,
            "rating": 4.8,
            "reviews_count": 185
        },
        {
            "id": "third-jersey",
            "name": "FC Barcelona 2026/27 Third Jersey",
            "description": "Inspired by the vintage cream aesthetic and Catalonia architecture. Featuring fine metallic gold detailing and the official sub-embossed club crest. Complete premium luxury on and off the pitch.",
            "price": 129.99,
            "image": "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80",
            "player": "GAVI",
            "type": "third",
            "is_best_seller": False,
            "rating": 4.7,
            "reviews_count": 92
        },
        {
            "id": "champions-jersey",
            "name": "FCB 125th Anniversary Edition",
            "description": "Strictly limited edition celebrating 125 years of visual sports prestige. Styled in retro color blocks with original heavy lace collars and signature golden anniversary insignias.",
            "price": 189.99,
            "image": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
            "player": "F. DE JONG",
            "type": "champions",
            "is_best_seller": True,
            "rating": 5.0,
            "reviews_count": 310
        }
    ]

    count = 0
    for kit in initial_kits:
        obj, created = Product.objects.update_or_create(
            id=kit['id'],
            defaults={
                "name": kit['name'],
                "description": kit['description'],
                "price": kit['price'],
                "image": kit['image'],
                "player": kit['player'],
                "type": kit['type'],
                "is_best_seller": kit['is_best_seller'],
                "rating": kit['rating'],
                "reviews_count": kit['reviews_count'],
            }
        )
        if created:
            count += 1

    return Response({
        "status": "success",
        "message": f"Seeded {count} products successfully. All 4 official 2026/27 kits are active!",
        "total_active_products": Product.objects.count()
    }, status=status.HTTP_200_OK)
