'use client'

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Search, Eye } from "lucide-react";
import { Modal, message } from "antd";
import { api } from "@/lib/api";

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
}

interface CustomerOrder {
  _id: string;
  orderNumber: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function CustomersManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerOrders, setCustomerOrders] = useState<CustomerOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await api.getCustomers(1, 100);
      if (response.success) {
        setCustomers(response.data);
      }
    } catch (error) {
      message.error('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const handleViewCustomer = async (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
    
    // Fetch customer orders
    try {
      setLoadingOrders(true);
      const response = await api.getCustomerOrders(customer._id, 1, 10);
      if (response.success) {
        setCustomerOrders(response.data);
      }
    } catch (error) {
      message.error('Failed to fetch customer orders');
    } finally {
      setLoadingOrders(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const vipCount = customers.filter(c => c.totalSpent >= 500).length;
  const regularCount = customers.length - vipCount;

  const getLoyaltyStatus = (totalSpent: number) => {
    if (totalSpent >= 1000) return { label: 'Platinum', color: 'bg-purple-600 text-white' };
    if (totalSpent >= 500) return { label: 'VIP', color: 'bg-purple-100 text-[#4C406E]' };
    return { label: 'Regular', color: 'bg-gray-100 text-gray-700' };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  return (
    <div className="p-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4C406E] mb-2 font-sackers">Customer Management</h1>
          <p className="text-[#4C406E] mb-6">Track and manage customer information</p>
        </div>
        <div className="flex gap-4">
          <span className="text-xs h-[40px] flex items-center justify-center text-[#4C406E] bg-[#F4E5FF] px-2 py-1">
            {vipCount} VIP
          </span>
          <span className="text-xs h-[40px] flex items-center justify-center text-gray-700 bg-gray-100 px-2 py-1">
            {regularCount} Regular
          </span>
        </div>
      </div>
      
      <div className="flex bg-white p-8 mb-6">
        <div className="w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
              className="w-[90%] border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
      </div>
      
      <Card className="p-6 shadow-none rounded-none border-none">
        <div className="mb-4">
          <div className="text-lg font-semibold text-[#4C406E]">Customer Directory</div>
          <div className="text-xs text-gray-500">{filteredCustomers.length} customers found</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-purple-100 text-[#4C406E]">
                <th className="py-2 px-4 text-left font-medium">Customer</th>
                <th className="py-2 px-4 text-left font-medium">Loyalty Status</th>
                <th className="py-2 px-4 text-left font-medium">Orders</th>
                <th className="py-2 px-4 text-left font-medium">Total Spent</th>
                <th className="py-2 px-4 text-left font-medium">Last Order</th>
                <th className="py-2 px-4 text-left font-medium">Joined</th>
                <th className="py-2 px-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-900 mx-auto"></div>
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No customers found
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => {
                  const loyalty = getLoyaltyStatus(customer.totalSpent);
                  return (
                    <tr key={customer._id} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-[#4C406E]">
                          {customer.firstName} {customer.lastName}
                        </div>
                        <div className="text-xs text-gray-500">{customer.email}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${loyalty.color}`}>
                          {loyalty.label}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-purple-100 text-[#4C406E] px-2 py-1 rounded text-xs font-medium">
                          {customer.totalOrders}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold">${customer.totalSpent.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        {customer.lastOrderDate 
                          ? new Date(customer.lastOrderDate).toLocaleDateString()
                          : 'No orders yet'
                        }
                      </td>
                      <td className="py-3 px-4 text-xs text-gray-500">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <button 
                          className="hover:text-purple-700 flex items-center gap-1"
                          onClick={() => handleViewCustomer(customer)}
                        >
                          <Eye size={18} /> View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Customer Profile Modal */}
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        centered
        maskStyle={{ background: "rgba(255,255,255,0.6)" }}
        style={{ height: '70vh', maxHeight: '70vh', top: '0vh', padding: 0 }}
        bodyStyle={{ height: '60vh', maxHeight: '60vh', overflowY: 'auto', padding: 0, borderRadius: '8px' }}
        title={<span className="text-2xl font-bold text-[#4C406E]">Customer Profile</span>}
      >
        {selectedCustomer && (
          <div className="p-6">
            <p className="text-gray-600 mb-6">View customer details, order history, and preferences.</p>
            
            <div className="mb-4 border-b pb-2">
              <span className="text-2xl font-bold text-[#4C406E]">
                {selectedCustomer.firstName} {selectedCustomer.lastName}
              </span>
              <span className={`ml-4 px-2 py-1 rounded text-xs font-medium align-middle ${getLoyaltyStatus(selectedCustomer.totalSpent).color}`}>
                {getLoyaltyStatus(selectedCustomer.totalSpent).label}
              </span>
              <div className="text-[12px] text-black font-normal">{selectedCustomer.email}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <div className="font-bold text-[#4C406E]">Joined:</div>
                <div className="text-sm">{new Date(selectedCustomer.createdAt).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="font-bold text-[#4C406E]">Orders:</div>
                <div className="text-sm">{selectedCustomer.totalOrders} Orders</div>
              </div>
              <div>
                <div className="font-bold text-[#4C406E]">Spent:</div>
                <div className="text-sm">${selectedCustomer.totalSpent.toFixed(2)}</div>
              </div>
            </div>
            
            <div className="pt-4 mb-4">
              <div className="font-semibold text-[#4C406E] mb-2 border-b pb-2">Order History</div>
              {loadingOrders ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-900 mx-auto"></div>
                </div>
              ) : customerOrders.length === 0 ? (
                <div className="text-center py-4 text-gray-500">No orders yet</div>
              ) : (
                <div className="space-y-2">
                  {customerOrders.map(order => (
                    <div key={order._id} className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#4C406E]">{order.orderNumber}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="font-bold flex items-right justify-end">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
