import { Header } from '@/components/layout/Header';
import { Dropzone } from '@/components/vault/Dropzone';
import { FileTable } from '@/components/vault/FileTable';
import { Card, CardContent } from '@/components/ui/card';

export default function VaultPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Vault" />
      <main className="flex-1 p-6 space-y-6">
        <Card className="border-border/60">
            <CardContent className="p-6">
                <Dropzone />
            </CardContent>
        </Card>
        <Card className="border-border/60">
            <CardContent className="p-6">
                <FileTable />
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
