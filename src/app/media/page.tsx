
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image as ImageIcon, Video, Wand2 } from 'lucide-react';
import Image from 'next/image';

export default function MediaPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Media Generation" />
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <Card className="border-border/60">
            <CardHeader>
                <CardTitle>AI Image & Video Studio</CardTitle>
                <CardDescription>Create stunning visuals with the power of AI. Describe what you want to see.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative">
                    <Wand2 className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="e.g., A cinematic shot of a majestic dragon soaring over a mystical forest at dawn." className="pl-8" />
                </div>
                <div className="flex gap-2">
                    <Button className="bg-accent/90 hover:bg-accent text-accent-foreground">
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Generate Image
                    </Button>
                     <Button variant="secondary">
                        <Video className="mr-2 h-4 w-4" />
                        Generate Video
                    </Button>
                </div>
            </CardContent>
        </Card>

        <Card className="border-border/60">
            <CardHeader>
                <CardTitle>Generated Media</CardTitle>
                 <CardDescription>Your generated images and videos will appear here.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {/* Placeholder for generated media */}
                    <div className="relative aspect-video bg-secondary rounded-lg overflow-hidden group">
                        <Image src="https://picsum.photos/1280/720" data-ai-hint="futuristic city" layout="fill" objectFit="cover" alt="Generated media placeholder" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-center p-2 text-sm">A futuristic city with flying cars and neon signs.</p>
                        </div>
                    </div>
                     <div className="relative aspect-video bg-secondary rounded-lg overflow-hidden group">
                        <Image src="https://picsum.photos/1280/720" data-ai-hint="serene forest" layout="fill" objectFit="cover" alt="Generated media placeholder" />
                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-center p-2 text-sm">A serene forest with sunlight filtering through the trees.</p>
                        </div>
                    </div>
                </div>
                 <div className="text-center text-muted-foreground mt-8">
                    <p>Start by typing a prompt and clicking generate!</p>
                </div>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
