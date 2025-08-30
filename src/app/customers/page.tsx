import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search } from 'lucide-react';

export default function CustomersPage() {
  const customers = [
    { name: "Acme Inc.", email: "contact@acme.com", phone: "01234 567890", address: "123 Business Park" },
    { name: "John Smith", email: "john.s@email.com", phone: "07700 900123", address: "45 Home Avenue" },
    { name: "Kinky Briz", email: "info@kinky-briz.co.uk", phone: "N/A", address: "78 Event Space" },
  ];
  return (
    <div className="flex flex-col h-screen">
      <Header title="Customers" />
      <main className="flex-1 p-6">
        <Card className="border-border/60">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Customer List</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search customers..." className="pl-8" />
                    </div>
                    <Button className="bg-accent/90 hover:bg-accent text-accent-foreground">
                        <Plus className="mr-2 h-4 w-4" /> Add Customer
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Primary Address</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers.map(customer => (
                            <TableRow key={customer.email}>
                                <TableCell className="font-medium">{customer.name}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.phone}</TableCell>
                                <TableCell>{customer.address}</TableCell>
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
