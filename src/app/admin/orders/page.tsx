'use client'

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Search, Eye } from "lucide-react";
import { Modal, Select, message } from "antd";
import { api } from "@/lib/api";

interface Order {
  _id: string;
  orderNumber: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  items: Array<{
    product: {
      _id: string;
      name: string;
      price: number;
    };
    quantity: number;
    price: number;
    size: string;
  }>;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
}

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.getAllOrders(1, 100, statusFilter || undefined);
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error) {
      message.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await api.updateOrderStatus(orderId, newStatus);
      if (response.success) {
        message.success('Order status updated successfully');
        fetchOrders();
        if (selectedOrder?._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      } else {
        message.error(response.message || 'Failed to update order status');
      }
    } catch (error) {
      message.error('Failed to update order status');
    }
  };

  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${order.user.firstName} ${order.user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const processingCount = orders.filter(o => o.status === 'processing').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#4C406E] mb-2 font-sackers">Order Management</h1>
          <p className="text-sm md:text-base text-[#4C406E] font-circular">Track and manage customer orders</p>
        </div>
        <div className="flex gap-2 md:gap-4 flex-wrap">
          <span className="text-xs h-[40px] flex items-center justify-center text-[#4C406E] bg-[#F4E5FF] px-2 py-1">
            {pendingCount} Pending
          </span>
          <span className="text-xs h-[40px] flex items-center justify-center text-[#C27448] bg-[#FFFAE5] px-2 py-1">
            {processingCount} Processing
          </span>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row bg-white p-4 md:p-6 lg:p-8 mb-6 gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full border border-gray-300 py-2 pl-10 pr-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
        <Select
          placeholder="Filter by status"
          allowClear
          className="w-full md:w-48"
          value={statusFilter || undefined}
          onChange={(value) => setStatusFilter(value || "")}
          options={[
            { label: 'All Orders', value: '' },
            { label: 'Pending', value: 'pending' },
            { label: 'Processing', value: 'processing' },
            { label: 'Shipped', value: 'shipped' },
            { label: 'Delivered', value: 'delivered' },
            { label: 'Cancelled', value: 'cancelled' },
          ]}
        />
      </div>
      
      <Card className="p-4 md:p-6 shadow-none rounded-none border-none">
        <div className="mb-4">
          <div className="text-base md:text-lg font-semibold text-[#4C406E]">Recent orders</div>
          <div className="text-xs md:text-sm text-gray-500">{filteredOrders.length} orders found</div>
        </div>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
          <table className="min-w-full text-xs md:text-sm">
            <thead>
              <tr className="bg-[#F4E5FF] text-[#4C406E]">
                <th className="py-2 px-2 md:px-4 text-left font-medium whitespace-nowrap">Order ID</th>
                <th className="py-2 px-2 md:px-4 text-left font-medium whitespace-nowrap">Customer</th>
                <th className="py-2 px-2 md:px-4 text-left font-medium whitespace-nowrap">Total</th>
                <th className="py-2 px-2 md:px-4 text-left font-medium whitespace-nowrap">Status</th>
                <th className="py-2 px-2 md:px-4 text-left font-medium whitespace-nowrap">Payment</th>
                <th className="py-2 px-2 md:px-4 text-left font-medium whitespace-nowrap">Date</th>
                <th className="py-2 px-2 md:px-4 text-left font-medium whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-900 mx-auto"></div>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="py-3 px-2 md:px-4 font-medium text-[#4C406E]">{order.orderNumber}</td>
                    <td className="py-3 px-2 md:px-4">
                      <div className="font-medium text-[#4C406E]">
                        {order.user.firstName} {order.user.lastName}
                      </div>
                      <div className="text-xs text-gray-500">{order.user.email}</div>
                    </td>
                    <td className="py-3 px-2 md:px-4 font-semibold text-xs md:text-sm">${order.totalAmount.toFixed(2)}</td>
                    <td className="py-3 px-2 md:px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 md:px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-2 md:px-4 text-xs md:text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-2 md:px-4">
                      <button 
                        className="hover:text-purple-700 flex items-center gap-1 text-xs md:text-sm"
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye size={16} className="md:w-[18px] md:h-[18px]" /> <span className="hidden sm:inline">View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
            </div>
          </div>
        </div>
      </Card>

      {/* Order Details Modal */}
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        centered
        maskStyle={{ background: "rgba(255,255,255,0.6)" }}
        style={{ height: '90vh', maxHeight: '90vh', top: '5vh', padding: 0 }}
        bodyStyle={{ height: '75vh', maxHeight: '75vh', overflowY: 'auto', padding: 0, width: '100%' }}
        title={
          <span className="text-2xl font-bold text-[#4C406E]">
            Order Details {selectedOrder?.orderNumber}
          </span>
        }
      >
        {selectedOrder && (
          <div className="w-full p-6">
            <p className="text-gray-600 mb-6">View and manage order information and status.</p>
            
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <div className="font-semibold text-[#4C406E] mb-2 border-b">Customer Information</div>
                <div className="text-[12px] mb-1">
                  <span className="font-bold">Name:</span> {selectedOrder.user.firstName} {selectedOrder.user.lastName}
                </div>
                <div className="text-[12px] mb-1">
                  <span className="font-bold">Email:</span> {selectedOrder.user.email}
                </div>
                <div className="text-[12px] mb-1">
                  <span className="font-bold">Order Date:</span> {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              <div>
                <div className="font-semibold text-[#4C406E] mb-2 border-b">Order Status</div>
                <div className="text-[12px] mb-2">
                  <span className="font-bold">Status: </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="text-[12px] mb-2">
                  <span className="font-bold">Payment: </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                    {selectedOrder.paymentStatus}
                  </span>
                </div>
                {selectedOrder.trackingNumber && (
                  <div className="text-[12px] mb-1">
                    <span className="font-bold">Tracking:</span> {selectedOrder.trackingNumber}
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-4 mb-4">
              <div className="font-semibold text-[#4C406E] mb-2 border-b">Items Ordered</div>
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between mb-2 pb-2 border-b">
                  <div>
                    <span className="text-[#4C406E] font-medium">{item.product.name}</span>
                    <p className="text-[12px] text-gray-500">
                      Quantity: {item.quantity} | Size: {item.size}
                    </p>
                  </div>
                  <span className="font-semibold text-[#4C406E]">${item.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between mt-4 font-bold">
                <span>Total:</span>
                <span className="text-[#4C406E]">${selectedOrder.totalAmount.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="font-semibold text-[#4C406E] mb-2 border-b">Shipping Details</div>
              <div className="text-[12px] mb-1">
                <span className="font-bold">Address:</span> {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}, {selectedOrder.shippingAddress.country}
              </div>
              {selectedOrder.trackingNumber && (
                <div className="text-[12px] mb-1">
                  <span className="font-bold">Tracking:</span> {selectedOrder.trackingNumber}
                </div>
              )}
            </div>
            
            {selectedOrder.notes && (
              <div className="mb-4">
                <div className="font-semibold text-[#4C406E] mb-2 border-b">Customer Notes</div>
                <p className="text-[12px] bg-[#F6F6F6] p-3 rounded">{selectedOrder.notes}</p>
              </div>
            )}
            
            <div className="w-full flex flex-wrap gap-2 md:gap-4 mt-6">
              <button 
                className="bg-[#4C406E] text-white font-semibold px-3 md:px-6 py-2 text-xs md:text-sm border-none hover:bg-[#3a2f54] disabled:opacity-50"
                onClick={() => handleUpdateStatus(selectedOrder._id, 'pending')}
                disabled={selectedOrder.status === 'pending'}
              >
                Mark as Pending
              </button>
              <button 
                className="bg-[#C27448] text-white font-semibold px-3 md:px-6 py-2 text-xs md:text-sm border-none hover:bg-[#a15f38] disabled:opacity-50"
                onClick={() => handleUpdateStatus(selectedOrder._id, 'processing')}
                disabled={selectedOrder.status === 'processing'}
              >
                Mark as Processing
              </button>
              <button 
                className="bg-[#7C3AED] text-white font-semibold px-3 md:px-6 py-2 text-xs md:text-sm border-none hover:bg-[#6d28d9] disabled:opacity-50"
                onClick={() => handleUpdateStatus(selectedOrder._id, 'shipped')}
                disabled={selectedOrder.status === 'shipped'}
              >
                Mark as Shipped
              </button>
              <button 
                className="bg-[#00A213] text-white font-semibold px-3 md:px-6 py-2 text-xs md:text-sm border-none hover:bg-[#008a0f] disabled:opacity-50"
                onClick={() => handleUpdateStatus(selectedOrder._id, 'delivered')}
                disabled={selectedOrder.status === 'delivered'}
              >
                Mark as Delivered
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
