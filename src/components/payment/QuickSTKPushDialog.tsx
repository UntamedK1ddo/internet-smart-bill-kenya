
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Smartphone, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MPESAService } from "@/services/mpesaService";

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

interface QuickSTKPushDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentCreated: (payment: Payment) => void;
  paymentsCount: number;
}

const QuickSTKPushDialog = ({ isOpen, onClose, onPaymentCreated, paymentsCount }: QuickSTKPushDialogProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    amount: "",
    customerName: ""
  });

  const handleQuickSTKPush = async () => {
    if (!formData.phoneNumber || !formData.amount || !formData.customerName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const invoiceId = `INV-${String(paymentsCount + 1).padStart(3, '0')}`;
      
      const stkResponse = await MPESAService.initiateSTKPush({
        phoneNumber: formData.phoneNumber,
        amount: parseInt(formData.amount),
        accountReference: invoiceId,
        transactionDesc: `Payment for ${formData.customerName}`
      });

      const payment: Payment = {
        id: `PAY-${String(paymentsCount + 1).padStart(3, '0')}`,
        customerName: formData.customerName,
        amount: parseInt(formData.amount),
        method: "mpesa",
        reference: stkResponse.CheckoutRequestID,
        date: new Date().toISOString().split('T')[0],
        invoiceId: invoiceId,
        status: "pending"
      };

      onPaymentCreated(payment);
      
      toast({
        title: "STK Push Sent Successfully",
        description: stkResponse.CustomerMessage,
      });

      setFormData({ phoneNumber: "", amount: "", customerName: "" });
      onClose();

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send STK Push. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5 text-green-600" />
            <span>Quick STK Push</span>
          </DialogTitle>
          <DialogDescription>
            Send an instant M-PESA payment request to customer's phone (0746098485).
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="quickCustomerName">Customer Name *</Label>
            <Input
              id="quickCustomerName"
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              placeholder="John Doe"
              disabled={isProcessing}
            />
          </div>
          <div>
            <Label htmlFor="quickPhoneNumber">Phone Number *</Label>
            <Input
              id="quickPhoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              placeholder="254712345678"
              disabled={isProcessing}
            />
          </div>
          <div>
            <Label htmlFor="quickAmount">Amount (KSh) *</Label>
            <Input
              id="quickAmount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              placeholder="2500"
              disabled={isProcessing}
            />
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-700">
              <strong>Business Phone:</strong> 0746098485
            </p>
            <p className="text-xs text-green-600 mt-1">
              Payments will be processed to this number
            </p>
          </div>
          <Button 
            onClick={handleQuickSTKPush} 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending STK Push...
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4 mr-2" />
                Send STK Push
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickSTKPushDialog;
