
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

interface AddPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPayment: (payment: Payment) => void;
  paymentsCount: number;
}

const AddPaymentDialog = ({ isOpen, onClose, onAddPayment, paymentsCount }: AddPaymentDialogProps) => {
  const { toast } = useToast();
  const [newPayment, setNewPayment] = useState({
    customerName: "",
    amount: "",
    method: "mpesa" as "mpesa" | "airtel" | "tkash" | "bank" | "cash",
    reference: "",
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
      id: `PAY-${String(paymentsCount + 1).padStart(3, '0')}`,
      customerName: newPayment.customerName,
      amount: parseInt(newPayment.amount),
      method: newPayment.method,
      reference: newPayment.reference,
      date: new Date().toISOString().split('T')[0],
      invoiceId: newPayment.invoiceId || `INV-${String(paymentsCount + 1).padStart(3, '0')}`,
      status: "completed"
    };

    onAddPayment(payment);
    setNewPayment({
      customerName: "",
      amount: "",
      method: "mpesa",
      reference: "",
      invoiceId: ""
    });
    onClose();

    toast({
      title: "Payment Recorded",
      description: `Payment of KSh ${payment.amount.toLocaleString()} has been successfully recorded.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
  );
};

export default AddPaymentDialog;
