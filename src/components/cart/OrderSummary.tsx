'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { message, Modal, Form, Input } from 'antd';
import { api } from '@/lib/api';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const OrderSummary = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [form] = Form.useForm();
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 10 : 0; // $10 flat shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  // Convert USD to Kobo (Paystack uses kobo for NGN)
  // For demo: 1 USD = 1500 NGN, then convert to kobo (x100)
  const amountInKobo = Math.round(total * 1500 * 100);

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      message.warning('Please login to continue');
      router.push('/auth/login');
      return;
    }

    if (cart.items.length === 0) {
      message.warning('Your cart is empty');
      return;
    }

    setShowCheckoutModal(true);
  };

  const handlePayment = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxx',
        email: user?.email || '',
        amount: amountInKobo,
        currency: 'NGN',
        ref: `ORDER_${Date.now()}`,
        metadata: {
          custom_fields: [
            {
              display_name: 'Customer Name',
              variable_name: 'customer_name',
              value: values.fullName
            }
          ]
        },
        callback: function(response: any) {
          // Create order in database
          const orderData = {
            products: cart.items.map((item: any) => ({
              product: item.product._id,
              quantity: item.quantity,
              size: item.size,
              price: item.price
            })),
            shippingAddress: {
              fullName: values.fullName,
              address: values.address,
              city: values.city,
              state: values.state,
              zipCode: values.zipCode,
              country: values.country || 'Nigeria',
              phone: values.phone
            },
            totalAmount: total,
            paymentMethod: 'paystack',
            paymentStatus: 'paid',
            paymentReference: response.reference,
            status: 'pending',
            orderNumber: `ORD-${Date.now()}`
          };

          api.createOrder(orderData)
            .then((result: any) => {
              if (result.success) {
                message.success('Order placed successfully!');
                clearCart().then(() => {
                  setShowCheckoutModal(false);
                  setLoading(false);
                  router.push('/orders');
                });
              } else {
                message.error('Failed to create order');
                setLoading(false);
              }
            })
            .catch((error: any) => {
              console.error('Error creating order:', error);
              message.error(error.message || 'Failed to create order');
              setLoading(false);
            });
        },
        onClose: function() {
          message.info('Payment cancelled');
          setLoading(false);
        }
      });

      handler.openIframe();
    } catch (error) {
      console.error('Validation error:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-white w-full bg-white shadow-sm border border-gray-200">
        <div className="bg-purple-100 py-6 rounded-t-lg">
          <h2 className="text-2xl font-light tracking-[0.2em] text-center text-purple-900 uppercase">Order Summary</h2>
        </div>
        <div className="px-16 py-6">
          <ul className="space-y-4">
            <li className="flex items-center justify-between text-[#000] text-base">
              <span className="tracking-[0.15em] font-light uppercase">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </li>
            <li className="flex items-center justify-between text-[#000] text-base">
              <span className="tracking-[0.15em] font-light uppercase">Shipping</span>
              <span className="font-medium">${shipping.toFixed(2)}</span>
            </li>
            <li className="flex items-center justify-between text-[#000] text-base">
              <span className="tracking-[0.15em] font-light uppercase">Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </li>
          </ul>
          <hr className="my-6 " />
          <div className="flex items-center justify-between text-[#000] text-lg font-semibold">
            <span className="tracking-[0.15em] font-light uppercase">Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleProceedToCheckout}
            disabled={cart.items.length === 0}
            className="w-full mt-6 bg-purple-900 text-white py-3 rounded font-medium hover:bg-purple-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Proceed to Checkout
          </button>
        </div>
      </section>

      <Modal
        title="Checkout - Shipping Information"
        open={showCheckoutModal}
        onCancel={() => setShowCheckoutModal(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            fullName: user?.name || '',
            email: user?.email || '',
            country: 'Nigeria'
          }}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: 'Please enter your full name' }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input placeholder="john@example.com" disabled value={user?.email} />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input placeholder="+234 XXX XXX XXXX" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please enter your address' }]}
          >
            <Input.TextArea rows={2} placeholder="Street address" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input placeholder="Lagos" />
            </Form.Item>

            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input placeholder="Lagos" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Zip Code"
              name="zipCode"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input placeholder="100001" />
            </Form.Item>

            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input placeholder="Nigeria" disabled />
            </Form.Item>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Amount in NGN:</span>
              <span>₦{(amountInKobo / 100).toLocaleString()}</span>
            </div>
          </div>

          <Form.Item className="mb-0 mt-6">
            <button
              type="button"
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></span>
                  Processing...
                </>
              ) : (
                'Pay with Paystack'
              )}
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default OrderSummary;
