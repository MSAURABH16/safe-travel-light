import { useState } from "react";
import { MapPin, Clock, Users, Star, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Places() {
  const [places] = useState([
    {
      id: 1,
      name: "Times Square",
      crowdLevel: 85,
      status: "Open",
      openTime: "24/7",
      closeTime: "24/7",
      rating: 4.5,
      nextEvent: "New Year Celebration - Dec 31",
    },
    {
      id: 2,
      name: "Central Park",
      crowdLevel: 45,
      status: "Open",
      openTime: "6:00 AM",
      closeTime: "1:00 AM",
      rating: 4.8,
      nextEvent: "Shakespeare in the Park - Summer",
    },
    {
      id: 3,
      name: "Empire State Building",
      crowdLevel: 70,
      status: "Open",
      openTime: "9:00 AM",
      closeTime: "11:00 PM",
      rating: 4.6,
      nextEvent: "Light Show - Daily at sunset",
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
    </div>
  );
}