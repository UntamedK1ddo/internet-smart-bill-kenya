
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import PaymentStatistics from "./payment/PaymentStatistics";
import PaymentFilters from "./payment/PaymentFilters";
import PaymentTable from "./payment/PaymentTable";
import AddPaymentDialog from "./payment/AddPaymentDialog";
import PaymentPromptDialog from "./payment/PaymentPromptDialog";

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

  const handleAddPayment = (payment: Payment) => {
    setPayments([...payments, payment]);
  };

  const handleSendPaymentPrompt = (payment: Payment) => {
    setPayments([...payments, payment]);
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
      <PaymentStatistics
        totalPayments={totalPayments}
        mpesaTotal={mpesaTotal}
        airtelTotal={airtelTotal}
        tkashTotal={tkashTotal}
        bankTotal={bankTotal}
        cashTotal={cashTotal}
      />

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
          <PaymentFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterMethod={filterMethod}
            setFilterMethod={setFilterMethod}
            onAddPayment={() => setIsAddDialogOpen(true)}
            onSendPrompt={() => setIsPaymentPromptOpen(true)}
          />

          <PaymentTable payments={filteredPayments} />
        </CardContent>
      </Card>

      <AddPaymentDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddPayment={handleAddPayment}
        paymentsCount={payments.length}
      />

      <PaymentPromptDialog
        isOpen={isPaymentPromptOpen}
        onClose={() => setIsPaymentPromptOpen(false)}
        onSendPrompt={handleSendPaymentPrompt}
        paymentsCount={payments.length}
      />
    </div>
  );
};

export default PaymentTracking;
