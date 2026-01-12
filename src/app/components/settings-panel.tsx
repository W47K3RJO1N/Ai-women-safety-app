import { useState } from "react";
import { 
  Shield, 
  Bell, 
  Users, 
  Lock, 
  Database, 
  Info,
  ChevronRight,
  Trash2,
  Plus,
  UserCircle
} from "lucide-react";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function SettingsPanel() {
  const [locationSharing, setLocationSharing] = useState(false);
  const [dataCollection, setDataCollection] = useState(true);
  const [notifications, setNotifications] = useState({
    safetyAlerts: true,
    routeUpdates: true,
    emergencyContacts: true,
    lowBattery: true,
  });
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: "Mom", phone: "+1 (555) 123-4567" },
    { id: 2, name: "Best Friend", phone: "+1 (555) 987-6543" },
  ]);

  const handleAddContact = () => {
    const newContact = {
      id: Date.now(),
      name: "New Contact",
      phone: "+1 (555) 000-0000",
    };
    setEmergencyContacts([...emergencyContacts, newContact]);
  };

  const handleRemoveContact = (id: number) => {
    setEmergencyContacts(emergencyContacts.filter(c => c.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Privacy Notice */}
      <Alert className="border-purple-200 bg-purple-50">
        <Shield className="size-4 text-purple-600" />
        <AlertDescription className="text-purple-900">
          Your privacy and safety are our top priorities. All data is encrypted and 
          you have full control over what information is collected and shared. 
          Location data is only used for navigation and safety features.
        </AlertDescription>
      </Alert>

      {/* Profile Section */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="size-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <UserCircle className="size-8 text-white" />
          </div>
          <div className="flex-1">
            <h3>User Profile</h3>
            <p className="text-sm text-gray-500">safepath_user@example.com</p>
          </div>
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Privacy & Security */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="size-5 text-purple-600" />
          <h3>Privacy & Security</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Real-time Location Sharing</Label>
              <p className="text-sm text-gray-500">
                Share your location with emergency contacts during navigation
              </p>
            </div>
            <Switch
              checked={locationSharing}
              onCheckedChange={setLocationSharing}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Anonymous Safety Data Collection</Label>
              <p className="text-sm text-gray-500">
                Help improve safety scores by sharing anonymized route data
              </p>
            </div>
            <Switch
              checked={dataCollection}
              onCheckedChange={setDataCollection}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Data Retention</Label>
            <p className="text-sm text-gray-500 mb-2">
              Your navigation history is automatically deleted after 30 days
            </p>
            <Button variant="outline" size="sm">
              <Trash2 className="size-4 mr-2" />
              Clear History Now
            </Button>
          </div>
        </div>
      </Card>

      {/* Emergency Contacts */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="size-5 text-purple-600" />
          <h3>Emergency Contacts</h3>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          These contacts will be notified if you use the emergency button or if unusual 
          activity is detected during navigation.
        </p>

        <div className="space-y-3 mb-4">
          {emergencyContacts.map((contact) => (
            <div key={contact.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="font-medium">{contact.name}</div>
                <div className="text-sm text-gray-500">{contact.phone}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveContact(contact.id)}
              >
                <Trash2 className="size-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>

        <Button variant="outline" onClick={handleAddContact} className="w-full">
          <Plus className="size-4 mr-2" />
          Add Emergency Contact
        </Button>
      </Card>

      {/* Notification Preferences */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="size-5 text-purple-600" />
          <h3>Notifications</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Safety Alerts</Label>
            <Switch
              checked={notifications.safetyAlerts}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, safetyAlerts: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <Label>Route Updates</Label>
            <Switch
              checked={notifications.routeUpdates}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, routeUpdates: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <Label>Emergency Contact Alerts</Label>
            <Switch
              checked={notifications.emergencyContacts}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, emergencyContacts: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <Label>Low Battery Warnings</Label>
            <Switch
              checked={notifications.lowBattery}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, lowBattery: checked })
              }
            />
          </div>
        </div>
      </Card>

      {/* Data Management */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Database className="size-5 text-purple-600" />
          <h3>Data Management</h3>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="what-data">
            <AccordionTrigger>What data do we collect?</AccordionTrigger>
            <AccordionContent className="text-sm text-gray-600">
              We collect location data during active navigation, safety preferences, 
              and anonymized route usage statistics. All data is encrypted and stored 
              securely. Personal information is never shared with third parties without 
              your explicit consent.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="how-used">
            <AccordionTrigger>How is my data used?</AccordionTrigger>
            <AccordionContent className="text-sm text-gray-600">
              Your data is used exclusively to provide navigation services, improve 
              safety scoring algorithms, and send you relevant safety alerts. Location 
              data is only accessed during active navigation sessions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-rights">
            <AccordionTrigger>Your data rights</AccordionTrigger>
            <AccordionContent className="text-sm text-gray-600">
              You have the right to access, modify, or delete your data at any time. 
              You can export your data or request complete account deletion from the 
              profile settings.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-4 pt-4 border-t space-y-2">
          <Button variant="outline" className="w-full justify-between">
            Export My Data
            <ChevronRight className="size-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between text-red-600 hover:text-red-700">
            Delete My Account
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </Card>

      {/* About & Help */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="size-5 text-purple-600" />
          <h3>About & Help</h3>
        </div>

        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-between">
            Help Center
            <ChevronRight className="size-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            Privacy Policy
            <ChevronRight className="size-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            Terms of Service
            <ChevronRight className="size-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            Contact Support
            <ChevronRight className="size-4" />
          </Button>
        </div>

        <div className="mt-6 pt-6 border-t text-center text-sm text-gray-500">
          SafePath v1.0.0
          <br />
          AI-Powered Safety Navigation
        </div>
      </Card>
    </div>
  );
}
