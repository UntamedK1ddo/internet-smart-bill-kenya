
import { Card, CardContent } from "@/components/ui/card";

interface PaymentStatisticsProps {
  totalPayments: number;
  mpesaTotal: number;
  airtelTotal: number;
  tkashTotal: number;
  bankTotal: number;
  cashTotal: number;
}

const PaymentStatistics = ({ 
  totalPayments, 
  mpesaTotal, 
  airtelTotal, 
  tkashTotal, 
  bankTotal, 
  cashTotal 
}: PaymentStatisticsProps) => {
  return (
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
  );
};

export default PaymentStatistics;
