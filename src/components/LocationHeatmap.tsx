import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle, Shield, Eye, EyeOff } from 'lucide-react';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface HeatmapData {
  lat: number;
  lng: number;
  intensity: number;
  type: 'safe' | 'caution' | 'danger';
  label: string;
}

interface GeoFence {
  id: string;
  name: string;
  center: [number, number];
  radius: number;
  type: 'safe' | 'restricted' | 'alert';
  active: boolean;
}

const LocationHeatmap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const heatLayerRef = useRef<any>(null);
  const geoFenceLayersRef = useRef<L.LayerGroup | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showGeoFences, setShowGeoFences] = useState(true);
  const [selectedFence, setSelectedFence] = useState<string | null>(null);

  // Mock data for demonstration
  const heatmapData: HeatmapData[] = [
    { lat: 26.1445, lng: 91.7362, intensity: 0.8, type: 'safe', label: 'Tourist Hub' },
    { lat: 26.1465, lng: 91.7382, intensity: 0.6, type: 'safe', label: 'Restaurant Area' },
    { lat: 26.1425, lng: 91.7342, intensity: 0.9, type: 'caution', label: 'Crowded Market' },
    { lat: 26.1485, lng: 91.7402, intensity: 0.4, type: 'safe', label: 'Hotel District' },
    { lat: 26.1405, lng: 91.7322, intensity: 0.7, type: 'danger', label: 'Construction Zone' },
    { lat: 26.1475, lng: 91.7375, intensity: 0.5, type: 'safe', label: 'Shopping Center' },
  ];

  const geoFences: GeoFence[] = [
    {
      id: 'safe-zone-1',
      name: 'Tourist Safe Zone',
      center: [26.1445, 91.7362],
      radius: 500,
      type: 'safe',
      active: true,
    },
    {
      id: 'restricted-1',
      name: 'Construction Area',
      center: [26.1405, 91.7322],
      radius: 200,
      type: 'restricted',
      active: true,
    },
    {
      id: 'alert-zone-1',
      name: 'High Traffic Zone',
      center: [26.1425, 91.7342],
      radius: 300,
      type: 'alert',
      active: true,
    },
  ];

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    mapInstance.current = L.map(mapRef.current).setView([26.1445, 91.7362], 15);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstance.current);

    // Initialize layer groups
    geoFenceLayersRef.current = L.layerGroup().addTo(mapInstance.current);

    // Create heatmap layer
    const heatPoints = heatmapData.map(point => [point.lat, point.lng, point.intensity]);
    heatLayerRef.current = (L as any).heatLayer(heatPoints, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      gradient: {
        0.0: '#00ff00',
        0.5: '#ffff00',
        1.0: '#ff0000'
      }
    }).addTo(mapInstance.current);

    // Add markers for points of interest
    heatmapData.forEach(point => {
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="w-3 h-3 rounded-full ${
          point.type === 'safe' ? 'bg-green-500' : 
          point.type === 'caution' ? 'bg-yellow-500' : 'bg-red-500'
        } border-2 border-white shadow-lg"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });

      L.marker([point.lat, point.lng], { icon })
        .bindPopup(`<strong>${point.label}</strong><br/>Status: ${point.type}`)
        .addTo(mapInstance.current!);
    });

    // Add geo-fences
    updateGeoFences();

    return () => {
      mapInstance.current?.remove();
    };
  }, []);

  const updateGeoFences = () => {
    if (!geoFenceLayersRef.current || !mapInstance.current) return;

    geoFenceLayersRef.current.clearLayers();

    geoFences.forEach(fence => {
      if (!fence.active) return;

      const color = fence.type === 'safe' ? '#22c55e' : 
                   fence.type === 'restricted' ? '#ef4444' : '#f59e0b';

      const circle = L.circle(fence.center, {
        color: color,
        fillColor: color,
        fillOpacity: 0.2,
        radius: fence.radius,
        weight: 2,
      }).bindPopup(`
        <strong>${fence.name}</strong><br/>
        Type: ${fence.type}<br/>
        Radius: ${fence.radius}m
      `);

      circle.on('click', () => setSelectedFence(fence.id));
      geoFenceLayersRef.current!.addLayer(circle);
    });
  };

  const toggleHeatmap = () => {
    if (!mapInstance.current || !heatLayerRef.current) return;

    if (showHeatmap) {
      mapInstance.current.removeLayer(heatLayerRef.current);
    } else {
      mapInstance.current.addLayer(heatLayerRef.current);
    }
    setShowHeatmap(!showHeatmap);
  };

  const toggleGeoFences = () => {
    if (!geoFenceLayersRef.current || !mapInstance.current) return;

    if (showGeoFences) {
      mapInstance.current.removeLayer(geoFenceLayersRef.current);
    } else {
      mapInstance.current.addLayer(geoFenceLayersRef.current);
    }
    setShowGeoFences(!showGeoFences);
  };

  const getZoneStatus = (type: string) => {
    switch (type) {
      case 'safe':
        return { color: 'bg-success', label: 'Safe Zone', icon: Shield };
      case 'restricted':
        return { color: 'bg-destructive', label: 'Restricted', icon: AlertTriangle };
      case 'alert':
        return { color: 'bg-warning', label: 'Alert Zone', icon: AlertTriangle };
      default:
        return { color: 'bg-muted', label: 'Unknown', icon: MapPin };
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location Heatmap & Geo-fencing
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleHeatmap}
                className="flex items-center gap-2"
              >
                {showHeatmap ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                Heatmap
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleGeoFences}
                className="flex items-center gap-2"
              >
                {showGeoFences ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                Geo-fences
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div ref={mapRef} className="w-full h-96 rounded-lg border" />
        </CardContent>
      </Card>

      {/* Zone Status */}
      <Card>
        <CardHeader>
          <CardTitle>Active Geo-fences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {geoFences.map(fence => {
              const status = getZoneStatus(fence.type);
              const IconComponent = status.icon;
              
              return (
                <div
                  key={fence.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedFence === fence.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedFence(fence.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className="h-5 w-5" />
                    <Badge className={status.color}>
                      {status.label}
                    </Badge>
                  </div>
                  <h3 className="font-medium mb-1">{fence.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Radius: {fence.radius}m
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm">Safe Areas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Caution Areas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm">Danger Areas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary rounded-full"></div>
              <span className="text-sm">Geo-fence Zones</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationHeatmap;