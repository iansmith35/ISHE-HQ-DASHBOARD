import { Header } from '@/components/layout/Header';
import { ChatPanel } from '@/components/rebecca/ChatPanel';
import { DirectiveBox } from '@/components/rebecca/DirectiveBox';

export default function RebeccaPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Rebecca AI" />
      <main className="flex-1 overflow-hidden grid md:grid-cols-3 gap-6 p-6">
        <div className="md:col-span-2 flex flex-col h-full">
           <ChatPanel />
        </div>
        <div className="md:col-span-1 flex flex-col h-full">
          <DirectiveBox />
        </div>
      </main>
    </div>
  );
}
