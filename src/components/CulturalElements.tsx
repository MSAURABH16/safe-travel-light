import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { regionalConfig } from '@/lib/regional-config';
import { MapPin, Calendar, Palette } from 'lucide-react';

export function CulturalElements() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-cultural-green">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-cultural-green">
            <MapPin className="h-5 w-5" />
            Famous Landmarks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {regionalConfig.culturalElements.landmarks.slice(0, 4).map((landmark) => (
              <Badge key={landmark} variant="secondary" className="text-xs bg-cultural-green/10">
                {landmark}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-cultural-orange">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-cultural-orange">
            <Calendar className="h-5 w-5" />
            Local Festivals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {regionalConfig.culturalElements.festivals.slice(0, 4).map((festival) => (
              <Badge key={festival} variant="secondary" className="text-xs bg-cultural-orange/10">
                {festival}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-cultural-blue">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-cultural-blue">
            <Palette className="h-5 w-5" />
            Traditional Crafts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {regionalConfig.culturalElements.textiles.map((textile) => (
              <Badge key={textile} variant="secondary" className="text-xs bg-cultural-blue/10">
                {textile}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}