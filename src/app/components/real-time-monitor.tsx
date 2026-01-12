import { useState, useEffect } from "react";
import { 
  Shield, 
  AlertTriangle, 
  Phone, 
  Share2, 
  Navigation, 
  MapPin,
  Clock,
  Battery,
  Signal,
  X,
  RefreshCw
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";
import { MapView } from "./map-view";

interface Alert {
  id: number;
  type: 'warning' | 'danger' | 'info';
  message: string;
  timestamp: string;
}

interface RealTimeMonitorProps {
  selectedRoute: number | undefined;
  onStopTracking: () => void;
}

export function RealTimeMonitor({ selectedRoute, onStopTracking }: RealTimeMonitorProps) {
  const [progress, setProgress] = useState(0);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [etaMinutes, setEtaMinutes] = useState(12);
  const [isSharing, setIsSharing] = useState(false);

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
      setEtaMinutes((prev) => Math.max(0, prev - 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate safety alerts
  useEffect(() => {
    const alertTimeout = setTimeout(() => {
      if (Math.random() > 0.7) {
        const newAlert: Alert = {
          id: Date.now(),
          type: 'warning',
          message: 'Approaching area with reduced lighting. Stay alert.',
          timestamp: new Date().toLocaleTimeString(),
        };
        setAlerts((prev) => [newAlert, ...prev].slice(0, 3));
      }
    }, 8000);

    return () => clearTimeout(alertTimeout);
  }, [alerts]);

  const handleEmergency = () => {
    alert("Emergency services would be contacted. This is a demo.");
  };

  const handleShareLocation = () => {
    setIsSharing(!isSharing);
  };

  const handleReroute = () => {
    alert("Calculating safer alternative route...");
  };

  const dismissAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 h-full">
      {/* Left Panel - Status & Controls */}
      <div className="md:col-span-1 space-y-4 overflow-auto">
        {/* Trip Progress */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3>Trip Progress</h3>
              <Badge className="bg-green-500">Active</Badge>
            </div>
            
            <div className="space-y-2">
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{progress.toFixed(0)}% complete</span>
                <span>ETA: {etaMinutes} min</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="size-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">Duration</div>
                  <div>{12 - Math.floor(progress / 8)} min</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="size-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">Distance</div>
                  <div>{(3.2 * (100 - progress) / 100).toFixed(1)} km</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* System Status */}
        <Card className="p-6">
          <h3 className="mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Shield className="size-4 text-green-500" />
                <span>Safety Monitoring</span>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">Active</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Signal className="size-4 text-green-500" />
                <span>GPS Signal</span>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">Strong</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Battery className="size-4 text-green-500" />
                <span>Battery</span>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">85%</Badge>
            </div>
            {isSharing && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Share2 className="size-4 text-blue-500" />
                  <span>Location Sharing</span>
                </div>
                <Badge variant="outline" className="text-blue-600 border-blue-600">Active</Badge>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button 
              variant="destructive" 
              className="w-full" 
              onClick={handleEmergency}
            >
              <Phone className="size-4 mr-2" />
              Emergency Call
            </Button>
            
            <Button 
              variant={isSharing ? "default" : "outline"}
              className="w-full"
              onClick={handleShareLocation}
            >
              <Share2 className="size-4 mr-2" />
              {isSharing ? "Stop Sharing" : "Share Location"}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleReroute}
            >
              <RefreshCw className="size-4 mr-2" />
              Find Safer Route
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onStopTracking}
            >
              <X className="size-4 mr-2" />
              End Navigation
            </Button>
          </div>
        </Card>
      </div>

      {/* Right Panel - Map & Alerts */}
      <div className="md:col-span-2 space-y-4 overflow-auto">
        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map((alert) => (
              <Alert 
                key={alert.id} 
                variant={alert.type === 'danger' ? 'destructive' : 'default'}
                className={alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' : ''}
              >
                <AlertTriangle className="size-4" />
                <AlertTitle className="flex items-center justify-between">
                  <span>Safety Alert</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissAlert(alert.id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="size-3" />
                  </Button>
                </AlertTitle>
                <AlertDescription>
                  {alert.message}
                  <div className="text-xs mt-1 opacity-70">{alert.timestamp}</div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* Map */}
        <div className="h-[500px] md:h-full min-h-[400px]">
          <MapView selectedRoute={selectedRoute} isTracking={true} />
        </div>

        {/* Safety Tips */}
        <Card className="p-6 bg-purple-50 border-purple-200">
          <div className="flex gap-3">
            <Shield className="size-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm text-purple-900 mb-1">Safety Tips</h4>
              <p className="text-sm text-purple-800">
                Stay aware of your surroundings. If you feel unsafe at any time, 
                use the emergency call button or request a safer route. Your location 
                is being monitored for your safety.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
