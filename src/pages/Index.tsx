import { Link } from "react-router-dom";
import { Shield, MapPin, AlertTriangle, Users, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "24/7 Safety Monitoring",
      description: "Real-time location tracking and safety status updates for all registered tourists."
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-warning" />,
      title: "Emergency Response",
      description: "Instant emergency alerts with direct connection to local authorities and emergency services."
    },
    {
      icon: <MapPin className="h-8 w-8 text-success" />,
      title: "Location Services",
      description: "GPS tracking, safe zone alerts, and location sharing with emergency contacts."
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "Tourist Management",
      description: "Comprehensive dashboard for tourism authorities to monitor visitor safety."
    }
  ];

  const stats = [
    { number: "10K+", label: "Protected Tourists", icon: <Users className="h-5 w-5" /> },
    { number: "99.9%", label: "Safety Rate", icon: <CheckCircle className="h-5 w-5" /> },
    { number: "24/7", label: "Support Available", icon: <Clock className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            स्मार्ट पर्यटक सुरक्षा
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Smart Tourist Safety
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Advanced safety monitoring and emergency response system for tourists in incredible India. 
            Stay safe, stay connected, explore with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/register">Get Protected Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-primary">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Safety Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform provides everything needed to keep tourists safe and connected
            </p>
          </div>
          
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
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Stay Safe?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of tourists who trust SafeTourist for their safety and peace of mind
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link to="/register">Register Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/emergency">Emergency Center</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
