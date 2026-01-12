import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";

export interface SafetyPrefs {
  prioritizeSafety: number;
  avoidDarkAreas: boolean;
  preferCrowdedAreas: boolean;
  avoidHighRiskZones: boolean;
}

interface SafetyPreferencesProps {
  preferences: SafetyPrefs;
  onPreferencesChange: (prefs: SafetyPrefs) => void;
}

export function SafetyPreferences({
  preferences,
  onPreferencesChange,
}: SafetyPreferencesProps) {
  const updatePreference = (key: keyof SafetyPrefs, value: number | boolean) => {
    onPreferencesChange({ ...preferences, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4">Safety Preferences</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Safety Priority</Label>
              <span className="text-sm text-gray-500">
                {preferences.prioritizeSafety === 0 ? 'Fastest' : 
                 preferences.prioritizeSafety === 50 ? 'Balanced' : 'Safest'}
              </span>
            </div>
            <Slider
              value={[preferences.prioritizeSafety]}
              onValueChange={(value) => updatePreference('prioritizeSafety', value[0])}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Fastest Route</span>
              <span>Safest Route</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="avoid-dark">Avoid poorly lit areas</Label>
            <Switch
              id="avoid-dark"
              checked={preferences.avoidDarkAreas}
              onCheckedChange={(checked) => updatePreference('avoidDarkAreas', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="prefer-crowded">Prefer crowded areas</Label>
            <Switch
              id="prefer-crowded"
              checked={preferences.preferCrowdedAreas}
              onCheckedChange={(checked) => updatePreference('preferCrowdedAreas', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="avoid-risk">Avoid high-risk zones</Label>
            <Switch
              id="avoid-risk"
              checked={preferences.avoidHighRiskZones}
              onCheckedChange={(checked) => updatePreference('avoidHighRiskZones', checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
