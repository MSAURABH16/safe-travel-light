import { useState } from "react";
import { Users, MessageCircle, Phone, Video, MapPin, Star, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Volunteers() {
  const [volunteers] = useState([
    {
      id: 1,
      name: "Alex Thompson",
      rating: 4.7,
      languages: ["English", "Hindi"],
      location: "Connaught Place Area",
      distance: "0.4 km",
      available: true,
      specialties: ["Local Guide", "Emergency Response"],
      responseTime: "3 min",
      helpedCount: 127,
    },
    {
      id: 2,
      name: "Maria Garcia",
      rating: 4.6,
      languages: ["English", "Tamil", "Malayalam"],
      location: "Marina Beach",
      distance: "0.9 km",
      available: true,
      specialties: ["Medical Aid", "Translation"],
      responseTime: "4 min",
      helpedCount: 73,
    },
    {
      id: 3,
      name: "John Chen",
      rating: 4.8,
      languages: ["English", "Bengali", "Gujarati"],
      location: "Gateway of India",
      distance: "1.5 km",
      available: false,
      specialties: ["Tech Support", "Navigation"],
      responseTime: "2 min",
      helpedCount: 189,
    },
  ]);

  const [emergencyTeams] = useState([
    {
      id: 1,
      name: "Manhattan Emergency Response",
      members: 11,
      coverage: "Delhi NCR Area",
      responseTime: "6-12 min",
      status: "active",
      specialties: ["Medical", "Rescue", "Coordination"],
    },
    {
      id: 2,
      name: "Tourist Safety Squad",
      members: 15,
      coverage: "Major Tourist Areas",
      responseTime: "4-8 min",
      status: "active",
      specialties: ["Tourist Assistance", "Language Support"],
    },
    {
      id: 3,
      name: "Night Watch Volunteers",
      members: 9,
      coverage: "24/7 Coverage",
      responseTime: "12-18 min",
      status: "standby",
      specialties: ["Night Safety", "Emergency Transport"],
    },
  ]);

  const [helpRequests] = useState([
    {
      id: 1,
      type: "Navigation Help",
      location: "Penn Station",
      urgency: "Low",
      timeAgo: "5 min ago",
      status: "Assigned",
    },
    {
      id: 2,
      type: "Medical Assistance",
      location: "Central Park",
      urgency: "High",
      timeAgo: "2 min ago",
      status: "In Progress",
    },
    {
      id: 3,
      type: "Translation",
      location: "Times Square",
      urgency: "Medium",
      timeAgo: "8 min ago",
      status: "Completed",
    },
  ]);

  const connectToVolunteer = (volunteerId: number) => {
    const volunteer = volunteers.find(v => v.id === volunteerId);
    alert(`Connecting to ${volunteer?.name}...`);
  };

  const requestEmergencyTeam = (teamId: number) => {
    const team = emergencyTeams.find(t => t.id === teamId);
    alert(`Emergency request sent to ${team?.name}!`);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "success";
      case "in progress": return "warning";
      case "assigned": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Volunteer Network</h1>
        <Button variant="emergency" size="lg">
          Request Emergency Help
        </Button>
      </div>

      {/* Quick Help Options */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button variant="hero" size="lg" className="h-20">
          <MessageCircle className="h-6 w-6 mr-2" />
          Chat Support
        </Button>
        <Button variant="success" size="lg" className="h-20">
          <Phone className="h-6 w-6 mr-2" />
          Voice Call
        </Button>
        <Button variant="outline" size="lg" className="h-20">
          <Video className="h-6 w-6 mr-2" />
          Video Help
        </Button>
        <Button variant="warning" size="lg" className="h-20">
          <Users className="h-6 w-6 mr-2" />
          Group Help
        </Button>
      </div>

      <Tabs defaultValue="volunteers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="volunteers">Available Volunteers</TabsTrigger>
          <TabsTrigger value="teams">Emergency Teams</TabsTrigger>
          <TabsTrigger value="requests">Recent Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="volunteers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {volunteers.map((volunteer) => (
              <Card key={volunteer.id} className={`transition-all ${volunteer.available ? 'border-success' : 'border-muted'}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/placeholder-volunteer-${volunteer.id}.jpg`} />
                        <AvatarFallback>{volunteer.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-semibold">{volunteer.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-warning fill-current" />
                            <span className="text-sm">{volunteer.rating}</span>
                          </div>
                          <Badge variant={volunteer.available ? "success" : "secondary"}>
                            {volunteer.available ? "Available" : "Busy"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{volunteer.distance}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Location:</span>
                      <span className="text-muted-foreground">{volunteer.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Response time:</span>
                      <span className="text-muted-foreground">{volunteer.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="h-4 w-4 text-destructive" />
                      <span className="text-muted-foreground">Helped {volunteer.helpedCount} people</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">Languages:</span>
                    <div className="flex gap-1 flex-wrap">
                      {volunteer.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">Specialties:</span>
                    <div className="flex gap-1 flex-wrap">
                      {volunteer.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {volunteer.available && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => connectToVolunteer(volunteer.id)}
                        className="flex-1"
                      >
                        Connect
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyTeams.map((team) => (
              <Card key={team.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {team.name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge variant={team.status === "active" ? "success" : "secondary"}>
                      {team.status}
                    </Badge>
                    <Badge variant="outline">{team.members} members</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Coverage:</span>
                      <span className="text-muted-foreground">{team.coverage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Response time:</span>
                      <span className="text-muted-foreground">{team.responseTime}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">Specialties:</span>
                    <div className="flex gap-1 flex-wrap">
                      {team.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => requestEmergencyTeam(team.id)}
                    disabled={team.status !== "active"}
                    className="w-full"
                    variant={team.status === "active" ? "emergency" : "secondary"}
                  >
                    Request Team
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <div className="space-y-4">
            {helpRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{request.type}</h3>
                        <Badge variant={getUrgencyColor(request.urgency)}>
                          {request.urgency} Priority
                        </Badge>
                        <Badge variant={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{request.location}</span>
                        <span>•</span>
                        <span>{request.timeAgo}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}