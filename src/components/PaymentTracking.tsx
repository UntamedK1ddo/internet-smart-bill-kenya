
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard, Plus, Search, Smartphone, Building2, Banknote, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Payment {
  id: string;
  customerName: string;
  amount: number;
  method: "mpesa" | "airtel" | "tkash" | "bank" | "cash";
  reference: string;
  date: string;
  invoiceId: string;
  status: "completed" | "pending" | "failed";
}

const PaymentTracking = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMethod, setFilterMethod] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isPaymentPromptOpen, setIsPaymentPromptOpen] = useState(false);

  // Mock payment data
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "PAY-001",
      customerName: "John Kamau",
      amount: 2500,
      method: "mpesa",
      reference: "QA12B3C4D5",
      date: "2024-01-15",
      invoiceId: "INV-001",
      status: "completed"
    },
    {
      id: "PAY-002",
      customerName: "Mary Wanjiku",
      amount: 1500,
      method: "bank",
      reference: "BNK789456123",
      date: "2024-01-18",
      invoiceId: "INV-002",
      status: "completed"
    },
    {
      id: "PAY-003",
      customerName: "Peter Otieno",
      amount: 4000,
      method: "cash",
      reference: "CASH-001",
      date: "2024-01-20",
      invoiceId: "INV-003",
      status: "completed"
    }
  ]);

  const [newPayment, setNewPayment] = useState({
    customerName: "",
    amount: "",
    method: "mpesa" as "mpesa" | "airtel" | "tkash" | "bank" | "cash",
    reference: "",
    invoiceId: ""
  });

  const [paymentPrompt, setPaymentPrompt] = useState({
    customerName: "",
    phoneNumber: "",
    amount: "",
    method: "mpesa" as "mpesa" | "airtel" | "tkash",
    invoiceId: ""
  });

  const handleAddPayment = () => {
    if (!newPayment.customerName || !newPayment.amount || !newPayment.reference) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const payment: Payment = {
      id: `PAY-${String(payments.length + 1).padStart(3, '0')}`,
      customerName: newPayment.customerName,
      amount: parseInt(newPayment.amount),
      method: newPayment.method,
      reference: newPayment.reference,
      date: new Date().toISOString().split('T')[0],
      invoiceId: newPayment.invoiceId || `INV-${String(payments.length + 1).padStart(3, '0')}`,
      status: "completed"
    };

    setPayments([...payments, payment]);
    setNewPayment({
      customerName: "",
      amount: "",
      method: "mpesa",
      reference: "",
      invoiceId: ""
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Payment Recorded",
      description: `Payment of KSh ${payment.amount.toLocaleString()} has been successfully recorded.`,
    });
  };

  const handleSendPaymentPrompt = () => {
    if (!paymentPrompt.customerName || !paymentPrompt.phoneNumber || !paymentPrompt.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // In a real implementation, this would integrate with mobile money APIs
    const payment: Payment = {
      id: `PAY-${String(payments.length + 1).padStart(3, '0')}`,
      customerName: paymentPrompt.customerName,
      amount: parseInt(paymentPrompt.amount),
      method: paymentPrompt.method,
      reference: `${paymentPrompt.method.toUpperCase()}-PENDING-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      invoiceId: paymentPrompt.invoiceId || `INV-${String(payments.length + 1).padStart(3, '0')}`,
      status: "pending"
    };

    setPayments([...payments, payment]);
    setPaymentPrompt({
      customerName: "",
      phoneNumber: "",
      amount: "",
      method: "mpesa",
      invoiceId: ""
    });
    setIsPaymentPromptOpen(false);

    toast({
      title: "Payment Request Sent",
      description: `Payment prompt sent to ${paymentPrompt.phoneNumber} via ${paymentPrompt.method.toUpperCase()}.`,
    });
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "mpesa":
        return <Smartphone className="w-4 h-4" />;
      case "airtel":
        return <Smartphone className="w-4 h-4" />;
      case "tkash":
        return <Smartphone className="w-4 h-4" />;
      case "bank":
        return <Building2 className="w-4 h-4" />;
      case "cash":
        return <Banknote className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const getMethodBadge = (method: string) => {
    switch (method) {
      case "mpesa":
        return <Badge className="bg-green-100 text-green-800">{getMethodIcon(method)} M-PESA</Badge>;
      case "airtel":
        return <Badge className="bg-red-100 text-red-800">{getMethodIcon(method)} Airtel Money</Badge>;
      case "tkash":
        return <Badge className="bg-blue-100 text-blue-800">{getMethodIcon(method)} T-Kash</Badge>;
      case "bank":
        return <Badge className="bg-purple-100 text-purple-800">{getMethodIcon(method)} Bank Transfer</Badge>;
      case "cash":
        return <Badge className="bg-gray-100 text-gray-800">{getMethodIcon(method)} Cash</Badge>;
      default:
        return <Badge variant="outline">{method}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMethod = filterMethod === "all" || payment.method === filterMethod;
    
    return matchesSearch && matchesMethod;
  });

  const totalPayments = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const mpesaTotal = payments.filter(p => p.method === "mpesa").reduce((sum, p) => sum + p.amount, 0);
  const airtelTotal = payments.filter(p => p.method === "airtel").reduce((sum, p) => sum + p.amount, 0);
  const tkashTotal = payments.filter(p => p.method === "tkash").reduce((sum, p) => sum + p.amount, 0);
  const bankTotal = payments.filter(p => p.method === "bank").reduce((sum, p) => sum + p.amount, 0);
  const cashTotal = payments.filter(p => p.method === "cash").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-green-700">KSh {totalPayments.toLocaleString()}</h3>
              <p className="text-xs text-green-600">Total Collected</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-green-700">KSh {mpesaTotal.toLocaleString()}</h3>
              <p className="text-xs text-green-600">M-PESA</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-red-700">KSh {airtelTotal.toLocaleString()}</h3>
              <p className="text-xs text-red-600">Airtel Money</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-blue-700">KSh {tkashTotal.toLocaleString()}</h3>
              <p className="text-xs text-blue-600">T-Kash</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-purple-700">KSh {bankTotal.toLocaleString()}</h3>
              <p className="text-xs text-purple-600">Bank Transfers</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-700">KSh {cashTotal.toLocaleString()}</h3>
              <p className="text-xs text-gray-600">Cash Payments</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-green-600" />
            <span>Payment Tracking</span>
          </CardTitle>
          <CardDescription>
            Record payments and send mobile money payment prompts to customers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by customer name or reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterMethod} onValueChange={setFilterMethod}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="mpesa">M-PESA</SelectItem>
                <SelectItem value="airtel">Airtel Money</SelectItem>
                <SelectItem value="tkash">T-Kash</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Payment Prompt Dialog */}
            <Dialog open={isPaymentPromptOpen} onOpenChange={setIsPaymentPromptOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Send className="w-4 h-4 mr-2" />
                  Send Payment Prompt
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Send Payment Prompt</DialogTitle>
                  <DialogDescription>
                    Send a mobile money payment request to customer's phone.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="promptCustomerName">Customer Name *</Label>
                    <Input
                      id="promptCustomerName"
                      value={paymentPrompt.customerName}
                      onChange={(e) => setPaymentPrompt({...paymentPrompt, customerName: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      value={paymentPrompt.phoneNumber}
                      onChange={(e) => setPaymentPrompt({...paymentPrompt, phoneNumber: e.target.value})}
                      placeholder="254712345678"
                    />
                  </div>
                  <div>
                    <Label htmlFor="promptAmount">Amount (KSh) *</Label>
                    <Input
                      id="promptAmount"
                      type="number"
                      value={paymentPrompt.amount}
                      onChange={(e) => setPaymentPrompt({...paymentPrompt, amount: e.target.value})}
                      placeholder="2500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="promptMethod">Mobile Money Service</Label>
                    <Select 
                      value={paymentPrompt.method} 
                      onValueChange={(value: "mpesa" | "airtel" | "tkash") => setPaymentPrompt({...paymentPrompt, method: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mpesa">M-PESA</SelectItem>
                        <SelectItem value="airtel">Airtel Money</SelectItem>
                        <SelectItem value="tkash">T-Kash</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="promptInvoiceId">Invoice ID (Optional)</Label>
                    <Input
                      id="promptInvoiceId"
                      value={paymentPrompt.invoiceId}
                      onChange={(e) => setPaymentPrompt({...paymentPrompt, invoiceId: e.target.value})}
                      placeholder="INV-001"
                    />
                  </div>
                  <Button onClick={handleSendPaymentPrompt} className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4 mr-2" />
                    Send Payment Prompt
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Record Payment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Record New Payment</DialogTitle>
                  <DialogDescription>
                    Enter payment details to update customer balance.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customerName">Customer Name *</Label>
                    <Input
                      id="customerName"
                      value={newPayment.customerName}
                      onChange={(e) => setNewPayment({...newPayment, customerName: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount (KSh) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newPayment.amount}
                      onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                      placeholder="2500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="method">Payment Method</Label>
                    <Select 
                      value={newPayment.method} 
                      onValueChange={(value: "mpesa" | "airtel" | "tkash" | "bank" | "cash") => setNewPayment({...newPayment, method: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mpesa">M-PESA</SelectItem>
                        <SelectItem value="airtel">Airtel Money</SelectItem>
                        <SelectItem value="tkash">T-Kash</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="reference">Reference Number *</Label>
                    <Input
                      id="reference"
                      value={newPayment.reference}
                      onChange={(e) => setNewPayment({...newPayment, reference: e.target.value})}
                      placeholder="Transaction code or receipt number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="invoiceId">Invoice ID (Optional)</Label>
                    <Input
                      id="invoiceId"
                      value={newPayment.invoiceId}
                      onChange={(e) => setNewPayment({...newPayment, invoiceId: e.target.value})}
                      placeholder="INV-001"
                    />
                  </div>
                  <Button onClick={handleAddPayment} className="w-full bg-green-600 hover:bg-green-700">
                    Record Payment
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Payments Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{payment.customerName}</p>
                        <p className="text-sm text-gray-500">Invoice: {payment.invoiceId}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      KSh {payment.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{getMethodBadge(payment.method)}</TableCell>
                    <TableCell className="font-mono text-sm">{payment.reference}</TableCell>
                    <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No payments found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentTracking;
