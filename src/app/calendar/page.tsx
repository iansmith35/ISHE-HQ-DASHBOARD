import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

export default function CalendarPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Calendar" />
      <main className="flex-1 p-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
            <Card className="h-full border-border/60">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Agenda</CardTitle>
                    <Button className="bg-accent/90 hover:bg-accent text-accent-foreground">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Event
                    </Button>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Your calendar agenda will be displayed here.</p>
                    <div className="mt-4 space-y-4">
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary">
                            <CalendarIcon className="h-5 w-5 mt-1 text-primary"/>
                            <div>
                                <p className="font-semibold">Team Sync</p>
                                <p className="text-sm text-muted-foreground">10:00 AM - 11:00 AM</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary">
                            <CalendarIcon className="h-5 w-5 mt-1 text-primary"/>
                            <div>
                                <p className="font-semibold">Client Meeting: ACME Corp</p>
                                <p className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-1">
            <Card className="border-border/60">
                <CardContent className="p-2 flex justify-center">
                    <Calendar
                        mode="single"
                        selected={new Date()}
                        className="rounded-md"
                    />
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
