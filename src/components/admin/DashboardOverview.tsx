'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { api } from '@/lib/api';
import { message } from 'antd';

interface DashboardData {
  overview: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
  };
  recentOrders: Array<{
    _id: string;
    orderNumber: string;
    totalAmount: number;
    createdAt: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  }>;
  salesTrend: Array<{
    _id: string;
    revenue: number;
    orders: number;
  }>;
  topProducts: Array<{
    _id: string;
    totalQuantity: number;
    totalRevenue: number;
    productDetails: {
      name: string;
      price: number;
      collection: string;
      stock: number;
    };
  }>;
}

export default function DashboardOverview() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.getDashboardStats();
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      message.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours}hr ago`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    }
  };

  const avgOrderValue = data && data.overview.totalOrders > 0 
    ? data.overview.totalRevenue / data.overview.totalOrders 
    : 0;

  const lowStockCount = data?.topProducts?.filter(p => p.productDetails.stock < 10).length || 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#4C406E] mb-2 font-sackers">Dashboard Overview</h1>
      <p className="text-[#4C406E] mb-6 font-circular">Welcome back. Here's what's happening today.</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-[#4C406E] rounded-sm">
          <CardHeader className="text-white">Total Revenue</CardHeader>
          <CardContent className="text-white">
            <div className="text-2xl font-bold">{formatCurrency(data?.overview.totalRevenue || 0)}</div>
            <div className="text-xs">From paid orders</div>
          </CardContent>
        </Card>
        <Card className="bg-[#4C406E] rounded-sm">
          <CardHeader className="text-white">Orders</CardHeader>
          <CardContent className="text-white">
            <div className="text-2xl font-bold">{data?.overview.totalOrders || 0}</div>
            <div className="text-xs">All time orders</div>
          </CardContent>
        </Card>
        <Card className="bg-[#4C406E] rounded-sm">
          <CardHeader className="text-white">Avg Order Value</CardHeader>
          <CardContent className="text-white">
            <div className="text-2xl font-bold">{formatCurrency(avgOrderValue)}</div>
            <div className="text-xs">Per transaction</div>
          </CardContent>
        </Card>
        <Card className="bg-[#4C406E] rounded-sm">
          <CardHeader className="text-white">Stock Alerts</CardHeader>
          <CardContent className="text-white">
            <div className="text-2xl font-bold">{lowStockCount}</div>
            <div className="text-xs">items below 10 units</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column: Revenue trend (top) and Recent orders (bottom) */}
        <div className="space-y-6">
          <Card className="rounded-sm shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[#4C406E]">Revenue trend</h3>
                  <p className="text-xs text-gray-500 font-circular">Last 7 days performance</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full h-56">
                {data?.salesTrend && data.salesTrend.length > 0 ? (
                  <svg viewBox="0 0 600 200" className="w-full h-full">
                    <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
                    {[0,1,2,3,4].map(i => (
                      <line key={i} x1={20} x2={580} y1={20 + i*36} y2={20 + i*36} stroke="#f1f1f1" />
                    ))}
                    {(() => {
                      const maxRevenue = Math.max(...data.salesTrend.map(d => d.revenue), 1);
                      const points = data.salesTrend.slice(0, 7).map((d, i) => ({
                        x: 40 + (i * 540 / 6),
                        y: 170 - (d.revenue / maxRevenue * 130)
                      }));
                      const pathD = points.map((p, i) => 
                        i === 0 ? `M${p.x} ${p.y}` : `L${p.x} ${p.y}`
                      ).join(' ');
                      
                      return (
                        <>
                          <path d={pathD} fill="none" stroke="#6B46C1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          {points.map((p, i) => (
                            <circle key={i} cx={p.x} cy={p.y} r="4" fill="#fff" stroke="#6B46C1" />
                          ))}
                        </>
                      );
                    })()}
                  </svg>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No sales data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-sm shadow-none">
            <CardHeader>
              <div>
                <h3 className="text-lg font-semibold text-[#4C406E]">Recent orders</h3>
                <p className="text-xs text-gray-500">Latest customer purchases</p>
              </div>
            </CardHeader>
            <CardContent>
              {data?.recentOrders && data.recentOrders.length > 0 ? (
                <ul className="space-y-4">
                  {data.recentOrders.slice(0, 3).map(order => (
                    <li key={order._id} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-[#4C406E]">#{order.orderNumber}</div>
                        <div className="text-xs text-gray-500">{order.user.firstName} {order.user.lastName}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{formatCurrency(order.totalAmount)}</div>
                        <div className="text-xs text-gray-400">{formatDate(order.createdAt)}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-center justify-center h-32 text-gray-400">
                  No recent orders
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column: Top Products (top) and Activity feed (bottom) */}
        <div className="space-y-6">
          <Card className="rounded-sm shadow-none">
            <CardHeader>
              <div>
                <h3 className="text-lg font-semibold text-[#4C406E]">Top Products</h3>
                <p className="text-xs text-gray-500">Best performers this week</p>
              </div>
            </CardHeader>
            <CardContent>
              {data?.topProducts && data.topProducts.length > 0 ? (
                <div className="space-y-4">
                  {data.topProducts.slice(0, 4).map((product, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-[#4C406E]">{product.productDetails.name}</div>
                        <div className="text-xs text-gray-400">{product.productDetails.collection || 'Collection'}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-[#4C406E]">{product.totalQuantity} Sold</div>
                        <div className="text-xs text-gray-400">{product.productDetails.stock} in stock</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-32 text-gray-400">
                  No product data available
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-sm shadow-none">
            <CardHeader>
              <div>
                <h3 className="text-lg font-semibold text-[#4C406E]">Activity feed</h3>
                <p className="text-xs text-gray-500">Recent system activities</p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {data?.recentOrders && data.recentOrders.length > 0 ? (
                  <>
                    {data.recentOrders.slice(0, 2).map((order, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#4C406E] mt-2" />
                        <div>
                          <div className="text-sm text-[#4C406E]">New order: #{order.orderNumber}</div>
                          <div className="text-xs text-gray-400">{formatDate(order.createdAt)}</div>
                        </div>
                      </li>
                    ))}
                    {data.topProducts && data.topProducts.length > 0 && (
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#4C406E] mt-2" />
                        <div>
                          <div className="text-sm text-[#4C406E]">Top seller: {data.topProducts[0].productDetails.name}</div>
                          <div className="text-xs text-gray-400">Best performing product</div>
                        </div>
                      </li>
                    )}
                  </>
                ) : (
                  <li className="flex items-center justify-center h-20 text-gray-400">
                    No recent activity
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
