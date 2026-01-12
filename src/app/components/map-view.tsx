import { MapPin, Navigation, Shield } from "lucide-react";

interface MapViewProps {
  selectedRoute?: number;
  isTracking?: boolean;
}

export function MapView({ selectedRoute, isTracking }: MapViewProps) {
  // Mock map visualization - in a real app, this would integrate with a mapping service
  const routes = [
    { id: 1, color: 'bg-green-500', path: 'M50,450 Q250,350 450,450' },
    { id: 2, color: 'bg-blue-500', path: 'M50,450 Q250,250 450,450' },
    { id: 3, color: 'bg-purple-500', path: 'M50,450 Q250,150 450,450' },
  ];

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      {/* Mock map background */}
      <svg className="w-full h-full" viewBox="0 0 500 500">
        {/* Grid pattern to simulate map */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="500" height="500" fill="url(#grid)" />
        
        {/* Mock streets */}
        <line x1="0" y1="200" x2="500" y2="200" stroke="#d1d5db" strokeWidth="3" />
        <line x1="0" y1="350" x2="500" y2="350" stroke="#d1d5db" strokeWidth="3" />
        <line x1="150" y1="0" x2="150" y2="500" stroke="#d1d5db" strokeWidth="3" />
        <line x1="350" y1="0" x2="350" y2="500" stroke="#d1d5db" strokeWidth="3" />
        
        {/* Routes */}
        {routes.map((route) => (
          <path
            key={route.id}
            d={route.path}
            fill="none"
            stroke={selectedRoute === route.id ? '#22c55e' : '#94a3b8'}
            strokeWidth={selectedRoute === route.id ? '6' : '4'}
            strokeDasharray={selectedRoute === route.id ? '0' : '10,5'}
            opacity={selectedRoute ? (selectedRoute === route.id ? '1' : '0.3') : '0.7'}
          />
        ))}
        
        {/* Start point */}
        <circle cx="50" cy="450" r="12" fill="#3b82f6" stroke="white" strokeWidth="3" />
        
        {/* End point */}
        <circle cx="450" cy="450" r="12" fill="#ef4444" stroke="white" strokeWidth="3" />
        
        {/* Safety indicators */}
        <circle cx="250" cy="200" r="20" fill="#22c55e" opacity="0.2" />
        <circle cx="150" cy="350" r="20" fill="#eab308" opacity="0.2" />
        <circle cx="350" cy="150" r="20" fill="#22c55e" opacity="0.2" />
      </svg>
      
      {/* Map legend */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="size-4 text-blue-500" />
          <span>Start</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Navigation className="size-4 text-red-500" />
          <span>Destination</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="size-3 rounded-full bg-green-500/20 border-2 border-green-500"></div>
          <span>Safe Zone</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="size-3 rounded-full bg-yellow-500/20 border-2 border-yellow-500"></div>
          <span>Moderate Risk</span>
        </div>
      </div>
      
      {/* Tracking indicator */}
      {isTracking && (
        <div className="absolute top-4 right-4 bg-green-500 text-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-2">
          <Shield className="size-4" />
          <span className="text-sm">Active Tracking</span>
        </div>
      )}
    </div>
  );
}
