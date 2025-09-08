import { useState, useEffect } from "react";
import { Bluetooth, Wifi, Signal, Radio, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Connectivity() {
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [wifiStrength, setWifiStrength] = useState(65);
  const [cellularStrength, setCellularStrength] = useState(85);
  const [sosActive, setSosActive] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);

  const [nearbyDevices] = useState([
    { id: 1, name: "Emergency Beacon 01", type: "SOS", distance: "50m", status: "active" },
    { id: 2, name: "Ranger Station", type: "Emergency", distance: "200m", status: "active" },
    { id: 3, name: "Tourist Guide Device", type: "Guide", distance: "15m", status: "active" },
  ]);

  const [coverageAreas] = useState([
    { id: 1, name: "Central Park Area", coverage: 95, type: "Full Coverage" },
    { id: 2, name: "Mountain Trail", coverage: 45, type: "Limited Coverage" },
    { id: 3, name: "Remote Hiking Path", coverage: 15, type: "Emergency Only" },
  ]);

  useEffect(() => {
    // Simulate checking bluetooth availability
    if ('bluetooth' in navigator) {
      setBluetoothEnabled(true);
    }
  }, []);

  const activateSOS = () => {
    setSosActive(true);
    setEmergencyMode(true);
    alert("SOS Signal Activated! Emergency services have been notified.");
  };

  const deactivateSOS = () => {
    setSosActive(false);
    setEmergencyMode(false);
  };

  const getSignalColor = (strength: number) => {
    if (strength >= 70) return "text-success";
    if (strength >= 40) return "text-warning";
    return "text-destructive";
  };

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 80) return "bg-success";
    if (coverage >= 50) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Connectivity & SOS</h1>
        <Badge variant={emergencyMode ? "destructive" : "outline"}>
          {emergencyMode ? "Emergency Mode" : "Normal Mode"}
        </Badge>
      </div>

      {/* SOS Emergency Section */}
      <Card className={`border-2 ${sosActive ? 'border-destructive animate-pulse' : 'border-muted'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="h-5 w-5" />
            Emergency SOS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sosActive && (
            <Alert className="border-destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                SOS signal is active. Emergency services have been notified of your location.
              </AlertDescription>
            </Alert>
          )}
          <div className="flex gap-4">
            <Button
              variant="emergency"
              size="lg"
              onClick={activateSOS}
              disabled={sosActive}
              className="flex-1"
            >
              <Radio className="h-5 w-5 mr-2" />
              {sosActive ? "SOS ACTIVE" : "ACTIVATE SOS"}
            </Button>
            {sosActive && (
              <Button
                variant="outline"
                size="lg"
                onClick={deactivateSOS}
                className="flex-1"
              >
                Deactivate SOS
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Press and hold for 3 seconds to activate emergency SOS signal. Works even in low coverage areas.
          </p>
        </CardContent>
      </Card>

      {/* Connection Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">WiFi Signal</CardTitle>
            <Wifi className={`h-4 w-4 ${getSignalColor(wifiStrength)}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wifiStrength}%</div>
            <Progress value={wifiStrength} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Connected to TouristSafe-WiFi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cellular Signal</CardTitle>
            <Signal className={`h-4 w-4 ${getSignalColor(cellularStrength)}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cellularStrength}%</div>
            <Progress value={cellularStrength} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              4G LTE Network
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bluetooth</CardTitle>
            <Bluetooth className={`h-4 w-4 ${bluetoothEnabled ? 'text-success' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bluetoothEnabled ? "ON" : "OFF"}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="mt-2 w-full"
              onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
            >
              {bluetoothEnabled ? "Disable" : "Enable"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Nearby Emergency Devices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bluetooth className="h-5 w-5" />
            Nearby Emergency Devices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {nearbyDevices.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${device.status === 'active' ? 'bg-success' : 'bg-muted'}`} />
                <div>
                  <h3 className="font-medium">{device.name}</h3>
                  <p className="text-sm text-muted-foreground">{device.type} • {device.distance}</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Connect
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Coverage Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Signal className="h-5 w-5" />
            Coverage Areas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {coverageAreas.map((area) => (
            <div key={area.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{area.name}</span>
                <Badge variant="outline">{area.type}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={area.coverage} className="flex-1" />
                <span className="text-sm font-medium">{area.coverage}%</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Emergency Features */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Connectivity Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <CheckCircle className="h-5 w-5 text-success mt-0.5" />
              <div>
                <h3 className="font-medium">Satellite Backup</h3>
                <p className="text-sm text-muted-foreground">
                  SOS signals work via satellite when cellular coverage is unavailable
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <CheckCircle className="h-5 w-5 text-success mt-0.5" />
              <div>
                <h3 className="font-medium">Mesh Network</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with other tourist devices to extend emergency coverage
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <CheckCircle className="h-5 w-5 text-success mt-0.5" />
              <div>
                <h3 className="font-medium">Offline Maps</h3>
                <p className="text-sm text-muted-foreground">
                  Pre-downloaded maps work without internet connection
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <CheckCircle className="h-5 w-5 text-success mt-0.5" />
              <div>
                <h3 className="font-medium">Emergency Contacts</h3>
                <p className="text-sm text-muted-foreground">
                  Automatic notification to emergency contacts when SOS is activated
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}