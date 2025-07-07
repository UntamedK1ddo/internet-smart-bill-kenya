
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Plus, Search, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Customer {
  id: number;
  name: string;
  location: string;
  phone: string;
  email: string;
  connectionType: "fiber" | "wireless";
  package: string;
  status: "active" | "inactive" | "suspended";
  routerMac: string;
}

const CustomerManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock customer data
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "John Kamau",
      location: "Nairobi - Westlands",
      phone: "+254712345678",
      email: "john.kamau@email.com",
      connectionType: "fiber",
      package: "10Mbps Premium",
      status: "active",
      routerMac: "AA:BB:CC:DD:EE:FF"
    },
    {
      id: 2,
      name: "Mary Wanjiku",
      location: "Kiambu - Ruiru",
      phone: "+254723456789",
      email: "mary.wanjiku@email.com",
      connectionType: "wireless",
      package: "5Mbps Basic",
      status: "active",
      routerMac: "BB:CC:DD:EE:FF:AA"
    },
    {
      id: 3,
      name: "Peter Otieno",
      location: "Kisumu - Milimani",
      phone: "+254734567890",
      email: "peter.otieno@email.com",
      connectionType: "fiber",
      package: "20Mbps Business",
      status: "suspended",
      routerMac: "CC:DD:EE:FF:AA:BB"
    }
  ]);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    connectionType: "fiber" as "fiber" | "wireless",
    package: "",
    routerMac: ""
  });

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone || !newCustomer.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const customer: Customer = {
      id: customers.length + 1,
      ...newCustomer,
      status: "active"
    };

    setCustomers([...customers, customer]);
    setNewCustomer({
      name: "",
      location: "",
      phone: "",
      email: "",
      connectionType: "fiber",
      package: "",
      routerMac: ""
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Customer Added",
      description: `${customer.name} has been successfully added to the system.`,
    });
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         customer.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || customer.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-green-600" />
            <span>Customer Management</span>
          </CardTitle>
          <CardDescription>
            Manage your ISP customers, their packages, and connection details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers by name, phone, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Customer
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                  <DialogDescription>
                    Enter the customer details to add them to your system.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={newCustomer.location}
                      onChange={(e) => setNewCustomer({...newCustomer, location: e.target.value})}
                      placeholder="County - Sub-location"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                      placeholder="+254712345678"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                      placeholder="john@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="connectionType">Connection Type</Label>
                    <Select 
                      value={newCustomer.connectionType} 
                      onValueChange={(value: "fiber" | "wireless") => setNewCustomer({...newCustomer, connectionType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fiber">Fiber</SelectItem>
                        <SelectItem value="wireless">Wireless</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="package">Internet Package</Label>
                    <Input
                      id="package"
                      value={newCustomer.package}
                      onChange={(e) => setNewCustomer({...newCustomer, package: e.target.value})}
                      placeholder="10Mbps Premium"
                    />
                  </div>
                  <div>
                    <Label htmlFor="routerMac">Router MAC Address</Label>
                    <Input
                      id="routerMac"
                      value={newCustomer.routerMac}
                      onChange={(e) => setNewCustomer({...newCustomer, routerMac: e.target.value})}
                      placeholder="AA:BB:CC:DD:EE:FF"
                    />
                  </div>
                  <Button onClick={handleAddCustomer} className="w-full bg-green-600 hover:bg-green-700">
                    Add Customer
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Customers Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Connection</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-500">ID: {customer.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>{customer.location}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{customer.phone}</p>
                        <p className="text-xs text-gray-500">{customer.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{customer.package}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={customer.connectionType === "fiber" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}>
                        {customer.connectionType}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No customers found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerManagement;
