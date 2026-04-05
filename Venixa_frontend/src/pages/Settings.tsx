import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Shield, CreditCard, Globe, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <PageHeader title="Profile & Settings" description="Manage your account preferences" />

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="gap-1"><User className="w-3 h-3" /> Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1"><Bell className="w-3 h-3" /> Notifications</TabsTrigger>
          <TabsTrigger value="privacy" className="gap-1"><Shield className="w-3 h-3" /> Privacy</TabsTrigger>
          <TabsTrigger value="billing" className="gap-1"><CreditCard className="w-3 h-3" /> Billing</TabsTrigger>
          <TabsTrigger value="preferences" className="gap-1"><Globe className="w-3 h-3" /> Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="glass-card p-6 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full gradient-saffron flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <Button variant="outline" size="sm">Change Photo</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>First Name</Label><Input defaultValue="Rahul" /></div>
              <div className="space-y-2"><Label>Last Name</Label><Input defaultValue="Sharma" /></div>
              <div className="space-y-2"><Label>Email</Label><Input defaultValue="rahul@example.com" type="email" /></div>
              <div className="space-y-2"><Label>Phone</Label><Input defaultValue="+91 98765 43210" /></div>
              <div className="space-y-2"><Label>City</Label><Input defaultValue="Mumbai" /></div>
              <div className="space-y-2"><Label>Gotra</Label><Input placeholder="Enter your gotra" /></div>
            </div>
            <Button className="gradient-saffron text-primary-foreground font-body">Save Changes</Button>
            <div className="pt-4 border-t">
              <Button 
                variant="outline" 
                className="text-red-600 border-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="glass-card p-6 space-y-4">
            {[
              ["Booking Confirmations", true], ["Panchang Reminders", true], ["Festival Alerts", true],
              ["Promotional Offers", false], ["Order Updates", true], ["Live Pooja Reminders", true],
            ].map(([label, checked]) => (
              <div key={label as string} className="flex items-center justify-between">
                <span className="text-sm">{label as string}</span>
                <Switch defaultChecked={checked as boolean} />
              </div>
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between"><span className="text-sm">Profile visible to others</span><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><span className="text-sm">Share booking history with AI</span><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><span className="text-sm">Allow personalized recommendations</span><Switch defaultChecked /></div>
            <Separator />
            <Button variant="destructive" size="sm">Delete Account</Button>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card className="glass-card p-6 space-y-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm font-medium">Current Plan: <span className="text-primary font-bold">Free</span></p>
              <p className="text-xs text-muted-foreground mt-1">Upgrade to Premium for ₹299/month</p>
            </div>
            <Button className="gradient-saffron text-primary-foreground font-body">Upgrade to Premium</Button>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="glass-card p-6 space-y-4">
            <div className="space-y-2">
              <Label>Preferred Language</Label>
              <Select defaultValue="hindi"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="tamil">Tamil</SelectItem>
                  <SelectItem value="telugu">Telugu</SelectItem>
                  <SelectItem value="bengali">Bengali</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Religious Tradition</Label>
              <Select defaultValue="hindu"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="hindu">Hindu - General</SelectItem>
                  <SelectItem value="shaiv">Shaivism</SelectItem>
                  <SelectItem value="vaishnav">Vaishnavism</SelectItem>
                  <SelectItem value="shakta">Shaktism</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="gradient-saffron text-primary-foreground font-body">Save Preferences</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
