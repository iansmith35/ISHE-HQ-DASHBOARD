import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Briefcase,
  Calendar,
  Clock,
  Inbox,
  ListChecks,
  Mic,
  PieChart,
  Bot,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const tiles = [
    {
      title: "Today's Jobs",
      icon: Briefcase,
      content: '3 new jobs scheduled.',
      value: '3',
      color: 'text-primary',
    },
    {
      title: 'Overdue Tasks',
      icon: ListChecks,
      content: '5 tasks are overdue.',
      value: '5',
      color: 'text-destructive',
    },
    {
      title: 'Calendar Agenda',
      icon: Calendar,
      content: 'Next meeting at 2 PM.',
      value: '',
      color: 'text-accent',
    },
    {
      title: 'Inbox Summary',
      icon: Inbox,
      content: '12 unread messages.',
      value: '12',
      color: 'text-primary',
    },
    {
      title: 'QuickBooks Balances',
      icon: PieChart,
      content: 'Balances are up to date.',
      value: '$12,345',
      color: 'text-green-400',
    },
    {
      title: 'Rebecca Status',
      icon: Bot,
      content: 'Online and ready.',
      value: 'Active',
      color: 'text-green-400',
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header title="Dashboard" />
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tiles.map((tile) => (
            <Card
              key={tile.title}
              className="border-border/60 hover:border-primary/80 transition-colors duration-300 bg-card/80 backdrop-blur-sm"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{tile.title}</CardTitle>
                <tile.icon className={`h-5 w-5 ${tile.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{tile.value}</div>
                <p className="text-xs text-muted-foreground">{tile.content}</p>
              </CardContent>
            </Card>
          ))}
          <Card className="lg:col-span-2 xl:col-span-1 border-border/60 hover:border-accent/80 transition-colors duration-300 bg-card/80 backdrop-blur-sm flex flex-col items-center justify-center p-6">
             <CardTitle className="text-lg font-medium text-center mb-4">Live Speech Mic</CardTitle>
            <Button
              size="icon"
              className="w-24 h-24 rounded-full bg-accent/20 hover:bg-accent/30 text-accent [text-shadow:0_0_10px_hsl(var(--accent))] border-2 border-accent/50 hover:border-accent"
              aria-label="Start voice command"
            >
              <Mic className="h-12 w-12" />
            </Button>
          </Card>
        </div>

        <Card className="border-border/60 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="font-medium">New job scheduled: "Gas Certificate Check"</p>
                  <p className="text-sm text-muted-foreground">Assigned to Ian</p>
                </div>
              </div>
              <div className="flex items-center">
                <Inbox className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="font-medium">New SMS from +447123456789</p>
                  <p className="text-sm text-muted-foreground">"Hi, can you give me a quote for..."</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
