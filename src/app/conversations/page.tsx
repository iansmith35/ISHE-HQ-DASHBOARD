import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ConversationsPage() {
  const conversations = [
      {id: 1, title: 'Q2 Report Summary', project: 'ISHE', date: '2 days ago'},
      {id: 2, title: 'Kinky Briz Event Logistics', project: 'Kinky Briz', date: '5 days ago'},
      {id: 3, title: 'Weekend Plans', project: 'Personal', date: '1 day ago'},
      {id: 4, title: 'Job JOB-003 Details', project: 'Customers', date: '3 hours ago'},
  ]
  const projects = ['All', 'Personal', 'ISHE', 'EventSafe', 'Kinky Briz', 'Customers']

  return (
    <div className="flex flex-col h-screen">
      <Header title="Conversations" />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex gap-2">
            {projects.map(p => (
                <Button key={p} variant={p === 'All' ? 'default' : 'secondary'} size="sm">{p}</Button>
            ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {conversations.map(convo => (
            <Card key={convo.id} className="border-border/60 hover:border-primary/80 transition-colors cursor-pointer">
                <CardHeader>
                    <CardTitle className="flex items-start justify-between">
                        <span className="truncate pr-4">{convo.title}</span>
                        <MessageSquare className="h-5 w-5 text-muted-foreground shrink-0"/>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{convo.project}</span>
                        <span>{convo.date}</span>
                    </div>
                </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
