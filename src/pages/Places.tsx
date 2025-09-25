import { useState } from "react";
import { MapPin, Clock, Users, Star, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LocationHeatmap from "@/components/LocationHeatmap";

export default function Places() {
  const [places] = useState([
    {
      id: 1,
      name: "India Gate",
      crowdLevel: 78,
      status: "Open",
      openTime: "24/7",
      closeTime: "24/7",
      rating: 4.4,
      nextEvent: "Republic Day Parade - Jan 26",
    },
    {
      id: 2,
      name: "Marina Beach",
      crowdLevel: 52,
      status: "Open",
      openTime: "5:30 AM",
      closeTime: "9:45 PM",
      rating: 4.7,
      nextEvent: "Beach Festival - Dec 15",
    },
    {
      id: 3,
      name: "Gateway of India",
      crowdLevel: 63,
      status: "Open",
      openTime: "6:15 AM",
      closeTime: "10:30 PM",
      rating: 4.5,
      nextEvent: "Heritage Walk - Daily 5 PM",
    },
    {
      id: 4,
      name: "Charminar",
      crowdLevel: 57,
      status: "Open",
      openTime: "9:15 AM",
      closeTime: "5:45 PM",
      rating: 4.3,
      nextEvent: "Ramzan Celebrations - Varies",
    },
    {
      id: 5,
      name: "Mysore Palace",
      crowdLevel: 36,
      status: "Open",
      openTime: "10:30 AM",
      closeTime: "5:15 PM",
      rating: 4.6,
      nextEvent: "Dasara Festival - Oct",
    },
    {
      id: 6,
      name: "Hawa Mahal",
      crowdLevel: 48,
      status: "Open",
      openTime: "8:45 AM",
      closeTime: "4:45 PM",
      rating: 4.1,
      nextEvent: "Cultural Show - Weekends",
    },
  ]);

  const getCrowdColor = (level: number) => {
    if (level < 30) return "text-success";
    if (level < 70) return "text-warning";
    return "text-destructive";
  };

  const getCrowdLabel = (level: number) => {
    if (level < 30) return "Low";
    if (level < 70) return "Moderate";
    return "High";
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Places & Crowd Info</h1>
        <Badge variant="outline">Live Updates</Badge>
      </div>

      <Tabs defaultValue="places" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="places">Places List</TabsTrigger>
          <TabsTrigger value="map">Location Map</TabsTrigger>
        </TabsList>
        
        <TabsContent value="places" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <Card key={place.id} className="space-y-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {place.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-warning fill-current" />
                    <span className="text-sm">{place.rating}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Crowd Level</span>
                      <span className={`text-sm font-bold ${getCrowdColor(place.crowdLevel)}`}>
                        {getCrowdLabel(place.crowdLevel)}
                      </span>
                    </div>
                    <Progress value={place.crowdLevel} className="h-2" />
                    <span className="text-xs text-muted-foreground">{place.crowdLevel}% capacity</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <div className="flex-1">
                      <div className="text-sm">
                        <span className="font-medium">Open:</span> {place.openTime}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Close:</span> {place.closeTime}
                      </div>
                    </div>
                    <Badge className={place.status === "Open" ? "bg-success" : "bg-destructive"}>
                      {place.status}
                    </Badge>
                  </div>

                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-0.5" />
                    <div className="text-sm">
                      <span className="font-medium">Upcoming:</span>
                      <p className="text-muted-foreground">{place.nextEvent}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="map">
          <LocationHeatmap />
        </TabsContent>
      </Tabs>
    </div>
  );
}