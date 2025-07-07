
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Send } from "lucide-react";
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

interface PaymentPromptDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSendPrompt: (payment: Payment) => void;
  paymentsCount: number;
}

const PaymentPromptDialog = ({ isOpen, onClose, onSendPrompt, paymentsCount }: PaymentPromptDialogProps) => {
  const { toast } = useToast();
  const [paymentPrompt, setPaymentPrompt] = useState({
    customerName: "",
    phoneNumber: "",
    amount: "",
    method: "mpesa" as "mpesa" | "airtel" | "tkash",
    invoiceId: ""
  });

  const handleSendPaymentPrompt = () => {
    if (!paymentPrompt.customerName || !paymentPrompt.phoneNumber || !paymentPrompt.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const payment: Payment = {
      id: `PAY-${String(paymentsCount + 1).padStart(3, '0')}`,
      customerName: paymentPrompt.customerName,
      amount: parseInt(paymentPrompt.amount),
      method: paymentPrompt.method,
      reference: `${paymentPrompt.method.toUpperCase()}-PENDING-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      invoiceId: paymentPrompt.invoiceId || `INV-${String(paymentsCount + 1).padStart(3, '0')}`,
      status: "pending"
    };

    onSendPrompt(payment);
    setPaymentPrompt({
      customerName: "",
      phoneNumber: "",
      amount: "",
      method: "mpesa",
      invoiceId: ""
    });
    onClose();

    toast({
      title: "Payment Request Sent",
      description: `Payment prompt sent to ${paymentPrompt.phoneNumber} via ${paymentPrompt.method.toUpperCase()}.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
  );
};

export default PaymentPromptDialog;
