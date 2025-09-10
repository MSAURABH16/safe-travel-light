import { useState } from "react";
import { Utensils, Leaf, Star, Shield, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LocationHeatmap from "@/components/LocationHeatmap";

export default function Restaurants() {
  const [restaurants] = useState([
    {
      id: 1,
      name: "Green Garden Cafe",
      type: "veg",
      rating: 4.8,
      hygieneScore: 95,
      distance: "0.2 km",
      openTime: "7:00 AM",
      closeTime: "10:00 PM",
      specialties: ["Organic", "Gluten-Free"],
      priceRange: "$$",
    },
    {
      id: 2,
      name: "Ocean Delights",
      type: "non-veg",
      rating: 4.6,
      hygieneScore: 92,
      distance: "0.5 km",
      openTime: "11:00 AM",
      closeTime: "11:00 PM",
      specialties: ["Seafood", "Halal"],
      priceRange: "$$$",
    },
    {
      id: 3,
      name: "Pure Veg Express",
      type: "veg",
      rating: 4.7,
      hygieneScore: 98,
      distance: "0.3 km",
      openTime: "8:00 AM",
      closeTime: "9:00 PM",
      specialties: ["Pure Veg", "Jain Food"],
      priceRange: "$",
    },
    {
      id: 4,
      name: "Grill Master",
      type: "non-veg",
      rating: 4.5,
      hygieneScore: 90,
      distance: "0.7 km",
      openTime: "12:00 PM",
      closeTime: "12:00 AM",
      specialties: ["BBQ", "Steaks"],
      priceRange: "$$$",
    },
  ]);

  const getHygieneColor = (score: number) => {
    if (score >= 95) return "text-success";
    if (score >= 85) return "text-warning";
    return "text-destructive";
  };

  const getHygieneBadge = (score: number) => {
    if (score >= 95) return "bg-success text-success-foreground";
    if (score >= 85) return "bg-warning text-warning-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  const filterRestaurants = (type: string) => {
    if (type === "all") return restaurants;
    return restaurants.filter(restaurant => restaurant.type === type);
  };

  const RestaurantCard = ({ restaurant }: { restaurant: any }) => (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            {restaurant.name}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-warning fill-current" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge variant={restaurant.type === "veg" ? "success" : "secondary"}>
            {restaurant.type === "veg" ? (
              <><Leaf className="h-3 w-3 mr-1" />Vegetarian</>
            ) : (
              "Non-Vegetarian"
            )}
          </Badge>
          <Badge className={getHygieneBadge(restaurant.hygieneScore)}>
            <Shield className="h-3 w-3 mr-1" />
            Hygiene {restaurant.hygieneScore}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{restaurant.distance} away</span>
          </div>
          <span className="text-sm font-medium">{restaurant.priceRange}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="text-sm">
            {restaurant.openTime} - {restaurant.closeTime}
          </span>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">Specialties:</span>
          <div className="flex gap-1 flex-wrap">
            {restaurant.specialties.map((specialty: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            View Menu
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            Get Directions
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Nearby Restaurants</h1>
        <Badge variant="outline">Based on your location</Badge>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Restaurants</TabsTrigger>
          <TabsTrigger value="veg" className="flex items-center gap-2">
            <Leaf className="h-4 w-4" />
            Vegetarian
          </TabsTrigger>
          <TabsTrigger value="non-veg">Non-Vegetarian</TabsTrigger>
          <TabsTrigger value="map">Location Map</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filterRestaurants("all").map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="veg" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filterRestaurants("veg").map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="non-veg" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filterRestaurants("non-veg").map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <LocationHeatmap />
        </TabsContent>
      </Tabs>

      {/* Hygiene Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Hygiene Standards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-success mb-2">95-100%</div>
              <h3 className="font-medium text-success">Excellent</h3>
              <p className="text-sm text-muted-foreground">Highest hygiene standards</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-warning mb-2">85-94%</div>
              <h3 className="font-medium text-warning">Good</h3>
              <p className="text-sm text-muted-foreground">Meets hygiene requirements</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-destructive mb-2">Below 85%</div>
              <h3 className="font-medium text-destructive">Caution</h3>
              <p className="text-sm text-muted-foreground">Consider alternatives</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}