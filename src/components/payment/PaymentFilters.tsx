
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Send, Smartphone } from "lucide-react";

interface PaymentFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterMethod: string;
  setFilterMethod: (method: string) => void;
  onAddPayment: () => void;
  onSendPrompt: () => void;
  onQuickSTKPush?: () => void;
}

const PaymentFilters = ({
  searchTerm,
  setSearchTerm,
  filterMethod,
  setFilterMethod,
  onAddPayment,
  onSendPrompt,
  onQuickSTKPush
}: PaymentFiltersProps) => {
  return (
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
      
      {onQuickSTKPush && (
        <Button onClick={onQuickSTKPush} className="bg-green-600 hover:bg-green-700">
          <Smartphone className="w-4 h-4 mr-2" />
          Quick STK Push
        </Button>
      )}

      <Button onClick={onSendPrompt} className="bg-blue-600 hover:bg-blue-700">
        <Send className="w-4 h-4 mr-2" />
        Send Payment Prompt
      </Button>

      <Button onClick={onAddPayment} className="bg-green-600 hover:bg-green-700">
        <Plus className="w-4 h-4 mr-2" />
        Record Payment
      </Button>
    </div>
  );
};

export default PaymentFilters;
