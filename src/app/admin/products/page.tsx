'use client'

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Search, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { Modal, Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';

const products = [
  {
    name: "Midnight Garden",
    notes: "Top: Bergamot, Black Currant | Heart: Rose, Jasmine | Base: Patchouli, Vanilla",
    collection: "Noir Collection",
    price: "$200",
    stock: 23,
    status: "Published",
  },
  // Repeat for demo
  {
    name: "Midnight Garden",
    notes: "Top: Bergamot, Black Currant | Heart: Rose, Jasmine | Base: Patchouli, Vanilla",
    collection: "Noir Collection",
    price: "$200",
    stock: 23,
    status: "Published",
  },
  {
    name: "Midnight Garden",
    notes: "Top: Bergamot, Black Currant | Heart: Rose, Jasmine | Base: Patchouli, Vanilla",
    collection: "Noir Collection",
    price: "$200",
    stock: 23,
    status: "Published",
  },
  {
    name: "Midnight Garden",
    notes: "Top: Bergamot, Black Currant | Heart: Rose, Jasmine | Base: Patchouli, Vanilla",
    collection: "Noir Collection",
    price: "$200",
    stock: 23,
    status: "Published",
  },
];

export default function ProductManagement() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4C406E] mb-2">Product Management</h1>
          <p className="text-[#4C406E] mb-6">Manage your fragrance catalog and inventory</p>
        </div>
        <button
          className="bg-[#4C406E] h-[50px] text-white px-6 py-2 font-medium flex items-center gap-2"
          onClick={() => setShowModal(true)}
        >
          + Add new product
        </button>
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
        <div className="mb-2">
          <div className="text-lg font-semibold text-[#4C406E]">Product Catalog</div>
          <div className="text-xs text-gray-500">{products.length} products found</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-purple-100 text-[#4C406E]">
                <th className="py-2 px-4 text-left font-medium">Products</th>
                <th className="py-2 px-4 text-left font-medium">Collection</th>
                <th className="py-2 px-4 text-left font-medium">Price</th>
                <th className="py-2 px-4 text-left font-medium">Stock</th>
                <th className="py-2 px-4 text-left font-medium">Status</th>
                <th className="py-2 px-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="py-3 px-4">
                    <div className="font-medium text-[#4C406E]">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.notes}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-[#4C406E] px-2 py-1 rounded text-xs font-medium">{product.collection}</span>
                  </td>
                  <td className="py-3 px-4">{product.price}</td>
                  <td className="py-3 px-4">{product.stock}</td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-[#4C406E] px-2 py-1 rounded text-xs font-medium">{product.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-3">
                      <button className="hover:text-purple-700">
                        <Edit size={18} />
                      </button>
                      <button className="hover:text-red-500">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add New Product Modal (Ant Design) */}
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        centered
        maskStyle={{ background: "transparent" }}
        title={<span className="text-2xl font-bold text-[#4C406E]">Add New Product</span>}
        style={{ height: '90vh', maxHeight: '90vh',  padding: 0 }}
        bodyStyle={{ height: '75vh', maxHeight: '75vh', overflowY: 'auto', padding: 0 }}
      >
        <div className="">
          <p className="text-gray-600 mb-6">Create a new fragrance product with details and scent notes.</p>
          <Form layout="vertical">
            <Form.Item label={<span className="text-lg font-semibold text-[#4C406E]">Basic Information</span>} className=" border-b " />
         
            <div className="grid grid-cols-2 gap-4 ">
              <Form.Item label="Product name" name="name">
                <Input placeholder="e.g maiden garden" />
              </Form.Item>
              <Form.Item label="Price ($)" name="price">
                <Input type="number" placeholder="536" />
              </Form.Item>
              <Form.Item label="Collection" name="collection">
                <Input placeholder="e.g maiden garden" />
              </Form.Item>
              <Form.Item label="Initial Stock" name="stock">
                <Input type="number" placeholder="536" />
              </Form.Item>
            </div>
            <Form.Item label={<span className="text-lg font-semibold text-[#4C406E]">Product Image</span>} className="border-b" />
            <div className="grid grid-cols-3 gap-4 mb-4">
              <Upload>
                <Button icon={<UploadOutlined />}>Cover</Button>
              </Upload>
              <Upload>
                <Button icon={<UploadOutlined />}>Optional</Button>
              </Upload>
              <Upload>
                <Button icon={<UploadOutlined />}>Optional</Button>
              </Upload>
            </div>
            <Form.Item label={<span className="text-lg font-semibold text-[#4C406E]">Scent profile</span>} className="border-b" />
            <Form.Item label="Fragrance profile" name="profile">
              <Input placeholder="e.g maiden garden" />
            </Form.Item>
            <Form.Item label="Fragrance story" name="story">
              <Input placeholder="e.g maiden garden" />
            </Form.Item>
            <button className="w-full bg-[#4C406E] text-white py-3  font-semibold flex items-center justify-center gap-2 mt-4">
              + Publish product
            </button>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
