import { useState } from "react";
import { Video, Phone, MapPin, Clock, Star, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Medical() {
  const [doctors] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Emergency Medicine",
      rating: 4.9,
      experience: "15 years",
      available: true,
      languages: ["English", "Spanish"],
      hospital: "City General Hospital",
      distance: "0.8 km",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Family Medicine",
      rating: 4.8,
      experience: "12 years",
      available: true,
      languages: ["English", "Mandarin"],
      hospital: "Metro Health Center",
      distance: "1.2 km",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      rating: 4.9,
      experience: "10 years",
      available: false,
      languages: ["English", "Spanish", "French"],
      hospital: "Children's Medical Center",
      distance: "2.1 km",
    },
  ]);

  const [medicalFacilities] = useState([
    {
      id: 1,
      name: "City General Hospital",
      type: "Hospital",
      services: ["Emergency", "Surgery", "ICU"],
      distance: "0.8 km",
      rating: 4.7,
      waitTime: "15 min",
    },
    {
      id: 2,
      name: "Quick Care Clinic",
      type: "Urgent Care",
      services: ["Minor Injuries", "Lab Tests"],
      distance: "0.3 km",
      rating: 4.5,
      waitTime: "5 min",
    },
    {
      id: 3,
      name: "Metro Pharmacy",
      type: "Pharmacy",
      services: ["Prescription", "OTC Medicines"],
      distance: "0.2 km",
      rating: 4.6,
      waitTime: "2 min",
    },
  ]);

  const startVideoCall = (doctorName: string) => {
    alert(`Starting video consultation with ${doctorName}...`);
  };

  const callDoctor = (doctorName: string) => {
    alert(`Calling ${doctorName}...`);
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Medical Services</h1>
        <Button variant="emergency" size="lg">
          Emergency Call 911
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="hero" size="lg" className="h-20">
          <Video className="h-6 w-6 mr-2" />
          Video Consultation
        </Button>
        <Button variant="success" size="lg" className="h-20">
          <Phone className="h-6 w-6 mr-2" />
          Call Doctor
        </Button>
        <Button variant="outline" size="lg" className="h-20">
          <MapPin className="h-6 w-6 mr-2" />
          Find Hospital
        </Button>
      </div>

      {/* Available Doctors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Available Doctors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`p-4 border rounded-lg transition-all ${
                doctor.available ? "border-success" : "border-muted"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/placeholder-doctor-${doctor.id}.jpg`} />
                    <AvatarFallback>{doctor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-semibold">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-warning fill-current" />
                        <span>{doctor.rating}</span>
                      </div>
                      <span>{doctor.experience}</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{doctor.distance}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {doctor.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{doctor.hospital}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Badge variant={doctor.available ? "success" : "secondary"}>
                    {doctor.available ? "Available" : "Busy"}
                  </Badge>
                  {doctor.available && (
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        onClick={() => startVideoCall(doctor.name)}
                        className="w-full"
                      >
                        <Video className="h-4 w-4 mr-1" />
                        Video Call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => callDoctor(doctor.name)}
                        className="w-full"
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Voice Call
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Medical Facilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Nearby Medical Facilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {medicalFacilities.map((facility) => (
              <div key={facility.id} className="p-4 border rounded-lg">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold">{facility.name}</h3>
                    <Badge variant="outline">{facility.type}</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-warning fill-current" />
                      <span>{facility.rating}</span>
                    </div>
                    <span>{facility.distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Wait time: {facility.waitTime}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium">Services:</span>
                    <div className="flex gap-1 flex-wrap">
                      {facility.services.map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Get Directions
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Information */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg bg-destructive/10">
              <h3 className="font-bold text-lg text-destructive">911</h3>
              <p className="text-sm">Emergency Services</p>
            </div>
            <div className="text-center p-4 border rounded-lg bg-primary/10">
              <h3 className="font-bold text-lg text-primary">311</h3>
              <p className="text-sm">Non-Emergency</p>
            </div>
            <div className="text-center p-4 border rounded-lg bg-success/10">
              <h3 className="font-bold text-lg text-success">1-800-222-1222</h3>
              <p className="text-sm">Poison Control</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}