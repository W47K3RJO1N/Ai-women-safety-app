import { Clock, TrendingUp, Sun, Users, ShieldAlert, Navigation2 } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

export interface RouteData {
  id: number;
  name: string;
  distance: string;
  duration: string;
  safetyScore: number;
  factors: {
    lighting: number;
    crowdDensity: number;
    riskZones: number;
    timeOfDay: number;
  };
  recommendation: 'best' | 'balanced' | 'fastest';
}

interface RouteCardProps {
  route: RouteData;
  isSelected: boolean;
  onSelect: () => void;
}

export function RouteCard({ route, isSelected, onSelect }: RouteCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'High Safety';
    if (score >= 60) return 'Moderate Safety';
    return 'Lower Safety';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card 
      className={`p-6 cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-purple-500 shadow-lg' : 'hover:shadow-md'
      }`}
      onClick={onSelect}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3>{route.name}</h3>
              {route.recommendation === 'best' && (
                <Badge className="bg-green-500">Recommended</Badge>
              )}
              {route.recommendation === 'fastest' && (
                <Badge className="bg-blue-500">Fastest</Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Navigation2 className="size-3" />
                {route.distance}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {route.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Safety Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Overall Safety Score</span>
            <span className={`font-semibold ${getScoreColor(route.safetyScore)}`}>
              {route.safetyScore}/100
            </span>
          </div>
          <div className="relative">
            <Progress value={route.safetyScore} className="h-2" />
            <div 
              className={`absolute top-0 left-0 h-2 rounded-full transition-all ${getProgressColor(route.safetyScore)}`}
              style={{ width: `${route.safetyScore}%` }}
            />
          </div>
          <span className={`text-xs ${getScoreColor(route.safetyScore)}`}>
            {getScoreLabel(route.safetyScore)}
          </span>
        </div>

        {/* Factor Breakdown */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t">
          <div className="flex items-center gap-2">
            <Sun className="size-4 text-yellow-500" />
            <div className="flex-1">
              <div className="text-xs text-gray-500">Lighting</div>
              <div className="text-sm">{route.factors.lighting}%</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="size-4 text-blue-500" />
            <div className="flex-1">
              <div className="text-xs text-gray-500">Crowd Density</div>
              <div className="text-sm">{route.factors.crowdDensity}%</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ShieldAlert className="size-4 text-purple-500" />
            <div className="flex-1">
              <div className="text-xs text-gray-500">Risk Assessment</div>
              <div className="text-sm">{route.factors.riskZones}%</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-green-500" />
            <div className="flex-1">
              <div className="text-xs text-gray-500">Time Safety</div>
              <div className="text-sm">{route.factors.timeOfDay}%</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full" 
          variant={isSelected ? "default" : "outline"}
        >
          {isSelected ? "Selected" : "Select This Route"}
        </Button>
      </div>
    </Card>
  );
}
