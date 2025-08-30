import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Settings" />
      <main className="flex-1 p-6">
        <Tabs defaultValue="integrations" className="w-full">
          <TabsList>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="voice">Voice</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="integrations">
            <Card className="mt-4 border-border/60">
              <CardHeader>
                <CardTitle>Application Integrations</CardTitle>
                <CardDescription>Connect to third-party services. Paste connector URLs here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="gmail">Gmail Connector URL</Label>
                    <Input id="gmail" placeholder="https://..." />
                  </div>
                   <div>
                    <Label htmlFor="gcal">Google Calendar Connector URL</Label>
                    <Input id="gcal" placeholder="https://..." />
                  </div>
                   <div>
                    <Label htmlFor="qbo">QuickBooks Online Connector URL</Label>
                    <Input id="qbo" placeholder="https://..." />
                  </div>
                  <Button className="bg-accent/90 hover:bg-accent text-accent-foreground">Save Integrations</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="voice">
             <Card className="mt-4 border-border/60">
                <CardHeader>
                    <CardTitle>Voice Settings</CardTitle>
                    <CardDescription>Configure Text-to-Speech (TTS) settings for Rebecca.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>TTS Voice</Label>
                        <Select defaultValue="en-GB-Neural2-F">
                            <SelectTrigger>
                                <SelectValue placeholder="Select a voice" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en-GB-Neural2-F">British Female (Neural2)</SelectItem>
                                <SelectItem value="en-GB-Neural2-C">British Male (Neural2)</SelectItem>
                                <SelectItem value="en-GB-Wavenet-C">British Male (WaveNet)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="bg-accent/90 hover:bg-accent text-accent-foreground">Save Voice Settings</Button>
                </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
