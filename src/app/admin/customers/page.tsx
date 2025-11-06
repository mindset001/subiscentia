'use client'

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Search, Eye, X } from "lucide-react";
import { Modal } from "antd";

const customers = [
  {
    name: "Adam Lukat",
    email: "adamlukat@gmail.com",
    loyalty: "VIP",
    orders: 3,
    spent: "$2,007.04",
    lastOrder: "2025-01-13",
    newsletter: "Subscribed",
  },
  // Repeat for demo
  {
    name: "Adam Lukat",
    email: "adamlukat@gmail.com",
    loyalty: "VIP",
    orders: 3,
    spent: "$2,007.04",
    lastOrder: "2025-01-13",
    newsletter: "Subscribed",
  },
  {
    name: "Adam Lukat",
    email: "adamlukat@gmail.com",
    loyalty: "VIP",
    orders: 3,
    spent: "$2,007.04",
    lastOrder: "2025-01-13",
    newsletter: "Subscribed",
  },
  {
    name: "Adam Lukat",
    email: "adamlukat@gmail.com",
    loyalty: "VIP",
    orders: 3,
    spent: "$2,007.04",
    lastOrder: "2025-01-13",
    newsletter: "Subscribed",
  },
];

export default function CustomersManagement() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="p-8">
       <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4C406E] mb-2 font-sackers">Customer Management</h1>
          <p className="text-[#4C406E] mb-6">Track and manage customer orders</p>
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
        <div className="mb-4">
          <div className="text-lg font-semibold text-[#4C406E]">Customer Directory</div>
          <div className="text-xs text-gray-500">{customers.length} customers found</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-purple-100 text-[#4C406E]">
                <th className="py-2 px-4 text-left font-medium">Customer</th>
                <th className="py-2 px-4 text-left font-medium">Loyalty status</th>
                <th className="py-2 px-4 text-left font-medium">Orders</th>
                <th className="py-2 px-4 text-left font-medium">Total Spent</th>
                <th className="py-2 px-4 text-left font-medium">Last Order</th>
                <th className="py-2 px-4 text-left font-medium">Newsletter</th>
                <th className="py-2 px-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="py-3 px-4">
                    <div className="font-medium text-[#4C406E]">{customer.name}</div>
                    <div className="text-xs text-gray-500">{customer.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-[#4C406E] px-2 py-1 rounded text-xs font-medium">{customer.loyalty}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1">
                      <span className="bg-purple-100 text-[#4C406E] px-2 py-1 rounded text-xs font-medium">{customer.orders}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">{customer.spent}</td>
                  <td className="py-3 px-4">{customer.lastOrder}</td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 font-medium text-xs">{customer.newsletter}</span>
                  </td>
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

      {/* Customer Profile Modal */}
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        centered
        maskStyle={{ background: "rgba(255,255,255,0.6)" }}
        style={{ height: '70vh', maxHeight: '70vh', top: '0vh', padding: 0 }}
        bodyStyle={{ height: '60vh', maxHeight: '60vh', overflowY: 'auto', padding: 0, borderRadius: '8px' }}
        title={<span className="text-2xl font-bold text-[#4C406E]">Customer profile</span>}
      >
        <div className="">
          <p className="text-gray-600 mb-6">View customer details, order history, and preferences.</p>
          <div className="mb-4 border-b pb-2">
            <span className="text-2xl font-bold text-[#4C406E]">Adam Lukat</span>
            <span className="ml-4 px-2 py-1 rounded bg-purple-100 text-[#4C406E] text-xs font-medium align-middle">VIP</span>
            <div className="text-[12px] text-black font-normal">adamlukat@gmail.com</div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <div className="font-bold text-[#4C406E]">Joined:</div>
              <div className="text-sm">Joined 2023-08-15</div>
            </div>
            <div>
              <div className="font-bold text-[#4C406E]">Orders:</div>
              <div className="text-sm">8 Orders</div>
            </div>
            <div>
              <div className="font-bold text-[#4C406E]">Spent:</div>
              <div className="text-sm">$2,007.07</div>
            </div>
          </div>
          <div className=" pt-4 mb-4">
            <div className="font-semibold text-[#4C406E] mb-2 border-b pb-2">Order History</div>
            <div className="space-y-2">
              {[1,2,3].map(i => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-bold text-[#4C406E]">#7383</span>
                    <span className=" text-xs text-gray-500">2025-08-12</span>
                  </div>
                  <div className="flex flex-col  gap-2">
                    <span className="font-bold flex items-right justify-end">$265</span>
                    <span className="bg-purple-100 text-[#4C406E] px-2 py-1 rounded text-xs font-medium">Fulfilled</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
