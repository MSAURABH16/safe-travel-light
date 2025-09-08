import { useState } from "react";
import { History, AlertTriangle, Cloud, Zap, Waves, Mountain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SafetyInfo() {
  const [historicalEvents] = useState([
    {
      id: 1,
      title: "Hurricane Sandy",
      date: "October 2012",
      type: "Hurricane",
      impact: "High",
      description: "Major hurricane causing widespread flooding and power outages in NYC area.",
    },
    {
      id: 2,
      title: "Northeast Blackout",
      date: "August 2003",
      type: "Power Outage",
      impact: "Medium",
      description: "Massive power outage affecting millions across the Northeast.",
    },
    {
      id: 3,
      title: "Blizzard of 2016",
      date: "January 2016",
      type: "Snowstorm",
      impact: "High",
      description: "Record-breaking snowfall causing travel bans and closures.",
    },
  ]);

  const [currentAlerts] = useState([
    {
      id: 1,
      type: "Weather",
      severity: "Medium",
      title: "Thunderstorm Watch",
      description: "Severe thunderstorms possible this afternoon. Stay indoors if possible.",
      expires: "6:00 PM Today",
    },
    {
      id: 2,
      type: "Traffic",
      severity: "Low",
      title: "Road Construction",
      description: "Lane closures on Main Street. Expect delays.",
      expires: "End of week",
    },
  ]);

  const [upcomingRisks] = useState([
    {
      id: 1,
      risk: "Hurricane Season",
      timeframe: "June - November",
      probability: "Medium",
      preparation: "Emergency kit, evacuation plan",
    },
    {
      id: 2,
      risk: "Winter Storms",
      timeframe: "December - March",
      probability: "High",
      preparation: "Warm clothing, food supplies",
    },
    {
      id: 3,
      risk: "Heat Waves",
      timeframe: "July - August",
      probability: "High",
      preparation: "Stay hydrated, avoid outdoor activities",
    },
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getDisasterIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "hurricane": case "weather": return Cloud;
      case "power outage": return Zap;
      case "snowstorm": return Mountain;
      case "flood": return Waves;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Safety Information</h1>
        <Badge variant="outline">Updated 2 hours ago</Badge>
      </div>

      {/* Current Alerts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Current Alerts</h2>
        {currentAlerts.map((alert) => {
          const Icon = getDisasterIcon(alert.type);
          return (
            <Alert key={alert.id} className="border-l-4 border-l-warning">
              <Icon className="h-4 w-4" />
              <AlertDescription>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{alert.title}</span>
                      <Badge variant={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p>{alert.description}</p>
                    <p className="text-sm text-muted-foreground">Expires: {alert.expires}</p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          );
        })}
      </div>

      <Tabs defaultValue="history" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">Historical Events</TabsTrigger>
          <TabsTrigger value="risks">Upcoming Risks</TabsTrigger>
          <TabsTrigger value="preparation">Preparation Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historicalEvents.map((event) => {
              const Icon = getDisasterIcon(event.type);
              return (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      {event.title}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline">{event.date}</Badge>
                      <Badge variant={getSeverityColor(event.impact)}>
                        {event.impact} Impact
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingRisks.map((risk) => (
              <Card key={risk.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    {risk.risk}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">{risk.timeframe}</Badge>
                    <Badge variant={getSeverityColor(risk.probability)}>
                      {risk.probability} Risk
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Recommended Preparation:</span>
                    <p className="text-muted-foreground">{risk.preparation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="preparation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Kit Essentials</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Water (1 gallon per person per day for 3 days)</li>
                  <li>• Non-perishable food (3-day supply)</li>
                  <li>• Flashlight and extra batteries</li>
                  <li>• First aid kit</li>
                  <li>• Whistle for signaling help</li>
                  <li>• Dust masks and plastic sheeting</li>
                  <li>• Personal hygiene items</li>
                  <li>• Important documents (copies)</li>
                  <li>• Cell phone chargers</li>
                  <li>• Cash in small bills</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Communication Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Designate an out-of-state contact</li>
                  <li>• Keep emergency contacts updated</li>
                  <li>• Know evacuation routes</li>
                  <li>• Identify meeting points</li>
                  <li>• Register for local alerts</li>
                  <li>• Download emergency apps</li>
                  <li>• Keep battery-powered radio</li>
                  <li>• Practice your plan regularly</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}