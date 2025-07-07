
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Building2, Banknote, CreditCard } from "lucide-react";

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

interface PaymentTableProps {
  payments: Payment[];
}

const PaymentTable = ({ payments }: PaymentTableProps) => {
  const getMethodIcon = (method: string) => {
    switch (method) {
      case "mpesa":
      case "airtel":
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

  if (payments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>No payments found matching your criteria.</p>
      </div>
    );
  }

  return (
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
          {payments.map((payment) => (
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
  );
};

export default PaymentTable;
