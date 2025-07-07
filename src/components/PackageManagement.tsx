
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Wifi, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Package {
  id: number;
  name: string;
  speed: string;
  price: number;
  description: string;
  isActive: boolean;
  customerCount: number;
}

const PackageManagement = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock package data
  const [packages, setPackages] = useState<Package[]>([
    {
      id: 1,
      name: "Basic Home",
      speed: "5 Mbps",
      price: 1500,
      description: "Perfect for basic browsing and social media",
      isActive: true,
      customerCount: 45
    },
    {
      id: 2,
      name: "Premium Home",
      speed: "10 Mbps",
      price: 2500,
      description: "Great for streaming and multiple devices",
      isActive: true,
      customerCount: 72
    },
    {
      id: 3,
      name: "Business Starter",
      speed: "20 Mbps",
      price: 4000,
      description: "Ideal for small businesses and remote work",
      isActive: true,
      customerCount: 28
    },
    {
      id: 4,
      name: "Enterprise",
      speed: "50 Mbps",
      price: 8000,
      description: "For large businesses with high bandwidth needs",
      isActive: true,
      customerCount: 11
    }
  ]);

  const [newPackage, setNewPackage] = useState({
    name: "",
    speed: "",
    price: "",
    description: ""
  });

  const handleAddPackage = () => {
    if (!newPackage.name || !newPackage.speed || !newPackage.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const packageData: Package = {
      id: packages.length + 1,
      name: newPackage.name,
      speed: newPackage.speed,
      price: parseInt(newPackage.price),
      description: newPackage.description,
      isActive: true,
      customerCount: 0
    };

    setPackages([...packages, packageData]);
    setNewPackage({
      name: "",
      speed: "",
      price: "",
      description: ""
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Package Added",
      description: `${packageData.name} package has been successfully created.`,
    });
  };

  const togglePackageStatus = (id: number) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, isActive: !pkg.isActive } : pkg
    ));
    
    const pkg = packages.find(p => p.id === id);
    toast({
      title: "Package Updated",
      description: `${pkg?.name} has been ${pkg?.isActive ? 'deactivated' : 'activated'}.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wifi className="w-5 h-5 text-blue-600" />
            <span>Internet Package Management</span>
          </CardTitle>
          <CardDescription>
            Create and manage internet packages for your customers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Package Button */}
          <div className="flex justify-end">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Package
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Package</DialogTitle>
                  <DialogDescription>
                    Create a new internet package for your customers.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="packageName">Package Name *</Label>
                    <Input
                      id="packageName"
                      value={newPackage.name}
                      onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
                      placeholder="e.g., Premium Home, Business Pro"
                    />
                  </div>
                  <div>
                    <Label htmlFor="speed">Speed *</Label>
                    <Input
                      id="speed"
                      value={newPackage.speed}
                      onChange={(e) => setNewPackage({...newPackage, speed: e.target.value})}
                      placeholder="e.g., 10 Mbps, 1 Gbps"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Monthly Price (KSh) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newPackage.price}
                      onChange={(e) => setNewPackage({...newPackage, price: e.target.value})}
                      placeholder="2500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newPackage.description}
                      onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
                      placeholder="Brief description of the package"
                    />
                  </div>
                  <Button onClick={handleAddPackage} className="w-full bg-blue-600 hover:bg-blue-700">
                    Create Package
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Packages Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Package Name</TableHead>
                  <TableHead>Speed</TableHead>
                  <TableHead>Monthly Price</TableHead>
                  <TableHead>Customers</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{pkg.name}</p>
                        <p className="text-sm text-gray-500">{pkg.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {pkg.speed}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      KSh {pkg.price.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold">{pkg.customerCount}</span>
                        <span className="text-sm text-gray-500">active</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={pkg.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                      >
                        {pkg.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => togglePackageStatus(pkg.id)}
                          className={pkg.isActive ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700"}
                        >
                          {pkg.isActive ? "Deactivate" : "Activate"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Package Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-700">{packages.length}</h3>
                  <p className="text-sm text-blue-600">Total Packages</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-green-50">
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-700">{packages.filter(p => p.isActive).length}</h3>
                  <p className="text-sm text-green-600">Active Packages</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-purple-50">
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-purple-700">{packages.reduce((sum, pkg) => sum + pkg.customerCount, 0)}</h3>
                  <p className="text-sm text-purple-600">Total Subscribers</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageManagement;
