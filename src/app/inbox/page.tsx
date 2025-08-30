import { Header } from '@/components/layout/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Send } from 'lucide-react';

export default function InboxPage() {
  const conversations = [
    { name: "John Doe", type: "sms", lastMessage: "Can you confirm our appointment?", unread: 2, avatar: 'JD' },
    { name: "Support Team", type: "email", lastMessage: "Re: Your ticket #12345", unread: 0, avatar: 'ST' },
    { name: "EventSafe", type: "whatsapp", lastMessage: "Great, see you there!", unread: 1, avatar: 'ES' },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header title="Inbox" />
      <main className="flex-1 grid md:grid-cols-12 overflow-hidden">
        <div className="md:col-span-4 lg:col-span-3 border-r border-border/60 flex flex-col">
            <CardHeader>
                <CardTitle>Conversations</CardTitle>
            </CardHeader>
            <ScrollArea className="flex-1">
                <div className="p-4 space-y-2">
                    {conversations.map(convo => (
                        <div key={convo.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary cursor-pointer transition-colors">
                            <Avatar>
                                <AvatarFallback>{convo.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <p className="font-semibold truncate">{convo.name}</p>
                                <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                            </div>
                            {convo.unread > 0 && <div className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">{convo.unread}</div>}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
        <div className="md:col-span-8 lg:col-span-9 flex flex-col bg-card/50">
           <div className="p-4 border-b border-border/60">
                <h3 className="font-semibold text-lg">John Doe</h3>
                <p className="text-sm text-muted-foreground">+44 123 456 7890</p>
           </div>
           <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                    {/* Placeholder for messages */}
                    <div className="flex justify-start"><div className="bg-secondary p-3 rounded-lg max-w-lg">Can you confirm our appointment for tomorrow?</div></div>
                    <div className="flex justify-end"><div className="bg-primary/20 p-3 rounded-lg max-w-lg">Yes, confirmed for 2 PM. See you then!</div></div>
                </div>
           </ScrollArea>
           <div className="p-4 border-t border-border/60">
                <div className="relative">
                    <Textarea placeholder="Type your reply..." className="pr-28" />
                    <div className="absolute top-2 right-2 flex gap-1">
                        <Button size="sm" className="bg-accent/90 hover:bg-accent text-accent-foreground"><Send className="mr-2 h-4 w-4"/> Reply</Button>
                    </div>
                </div>
           </div>
        </div>
      </main>
    </div>
  );
}
