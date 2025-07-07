
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Wifi, CreditCard, TrendingUp, AlertCircle, CheckCircle, Clock, DollarSign } from "lucide-react";
import CustomerManagement from "@/components/CustomerManagement";
import PackageManagement from "@/components/PackageManagement";
import BillingInvoicing from "@/components/BillingInvoicing";
import PaymentTracking from "@/components/PaymentTracking";
import ReportsSection from "@/components/ReportsSection";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data for dashboard overview
  const dashboardStats = {
    totalCustomers: 156,
    activeCustomers: 142,
    totalRevenue: 312000,
    pendingPayments: 45600,
    overdueAccounts: 12,
    popularPackage: "10Mbps Premium"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-red-600 rounded-lg flex items-center justify-center">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ISP Billing System</h1>
                <p className="text-sm text-gray-600">Kenya Internet Service Provider</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Online
              </Badge>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Admin Panel</p>
                <p className="text-xs text-gray-500">Last login: Today 09:30</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="customers" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              Customers
            </TabsTrigger>
            <TabsTrigger value="packages" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              Packages
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              Billing
            </TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              Payments
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Dashboard Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                  <Users className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalCustomers}</div>
                  <p className="text-xs text-green-100">
                    {dashboardStats.activeCustomers} active connections
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KSh {dashboardStats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-blue-100">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                  <Clock className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KSh {dashboardStats.pendingPayments.toLocaleString()}</div>
                  <p className="text-xs text-orange-100">
                    {dashboardStats.overdueAccounts} overdue accounts
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Popular Package</CardTitle>
                  <Wifi className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">{dashboardStats.popularPackage}</div>
                  <p className="text-xs text-purple-100">
                    45% of customers
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>
                  Common tasks and notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => setActiveTab("customers")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Add New Customer
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("billing")}
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    Generate Bills
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("payments")}
                    variant="outline"
                    className="border-orange-300 text-orange-700 hover:bg-orange-50"
                  >
                    Record Payment
                  </Button>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold text-red-800">Urgent Actions Required</h3>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-red-700">
                    <li>• 12 accounts are overdue for payment</li>
                    <li>• 3 customers need service suspension</li>
                    <li>• Monthly bills ready for generation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <CustomerManagement />
          </TabsContent>

          <TabsContent value="packages">
            <PackageManagement />
          </TabsContent>

          <TabsContent value="billing">
            <BillingInvoicing />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentTracking />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
