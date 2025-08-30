"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send, Bot } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm Rebecca. How can I assist you today?",
    },
    {
      id: 2,
      role: "user",
      content: "What are my overdue tasks?",
    },
    {
      id: 3,
      role: "assistant",
      content: "You have 5 overdue tasks. The most critical one is 'Finalize Q2 report', which was due 3 days ago.",
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), role: "user", content: input }]);
      setInput("");
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, {id: Date.now() + 1, role: 'assistant', content: 'Thinking...'}])
      }, 500);
    }
  };

  return (
    <Card className="w-full h-full flex flex-col border-border/60">
      <CardHeader>
        <h2 className="text-lg font-semibold">Conversation</h2>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                   <Avatar className="w-8 h-8 border-2 border-primary/50">
                    <AvatarFallback><Bot className="text-primary"/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-xs md:max-w-md lg:max-w-xl rounded-lg px-4 py-2",
                    message.role === "user"
                      ? "bg-primary/20 text-primary-foreground"
                      : "bg-secondary"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                 {message.role === "user" && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://picsum.photos/100/100" data-ai-hint="user avatar"/>
                    <AvatarFallback>IH</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="relative w-full">
          <Input
            placeholder="Type a message or use the mic..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="pr-20"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button variant="ghost" size="icon" aria-label="Use microphone">
              <Mic className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSend} aria-label="Send message">
              <Send className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
