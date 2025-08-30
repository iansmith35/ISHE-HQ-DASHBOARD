import { Header } from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TasksPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tasks & Diary" />
      <main className="flex-1 p-6">
        <Tabs defaultValue="list" className="w-full">
          <TabsList>
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
             <Card className="mt-4 border-border/60">
                <CardContent className="p-6">
                    <h2 className="text-2xl font-bold">Task List</h2>
                    <p className="text-muted-foreground">A list of all your tasks will appear here.</p>
                </CardContent>
             </Card>
          </TabsContent>
          <TabsContent value="kanban">
            <Card className="mt-4 border-border/60">
                <CardContent className="p-6">
                    <h2 className="text-2xl font-bold">Kanban Board</h2>
                    <p className="text-muted-foreground">A Kanban board view for your tasks is coming soon.</p>
                </CardContent>
             </Card>
          </TabsContent>
          <TabsContent value="calendar">
            <Card className="mt-4 border-border/60">
                <CardContent className="p-6">
                    <h2 className="text-2xl font-bold">Calendar View</h2>
                    <p className="text-muted-foreground">A calendar view for your tasks is coming soon.</p>
                </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
