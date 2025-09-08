import { Card } from '@/components/ui/card';
import { Mountain, TreePine, Waves } from 'lucide-react';

export function RegionalBanner() {
  return (
    <Card className="overflow-hidden bg-gradient-forest text-white border-cultural-green">
      <div className="p-6 relative">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex gap-2">
            <Mountain className="h-6 w-6 text-accent" />
            <TreePine className="h-6 w-6 text-accent" />
            <Waves className="h-6 w-6 text-accent" />
          </div>
          <h2 className="text-xl font-bold">Northeast India Tourism Safety</h2>
        </div>
        <p className="text-sm opacity-90">
          Experience the beauty of the Seven Sisters and Sikkim with complete safety. 
          Real-time monitoring, weather alerts, and 24/7 support across all Northeast states.
        </p>
        <div className="absolute top-4 right-4 text-4xl opacity-20">
          🏔️
        </div>
      </div>
    </Card>
  );
}