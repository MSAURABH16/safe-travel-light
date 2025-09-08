import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  MapPin, 
  Phone, 
  Users, 
  AlertTriangle, 
  Heart,
  Navigation,
  Clock,
  Star,
  Wifi,
  Mountain,
  TreePine,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { RegionalBanner } from "@/components/RegionalBanner";
import { CulturalElements } from "@/components/CulturalElements";

const Index = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "24/7 Safety Monitoring",
      description: "Real-time tracking across all Northeast states with weather alerts and emergency response."
    },
    {
      icon: <Mountain className="h-8 w-8 text-cultural-green" />,
      title: "Regional Expertise",
      description: "Specialized safety protocols for Northeast India's unique terrain and climate conditions."
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-warning" />,
      title: "Emergency Response",
      description: "Instant alerts to state police, disaster management, and tourism departments."
    },
    {
      icon: <TreePine className="h-8 w-8 text-cultural-blue" />,
      title: "Cultural Integration",
      description: "Local language support and cultural guidance for authentic Northeast experiences."
    }
  ];

  const stats = [
    { number: "8 States", label: "Coverage Area", icon: <MapPin className="h-5 w-5" /> },
    { number: "99.9%", label: "Safety Rate", icon: <CheckCircle className="h-5 w-5" /> },
    { number: "24/7", label: "Support Available", icon: <Clock className="h-5 w-5" /> },
  ];

  const quickServices = [
    {
      title: "Emergency Services",
      description: "Instant access to police, medical, and disaster response",
      icon: <Phone className="h-6 w-6" />,
      link: "/emergency",
      color: "border-destructive bg-destructive/5"
    },
    {
      title: "Safety Dashboard", 
      description: "Real-time monitoring and tourist tracking",
      icon: <Shield className="h-6 w-6" />,
      link: "/dashboard",
      color: "border-primary bg-primary/5"
    },
    {
      title: "Places & Weather",
      description: "Safe locations with weather updates",
      icon: <MapPin className="h-6 w-6" />,
      link: "/places",
      color: "border-cultural-green bg-cultural-green/5"
    },
    {
      title: "Connectivity Hub",
      description: "Network status and emergency communication",
      icon: <Wifi className="h-6 w-6" />,
      link: "/connectivity", 
      color: "border-cultural-blue bg-cultural-blue/5"
    },
    {
      title: "Medical Assistance",
      description: "Healthcare facilities and emergency medical",
      icon: <Heart className="h-6 w-6" />,
      link: "/medical",
      color: "border-success bg-success/5"
    },
    {
      title: "Volunteer Network",
      description: "Local volunteers and community support",
      icon: <Users className="h-6 w-6" />,
      link: "/volunteers",
      color: "border-cultural-orange bg-cultural-orange/5"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Regional Banner */}
      <div className="mb-8">
        <RegionalBanner />
      </div>

      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Mountain className="h-10 w-10 text-cultural-green" />
          <h1 className="text-4xl font-bold tracking-tight">
            Northeast India Tourist Safety
          </h1>
          <TreePine className="h-10 w-10 text-cultural-blue" />
        </div>
        <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
          Experience the Seven Sisters and Sikkim safely with real-time monitoring, 
          weather alerts, and 24/7 emergency response across all Northeast states.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <Button size="lg" className="w-full sm:w-auto bg-cultural-green hover:bg-cultural-green/90">
              Register as Tourist
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-cultural-blue text-cultural-blue hover:bg-cultural-blue/10">
              Safety Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Cultural Elements */}
      <div className="mb-12">
        <CulturalElements />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center bg-gradient-forest/5 border-cultural-green/20">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4 text-cultural-green">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-2 text-cultural-green">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Services */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Quick Access Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickServices.map((service) => (
            <Link to={service.link} key={service.title}>
              <Card className={`h-full hover:shadow-lg transition-all duration-200 hover:scale-105 ${service.color}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-current">
                      {service.icon}
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Safety Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-dawn rounded-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Explore Northeast India Safely?
        </h2>
        <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
          Join thousands of tourists who trust SafeTourist NE for safe exploration 
          across the Seven Sisters and Sikkim.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <Button className="bg-white text-cultural-green hover:bg-white/90" size="lg">
              Start Your Safe Journey
            </Button>
          </Link>
          <Link to="/emergency">
            <Button variant="outline" className="border-white text-white hover:bg-white/10" size="lg">
              Emergency Center
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;