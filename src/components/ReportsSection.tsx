
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Download, Calendar, Users, DollarSign, Wifi } from "lucide-react";

const ReportsSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedReport, setSelectedReport] = useState("revenue");

  // Mock data for charts
  const revenueData = [
    { month: "Jan", revenue: 456000, customers: 145 },
    { month: "Feb", revenue: 478000, customers: 152 },
    { month: "Mar", revenue: 502000, customers: 159 },
    { month: "Apr", revenue: 485000, customers: 155 },
    { month: "May", revenue: 523000, customers: 164 },
    { month: "Jun", revenue: 547000, customers: 171 },
  ];

  const packagePopularity = [
    { name: "5Mbps Basic", value: 45, color: "#22c55e" },
    { name: "10Mbps Premium", value: 72, color: "#3b82f6" },
    { name: "20Mbps Business", value: 28, color: "#f59e0b" },
    { name: "50Mbps Enterprise", value: 11, color: "#ef4444" },
  ];

  const outstandingPayments = [
    { customer: "John Kamau", amount: 2500, daysOverdue: 5, package: "10Mbps Premium" },
    { customer: "Mary Wanjiku", amount: 1500, daysOverdue: 12, package: "5Mbps Basic" },
    { customer: "Peter Otieno", amount: 4000, daysOverdue: 25, package: "20Mbps Business" },
    { customer: "Jane Mwangi", amount: 3000, daysOverdue: 8, package: "15Mbps Home Plus" },
  ];

  const activeVsInactiveData = [
    { status: "Active", count: 142, color: "#22c55e" },
    { status: "Suspended", count: 12, color: "#ef4444" },
    { status: "Inactive", count: 8, color: "#6b7280" },
  ];

  const exportReport = (reportType: string) => {
    // Mock export functionality
    console.log(`Exporting ${reportType} report...`);
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Business Reports & Analytics</span>
          </CardTitle>
          <CardDescription>
            Comprehensive reports and insights for your ISP business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue Analysis</SelectItem>
                  <SelectItem value="customers">Customer Analysis</SelectItem>
                  <SelectItem value="packages">Package Popularity</SelectItem>
                  <SelectItem value="outstanding">Outstanding Payments</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={() => exportReport(selectedReport)}
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Report */}
      {selectedReport === "revenue" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span>Revenue Trends - {selectedPeriod}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`KSh ${value.toLocaleString()}`, 'Revenue']} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#22c55e" name="Monthly Revenue (KSh)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="bg-green-50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-green-700">KSh 2.99M</h3>
                    <p className="text-sm text-green-600">Total Revenue (6 months)</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-blue-700">KSh 498K</h3>
                    <p className="text-sm text-blue-600">Average Monthly</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-purple-50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-purple-700">+18%</h3>
                    <p className="text-sm text-purple-600">Growth Rate</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Package Popularity Report */}
      {selectedReport === "packages" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wifi className="w-5 h-5 text-blue-600" />
              <span>Package Popularity Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={packagePopularity}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {packagePopularity.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {packagePopularity.map((pkg, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: pkg.color }}
                      ></div>
                      <span className="font-medium">{pkg.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{pkg.value} customers</p>
                      <p className="text-sm text-gray-500">
                        {((pkg.value / packagePopularity.reduce((sum, p) => sum + p.value, 0)) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Outstanding Payments Report */}
      {selectedReport === "outstanding" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-red-600" />
              <span>Outstanding Payments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Amount Due</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead>Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outstandingPayments.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{payment.customer}</TableCell>
                      <TableCell>{payment.package}</TableCell>
                      <TableCell>KSh {payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{payment.daysOverdue} days</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            payment.daysOverdue > 20 
                              ? "bg-red-100 text-red-800" 
                              : payment.daysOverdue > 10 
                              ? "bg-orange-100 text-orange-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {payment.daysOverdue > 20 ? "High" : payment.daysOverdue > 10 ? "Medium" : "Low"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="bg-red-50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-red-700">
                      KSh {outstandingPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                    </h3>
                    <p className="text-sm text-red-600">Total Outstanding</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-orange-50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-orange-700">{outstandingPayments.length}</h3>
                    <p className="text-sm text-orange-600">Overdue Accounts</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-yellow-50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-yellow-700">
                      {Math.round(outstandingPayments.reduce((sum, p) => sum + p.daysOverdue, 0) / outstandingPayments.length)}
                    </h3>
                    <p className="text-sm text-yellow-600">Avg Days Overdue</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Customer Analysis Report */}
      {selectedReport === "customers" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <span>Customer Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={activeVsInactiveData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {activeVsInactiveData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <Card className="bg-green-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h3 className="text-3xl font-bold text-green-700">142</h3>
                        <p className="text-sm text-green-600">Active Customers</p>
                        <p className="text-xs text-green-500">87.7% of total</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h3 className="text-3xl font-bold text-red-700">12</h3>
                        <p className="text-sm text-red-600">Suspended</p>
                        <p className="text-xs text-red-500">7.4% of total</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h3 className="text-3xl font-bold text-gray-700">8</h3>
                        <p className="text-sm text-gray-600">Inactive</p>
                        <p className="text-xs text-gray-500">4.9% of total</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReportsSection;
