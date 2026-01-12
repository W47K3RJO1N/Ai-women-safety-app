import { RouteCard, RouteData } from "./route-card";
import { Button } from "./ui/button";
import { Navigation, Shield } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface RouteComparisonProps {
  routes: RouteData[];
  selectedRoute: number | undefined;
  onSelectRoute: (routeId: number) => void;
  onStartNavigation: () => void;
}

export function RouteComparison({
  routes,
  selectedRoute,
  onSelectRoute,
  onStartNavigation,
}: RouteComparisonProps) {
  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* AI Decision Info */}
      <Alert className="border-purple-200 bg-purple-50">
        <Shield className="size-4 text-purple-600" />
        <AlertDescription className="text-purple-900">
          AI analyzed {routes.length} possible routes based on your safety preferences, 
          current time, lighting conditions, crowd density, and risk zones. 
          The recommended route balances safety with travel efficiency.
        </AlertDescription>
      </Alert>

      {/* Routes Grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              isSelected={selectedRoute === route.id}
              onSelect={() => onSelectRoute(route.id)}
            />
          ))}
        </div>
      </div>

      {/* Start Navigation Button */}
      {selectedRoute && (
        <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0">
          <Button 
            onClick={onStartNavigation} 
            className="w-full md:w-auto md:min-w-[200px]"
            size="lg"
          >
            <Navigation className="size-4 mr-2" />
            Start Navigation
          </Button>
        </div>
      )}
    </div>
  );
}
