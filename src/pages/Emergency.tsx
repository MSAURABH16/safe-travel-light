import { useState } from "react";
import { AlertTriangle, Phone, MapPin, Camera, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Emergency() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [emergencyMessage, setEmergencyMessage] = useState("");
  const { toast } = useToast();

  const handleEmergencyAlert = () => {
    setIsEmergencyActive(true);
    toast({
      title: "Emergency Alert Activated!",
      description: "Help is on the way. Stay calm and follow safety protocols.",
      variant: "destructive",
    });
  };

  const handleLocationShare = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Location Shared",
            description: "Your current location has been sent to emergency services.",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please share manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const emergencyContacts = [
    { name: "National Emergency", number: "112", description: "Police, Fire, Medical" },
    { name: "Police", number: "100", description: "Police Emergency" },
    { name: "Fire Service", number: "101", description: "Fire Emergency" },
    { name: "Ambulance", number: "108", description: "Medical Emergency" },
    { name: "Tourist Helpline", number: "1363", description: "24/7 Tourist Support" },
    { name: "Women's Helpline", number: "1091", description: "Women in Distress" },
  ];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-destructive mb-2">Emergency Center</h1>
        <p className="text-muted-foreground">
          If you're in immediate danger, use the emergency button below
        </p>
      </div>

      {/* Emergency Button */}
      <Card className="border-destructive">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-destructive flex items-center justify-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            Emergency Alert
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <Button
            variant="emergency"
            size="lg"
            className="h-32 w-32 rounded-full text-lg font-bold"
            onClick={handleEmergencyAlert}
            disabled={isEmergencyActive}
          >
            {isEmergencyActive ? "ALERT ACTIVE" : "EMERGENCY"}
          </Button>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Press this button if you need immediate assistance. This will alert emergency services and your emergency contacts.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="warning"
              className="w-full justify-start"
              onClick={handleLocationShare}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Share My Location
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Camera className="mr-2 h-4 w-4" />
              Send Photo Evidence
            </Button>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Emergency Message</label>
              <Textarea
                placeholder="Describe your emergency situation..."
                value={emergencyMessage}
                onChange={(e) => setEmergencyMessage(e.target.value)}
                rows={3}
              />
              <Button variant="secondary" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.description}</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={`tel:${contact.number}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    {contact.number}
                  </a>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Safety Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Safety Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">In Case of Emergency:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Stay calm and assess the situation</li>
                <li>• Move to a safe location if possible</li>
                <li>• Use the emergency button above</li>
                <li>• Follow instructions from authorities</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Medical Emergency:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Call local emergency services immediately</li>
                <li>• Provide your location clearly</li>
                <li>• Mention any medical conditions</li>
                <li>• Stay with the patient if safe to do so</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}