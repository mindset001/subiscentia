'use client'

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Search, Eye, X } from "lucide-react";
import { Modal, Button } from "antd";

const orders = [
  {
    id: "#4794",
    customer: "Adam Lukat",
    email: "adamlukat@gmail.com",
    total: "$200",
    status: "Fulfilled",
    payment: "Paid",
    date: "2025-01-13",
  },
  // Repeat for demo
  {
    id: "#4794",
    customer: "Adam Lukat",
    email: "adamlukat@gmail.com",
    total: "$200",
    status: "Fulfilled",
    payment: "Paid",
    date: "2025-01-13",
  },
  {
    id: "#4794",
    customer: "Adam Lukat",
    email: "adamlukat@gmail.com",
    total: "$200",
    status: "Fulfilled",
    payment: "Paid",
    date: "2025-01-13",
  },
  {
    id: "#4794",
    customer: "Adam Lukat",
    email: "adamlukat@gmail.com",
    total: "$200",
    status: "Fulfilled",
    payment: "Paid",
    date: "2025-01-13",
  },
];

export default function OrderManagement() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4C406E] mb-2 font-sackers">Order Management</h1>
          <p className="text-[#4C406E] mb-6 font-circular">Track and manage customer orders</p>
        </div>
        <div className="flex gap-4">
          <span className="text-xs h-[40px] flex items-center justify-center text-[#4C406E] bg-[#F4E5FF] px-2 py-1 ">1 Pending</span>
          <span className="text-xs h-[40px] flex items-center justify-center text-[#C27448] bg-[#FFFAE5] px-2 py-1 ">1 Processing</span>
        </div>
      </div>
      <div className="flex bg-white p-8 mb-6">
        <div className="w-full ">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-[90%] border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
      </div>
      <Card className="p-6 shadow-none rounded-none border-none">
        <div className="">
          <div className="text-lg font-semibold text-[#4C406E]">Recent orders</div>
          <div className="text-xs text-gray-500">{orders.length} orders found</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#F4E5FF] text-[#4C406E]">
                <th className="py-2 px-4 text-left font-medium">Order ID</th>
                <th className="py-2 px-4 text-left font-medium">Customer</th>
                <th className="py-2 px-4 text-left font-medium">Total</th>
                <th className="py-2 px-4 text-left font-medium">Status</th>
                <th className="py-2 px-4 text-left font-medium">Payment</th>
                <th className="py-2 px-4 text-left font-medium">Date</th>
                <th className="py-2 px-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="py-3 px-4 font-medium text-[#4C406E]">{order.id}</td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-[#4C406E]">{order.customer}</div>
                    <div className="text-xs text-gray-500">{order.email}</div>
                  </td>
                  <td className="py-3 px-4">{order.total}</td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-[#4C406E] px-2 py-1 rounded text-xs font-medium">{order.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1">
                      <span className="bg-purple-100 text-[#4C406E] px-2 py-1 rounded text-xs font-medium">{order.payment}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">
                    <button className="hover:text-purple-700 flex items-center gap-1" onClick={() => setShowModal(true)}>
                      <Eye size={18} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        bodyStyle={{ height: '75vh', maxHeight: '75vh', overflowY: 'auto', padding: 0, width: '100%'   }}
        title={<span className="text-2xl font-bold text-[#4C406E]">Order Details #2847</span>}
      >
        <div className="w-full">
          <p className="text-gray-600 mb-6">View and manage order information and status.</p>
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <div className="font-semibold text-[#4C406E] mb-2 border-b">Customer Information</div>
              <div className="text-[12px] mb-1"><span className="font-bold">Name:</span> Emma Thompson</div>
              <div className="text-[12px] mb-1"><span className="font-bold">Email:</span> emma.thompson@email.com</div>
              <div className="text-[12px] mb-1"><span className="font-bold">Order Date:</span> 2024-01-15</div>
            </div>
            <div>
              <div className="font-semibold text-[#4C406E] mb-2 border-b">Order Status</div>
              <div className="text-[12px] mb-1"><span className="text-[#C27448] font-bold">Processing</span></div>
              <div className="text-[12px] mb-1"><span className="text-green-600 font-bold">paid</span></div>
              <div className="text-[12px] mb-1">UPS123456789</div>
            </div>
          </div>
          <div className="pt-4 mb-4">
            <div className="font-semibold text-[#4C406E] mb-2 border-b">Item ordered</div>
            <div className="flex justify-between mb-1">
              <div>
                <span className="text-[#4C406E]">Midnight Garden </span>
              <p className="text-[12px] text-gray-500">Quantity: 1</p>
              </div>
              <span className="font-semibold text-[#4C406E]">$265</span>
            </div>
            <div className="border-t flex justify-between mt-4 font-bold">
              <span>Total:</span>
              <span className="text-[#4C406E]">$265</span>
            </div>
          </div>
          <div className="  mb-4">
            <div className="font-semibold text-[#4C406E] mb-2 border-b">Shipping Details</div>
            <div className="text-[12px] mb-1"><span className="font-bold">Address:</span> 123 Park Avenue, New York, NY 10016</div>
            <div className="text-[12px] mb-1"><span className="font-bold">Method:</span> Express Delivery</div>
            <div className="text-[12px] mb-1"><span className="font-bold">Tracking:</span> UPS123456789</div>
          </div>
          <div className=" pt-4 mb-4">
            <div className="font-semibold text-[#4C406E] mb-2 border-b">Customer Notes</div>
            <textarea className="w-full border-none bg-[#F6F6F6] py-2 px-3" rows={3} placeholder="Add note to customer..." />
          </div>
          <div className="w-full flex gap-4 mt-6">
            <button className="bg-[#C27448] text-white font-semibold px-6 py-2 border-none">Mark as processing</button>
            <button className="bg-[#00A213] text-white font-semibold px-6 py-2  border-none">Mark as Fulfilled</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
