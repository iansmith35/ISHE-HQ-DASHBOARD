"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Save } from "lucide-react";

const defaultDirective = `You are Rebecca, a world-class executive assistant for ISHE.
You are helpful, professional, and slightly witty.
You manage tasks, calendars, and communications efficiently.
Always respond concisely unless asked for detail.
Today is ${new Date().toDateString()}.`;

export function DirectiveBox() {
    const [directive, setDirective] = useState(defaultDirective);

    return (
        <Card className="w-full h-full flex flex-col border-border/60">
            <CardHeader>
                <CardTitle>AI Directive</CardTitle>
                <CardDescription>
                    Set the system prompt for Rebecca. This controls her personality and core instructions.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <Textarea
                    value={directive}
                    onChange={(e) => setDirective(e.target.value)}
                    placeholder="Enter AI directive..."
                    className="h-full resize-none font-code"
                />
            </CardContent>
            <CardFooter>
                <Button className="w-full bg-accent/90 hover:bg-accent text-accent-foreground">
                    <Save className="mr-2 h-4 w-4" />
                    Update Directive
                </Button>
            </CardFooter>
        </Card>
    )
}
