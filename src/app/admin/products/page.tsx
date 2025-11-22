'use client'

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Search, Edit, Trash2, Upload as UploadIcon, Eye, EyeOff } from "lucide-react";
import { Modal, Form, Input, Button, Upload, message, Popconfirm } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { api } from "@/lib/api";
import type { UploadFile } from 'antd';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stockQuantity: number;
  isPublished: boolean;
  publishedAt?: string;
}

export default function ProductManagement() {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.getProducts();
      console.log('Full API response:', response);
      if (response.success) {
        setProducts(response.data);
        console.log('Fetched products:', response.data);
      } else {
        console.error('API returned success: false', response);
        message.error(response.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    form.resetFields();
    setFileList([]);
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stockQuantity: product.stockQuantity,
    });
    
    // Set existing images as file list
    const existingFiles: UploadFile[] = product.images.map((url, index) => ({
      uid: `${index}`,
      name: `image-${index}`,
      status: 'done',
      url: url,
    }));
    setFileList(existingFiles);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await api.deleteProduct(id);
      if (response.success) {
        message.success('Product deleted successfully');
        fetchProducts();
      } else {
        message.error(response.message || 'Failed to delete product');
      }
    } catch (error) {
      message.error('Failed to delete product');
    }
  };

  const handlePublishToggle = async (product: Product) => {
    try {
      const response = product.isPublished 
        ? await api.unpublishProduct(product._id)
        : await api.publishProduct(product._id);
      
      if (response.success) {
        message.success(`Product ${product.isPublished ? 'unpublished' : 'published'} successfully`);
        fetchProducts();
      } else {
        message.error(response.message || 'Failed to update product status');
      }
    } catch (error) {
      message.error('Failed to update product status');
    }
  };

  const uploadImages = async (files: UploadFile[]) => {
    const uploadedUrls: string[] = [];
    
    for (const file of files) {
      // Skip files that are already uploaded (have url)
      if (file.url) {
        uploadedUrls.push(file.url);
        continue;
      }
      
      if (file.originFileObj) {
        try {
          const response = await api.uploadImage(file.originFileObj);
          if (response.success) {
            uploadedUrls.push(response.data.url);
          }
        } catch (error) {
          console.error('Failed to upload image:', error);
        }
      }
    }
    
    return uploadedUrls;
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);

      // Upload images first
      const imageUrls = await uploadImages(fileList);

      const productData = {
        ...values,
        images: imageUrls,
      };

      let response;
      if (editingProduct) {
        response = await api.updateProduct(editingProduct._id, productData);
      } else {
        response = await api.createProduct(productData);
      }

      if (response.success) {
        message.success(`Product ${editingProduct ? 'updated' : 'created'} successfully`);
        setShowModal(false);
        form.resetFields();
        setFileList([]);
        fetchProducts();
      } else {
        message.error(response.message || 'Failed to save product');
      }
    } catch (error) {
      message.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4C406E] mb-2 font-sackers">Product Management</h1>
          <p className="text-[#4C406E] mb-6 font-circular">Manage your fragrance catalog and inventory</p>
        </div>
        <button
          className="bg-[#4C406E] h-[50px] text-white px-6 py-2 font-medium flex items-center gap-2"
          onClick={handleAddNew}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      <Card className="p-6 shadow-none rounded-none border-none">
        <div className="mb-2">
          <div className="text-lg font-semibold text-[#4C406E]">Product Catalog</div>
          <div className="text-xs text-gray-500">{filteredProducts.length} products found</div>
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
              {loading && products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">Loading...</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">No products found</td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b last:border-b-0">
                    <td className="py-3 px-4">
                      <div className="font-medium text-[#4C406E]">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.description.substring(0, 60)}...</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-purple-100 text-[#4C406E] px-2 py-1 rounded text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">${product.price}</td>
                    <td className="py-3 px-4">{product.stockQuantity}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        product.isPublished 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {product.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-3">
                        <button 
                          className="hover:text-purple-700"
                          onClick={() => handlePublishToggle(product)}
                          title={product.isPublished ? 'Unpublish' : 'Publish'}
                        >
                          {product.isPublished ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        <button 
                          className="hover:text-purple-700"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit size={18} />
                        </button>
                        <Popconfirm
                          title="Delete Product"
                          description="Are you sure you want to delete this product?"
                          onConfirm={() => handleDelete(product._id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <button className="hover:text-red-500">
                            <Trash2 size={18} />
                          </button>
                        </Popconfirm>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add/Edit Product Modal */}
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        centered
        maskStyle={{ background: "transparent" }}
        title={
          <span className="text-2xl font-bold text-[#4C406E]">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </span>
        }
        style={{ height: '90vh', maxHeight: '90vh', padding: 0 }}
        bodyStyle={{ height: '75vh', maxHeight: '75vh', overflowY: 'auto', padding: 0 }}
      >
        <div className="">
          <p className="text-gray-600 mb-6">
            {editingProduct 
              ? 'Update the product details below' 
              : 'Create a new fragrance product with details and scent notes'}
          </p>
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Form.Item 
              label={<span className="text-lg font-semibold text-[#4C406E]">Basic Information</span>} 
              className="border-b" 
            />
         
            <div className="grid grid-cols-2 gap-4">
              <Form.Item 
                label="Product name" 
                name="name"
                rules={[{ required: true, message: 'Please enter product name' }]}
              >
                <Input placeholder="e.g. Midnight Garden" />
              </Form.Item>
              <Form.Item 
                label="Price ($)" 
                name="price"
                rules={[{ required: true, message: 'Please enter price' }]}
              >
                <Input type="number" placeholder="200" />
              </Form.Item>
              <Form.Item 
                label="Collection/Category" 
                name="category"
                rules={[{ required: true, message: 'Please enter category' }]}
              >
                <Input placeholder="e.g. Noir Collection" />
              </Form.Item>
              <Form.Item 
                label="Initial Stock" 
                name="stockQuantity"
                rules={[{ required: true, message: 'Please enter stock quantity' }]}
              >
                <Input type="number" placeholder="50" />
              </Form.Item>
            </div>

            <Form.Item 
              label={<span className="text-lg font-semibold text-[#4C406E]">Product Images</span>} 
              className="border-b" 
            />
            <div className="mb-4">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
                beforeUpload={() => false}
                multiple
                maxCount={5}
              >
                {fileList.length >= 5 ? null : (
                  <div>
                    <UploadIcon size={20} />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
              <p className="text-xs text-gray-500 mt-2">Upload up to 5 images</p>
            </div>

            <Form.Item 
              label={<span className="text-lg font-semibold text-[#4C406E]">Product Description</span>} 
              className="border-b" 
            />
            <Form.Item 
              label="Description" 
              name="description"
              rules={[{ required: true, message: 'Please enter description' }]}
            >
              <Input.TextArea 
                rows={4} 
                placeholder="Describe the fragrance notes, profile, and story..." 
              />
            </Form.Item>

            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              className="w-full bg-[#4C406E] text-white py-6 font-semibold flex items-center justify-center gap-2 mt-4"
              style={{ height: '50px' }}
            >
              {editingProduct ? 'Update Product' : '+ Publish Product'}
            </Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
