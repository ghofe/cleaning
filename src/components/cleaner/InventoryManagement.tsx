
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Package, AlertTriangle, Plus, Minus, ShoppingCart } from "lucide-react";

const InventoryManagement = () => {
  const [supplies, setSupplies] = useState([
    {
      id: 1,
      name: "All-Purpose Cleaner",
      category: "Cleaning Solutions",
      current: 3,
      minimum: 2,
      maximum: 10,
      unit: "bottles",
      cost: 250,
      lastRestocked: "2024-05-28"
    },
    {
      id: 2,
      name: "Microfiber Cloths",
      category: "Cleaning Tools",
      current: 8,
      minimum: 5,
      maximum: 20,
      unit: "pieces",
      cost: 50,
      lastRestocked: "2024-05-25"
    },
    {
      id: 3,
      name: "Toilet Paper",
      category: "Supplies",
      current: 12,
      minimum: 10,
      maximum: 50,
      unit: "rolls",
      cost: 30,
      lastRestocked: "2024-06-01"
    },
    {
      id: 4,
      name: "Vacuum Cleaner Bags",
      category: "Equipment",
      current: 1,
      minimum: 3,
      maximum: 15,
      unit: "pieces",
      cost: 100,
      lastRestocked: "2024-05-20"
    }
  ]);

  const updateQuantity = (id: number, change: number) => {
    setSupplies(prev => prev.map(item => 
      item.id === id 
        ? { ...item, current: Math.max(0, item.current + change) }
        : item
    ));
  };

  const getLevelStatus = (current: number, minimum: number, maximum: number) => {
    const percentage = (current / maximum) * 100;
    if (current <= minimum) return { status: "low", color: "bg-red-500", text: "Low Stock" };
    if (percentage <= 30) return { status: "warning", color: "bg-yellow-500", text: "Running Low" };
    return { status: "good", color: "bg-green-500", text: "Good Stock" };
  };

  const lowStockItems = supplies.filter(item => item.current <= item.minimum);
  const totalValue = supplies.reduce((sum, item) => sum + (item.current * item.cost), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-gray-600">Track and manage your cleaning supplies</p>
        </div>
        <Button>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Order Supplies
        </Button>
      </div>

      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">KES {totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
            <p className="text-sm text-gray-500">Items need restocking</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{supplies.length}</div>
            <p className="text-sm text-gray-500">Different products</p>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockItems.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-white rounded border">
                  <span className="font-medium">{item.name}</span>
                  <Badge variant="destructive">
                    {item.current} {item.unit} left
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inventory List */}
      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {supplies.map(item => {
              const levelInfo = getLevelStatus(item.current, item.minimum, item.maximum);
              const percentage = (item.current / item.maximum) * 100;
              
              return (
                <div key={item.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <Badge variant="outline">{levelInfo.text}</Badge>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Stock Level</span>
                      <span>{item.current} / {item.maximum} {item.unit}</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <p>Cost per unit: KES {item.cost}</p>
                      <p>Last restocked: {item.lastRestocked}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.current === 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input 
                        type="number" 
                        value={item.current} 
                        className="w-16 text-center"
                        readOnly
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManagement;
