import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function JobsPage() {
  const jobs = [
    { id: "JOB-001", customer: "Acme Inc.", title: "Boiler Service", status: "Scheduled", cost: "£150" },
    { id: "JOB-002", customer: "John Smith", title: "Gas Certificate", status: "Completed", cost: "£90" },
    { id: "JOB-003", customer: "Acme Inc.", title: "Emergency Leak Repair", status: "In Progress", cost: "£350 (est.)" },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "Scheduled":
        return "secondary";
      case "In Progress":
        return "outline";
      default:
        return "destructive";
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <Header title="Jobs" />
      <main className="flex-1 p-6">
        <Card className="border-border/60">
            <CardHeader>
                <CardTitle>All Jobs</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Job ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Cost</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map(job => (
                            <TableRow key={job.id}>
                                <TableCell className="font-mono">{job.id}</TableCell>
                                <TableCell className="font-medium">{job.customer}</TableCell>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(job.status) as any}>{job.status}</Badge>
                                </TableCell>
                                <TableCell>{job.cost}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
