import { MapPin, Navigation } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface RouteInputProps {
  source: string;
  destination: string;
  onSourceChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onFindRoutes: () => void;
}

export function RouteInput({
  source,
  destination,
  onSourceChange,
  onDestinationChange,
  onFindRoutes,
}: RouteInputProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="source">Starting Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
          <Input
            id="source"
            value={source}
            onChange={(e) => onSourceChange(e.target.value)}
            placeholder="Enter your starting point"
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="destination">Destination</Label>
        <div className="relative">
          <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
          <Input
            id="destination"
            value={destination}
            onChange={(e) => onDestinationChange(e.target.value)}
            placeholder="Enter your destination"
            className="pl-10"
          />
        </div>
      </div>

      <Button onClick={onFindRoutes} className="w-full" disabled={!source || !destination}>
        Find Safe Routes
      </Button>
    </div>
  );
}
