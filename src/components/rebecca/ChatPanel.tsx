
"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send, Bot, Square } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { textToSpeech } from "@/ai/flows/text-to-speech";
import { useToast } from "@/hooks/use-toast";

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
  const [isRecording, setIsRecording] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Pre-create the audio element
    audioRef.current = new Audio();
  }, []);

  const playAudio = (audioDataUri: string) => {
    if (audioRef.current) {
        audioRef.current.src = audioDataUri;
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    }
  }


  const handleSend = async () => {
    if (input.trim()) {
      const userMessage: Message = { id: Date.now(), role: "user", content: input };
      setMessages(prev => [...prev, userMessage]);
      setInput("");
      
      const thinkingMessage: Message = {id: Date.now() + 1, role: 'assistant', content: 'Thinking...'};
      setMessages(prev => [...prev, thinkingMessage]);

      // Simulate AI response
      setTimeout(async () => {
        const aiResponseContent = 'This is a simulated response. The real AI logic would go here.';
        const aiResponseMessage: Message = {...thinkingMessage, content: aiResponseContent};
        setMessages(prev => prev.map(m => m.id === thinkingMessage.id ? aiResponseMessage : m));

        try {
            const { audioDataUri } = await textToSpeech({ text: aiResponseContent });
            playAudio(audioDataUri);
        } catch (error) {
            console.error("TTS Error:", error);
        }

      }, 1000);
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        variant: "destructive",
        title: "Browser not supported",
        description: "Speech recognition is not supported by your browser.",
      });
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setIsRecording(true);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      toast({
        variant: "destructive",
        title: "Speech Recognition Error",
        description: `An error occurred: ${event.error}`,
      });
      setIsRecording(false);
    };
    
    let finalTranscript = '';
    recognitionRef.current.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setInput(finalTranscript + interimTranscript);
       if (event.results[event.results.length - 1].isFinal) {
        setTimeout(() => handleSend(), 500); // Send automatically after a short delay
      }
    };

    recognitionRef.current.start();
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
                    <AvatarImage src="https://picsum.photos/100/100" data-ai-hint="young chinese lady" />
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
            <Button variant="ghost" size="icon" onClick={handleMicClick} aria-label={isRecording ? "Stop recording" : "Use microphone"}>
              {isRecording ? <Square className="h-5 w-5 text-destructive animate-pulse" /> : <Mic className="h-5 w-5 text-muted-foreground hover:text-primary" />}
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
