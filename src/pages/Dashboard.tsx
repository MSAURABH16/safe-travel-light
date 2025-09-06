import { useState } from "react";
import { MapPin, Users, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [tourists] = useState([
    { id: 1, name: "John Doe", status: "safe", location: "Times Square, NYC", lastUpdate: "2 min ago" },
    { id: 2, name: "Jane Smith", status: "warning", location: "Central Park, NYC", lastUpdate: "5 min ago" },
    { id: 3, name: "Mike Johnson", status: "safe", location: "Brooklyn Bridge, NYC", lastUpdate: "1 min ago" },
  ]);

  const [alerts] = useState([
    { id: 1, type: "warning", message: "Heavy traffic reported in Times Square area", time: "5 min ago" },
    { id: 2, type: "info", message: "Weather update: Light rain expected", time: "15 min ago" },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "safe":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "bg-success text-success-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Safety Dashboard</h1>
        <Button variant="hero">View All Tourists</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tourists</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+20.1% from last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safe Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,180</div>
            <p className="text-xs text-muted-foreground">95.6% safety rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 resolved today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tourist Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Recent Tourist Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tourists.map((tourist) => (
              <div key={tourist.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(tourist.status)}
                  <div>
                    <p className="font-medium">{tourist.name}</p>
                    <p className="text-sm text-muted-foreground">{tourist.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(tourist.status)}>
                    {tourist.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{tourist.lastUpdate}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="border-l-4 border-warning pl-4">
                <p className="font-medium">{alert.message}</p>
                <p className="text-sm text-muted-foreground">{alert.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}