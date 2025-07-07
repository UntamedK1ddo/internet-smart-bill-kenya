
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Send, Download, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Invoice {
  id: string;
  customerId: number;
  customerName: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  billingPeriod: string;
  package: string;
  generated: string;
}

const BillingInvoicing = () => {
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState("2024-01");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock invoice data
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      customerId: 1,
      customerName: "John Kamau",
      amount: 2500,
      dueDate: "2024-01-31",
      status: "paid",
      billingPeriod: "January 2024",
      package: "10Mbps Premium",
      generated: "2024-01-01"
    },
    {
      id: "INV-002",
      customerId: 2,
      customerName: "Mary Wanjiku",
      amount: 1500,
      dueDate: "2024-01-31",
      status: "pending",
      billingPeriod: "January 2024",
      package: "5Mbps Basic",
      generated: "2024-01-01"
    },
    {
      id: "INV-003",
      customerId: 3,
      customerName: "Peter Otieno",
      amount: 4000,
      dueDate: "2024-01-31",
      status: "overdue",
      billingPeriod: "January 2024",
      package: "20Mbps Business",
      generated: "2024-01-01"
    }
  ]);

  const generateMonthlyBills = () => {
    // Mock bill generation
    const newInvoices = [
      {
        id: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
        customerId: 4,
        customerName: "Jane Mwangi",
        amount: 3000,
        dueDate: "2024-02-28",
        status: "pending" as const,
        billingPeriod: "February 2024",
        package: "15Mbps Home Plus",
        generated: new Date().toISOString().split('T')[0]
      }
    ];

    setInvoices([...invoices, ...newInvoices]);
    
    toast({
      title: "Bills Generated",
      description: `${newInvoices.length} new bills have been generated successfully.`,
    });
  };

  const sendReminder = (invoiceId: string) => {
    toast({
      title: "Reminder Sent",
      description: `Payment reminder has been sent via SMS and email.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Paid</Badge>;
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" />Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (filterStatus === "all") return true;
    return invoice.status === filterStatus;
  });

  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = filteredInvoices.filter(inv => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = filteredInvoices.filter(inv => inv.status === "pending").reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = filteredInvoices.filter(inv => inv.status === "overdue").reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      {/* Billing Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-700">KSh {totalAmount.toLocaleString()}</h3>
              <p className="text-sm text-blue-600">Total Billed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-700">KSh {paidAmount.toLocaleString()}</h3>
              <p className="text-sm text-green-600">Collected</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-orange-700">KSh {pendingAmount.toLocaleString()}</h3>
              <p className="text-sm text-orange-600">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-red-700">KSh {overdueAmount.toLocaleString()}</h3>
              <p className="text-sm text-red-600">Overdue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <span>Billing & Invoicing</span>
          </CardTitle>
          <CardDescription>
            Generate monthly bills, manage invoices, and track billing status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="billingMonth">Billing Month</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="billingMonth"
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Invoices</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={generateMonthlyBills}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate Bills
            </Button>
          </div>

          {/* Invoices Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{invoice.customerName}</p>
                        <p className="text-sm text-gray-500">{invoice.billingPeriod}</p>
                      </div>
                    </TableCell>
                    <TableCell>{invoice.package}</TableCell>
                    <TableCell className="font-medium">
                      KSh {invoice.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                        {invoice.status !== "paid" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => sendReminder(invoice.id)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No invoices found for the selected criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingInvoicing;
