'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { TrendingUp, FileText, Users, BarChart, DollarSign } from "lucide-react";
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
  salesByCollection: Array<{
    _id: string;
    totalSales: number;
    totalOrders: number;
  }>;
  topProducts: Array<{
    _id: string;
    totalQuantity: number;
    totalRevenue: number;
    productDetails: {
      name: string;
      price: number;
    };
  }>;
}

export default function AnalyticsReports() {
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
            message.error('Failed to load analytics data');
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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            </div>
        );
    }

    return (
        <div className="">
            <h1 className="text-2xl md:text-3xl font-bold text-[#4C406E] mb-2 font-sackers">Analytics & Reports</h1>
            <p className="text-sm md:text-base text-[#4C406E] mb-6 font-circular">Insights and performance metrics</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <Card className="bg-purple-100 rounded-none shadow-none">
                    <div className="p-3 md:p-4 flex flex-col gap-3 md:gap-4">
                        <div className="flex justify-between">
                            <div className="text-xs md:text-sm text-[#4C406E]">Total Revenue</div>
                            <DollarSign className="text-[#4C406E] w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-[#4C406E]">
                                {formatCurrency(data?.overview.totalRevenue || 0)}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <TrendingUp className="text-[#4C406E] w-4" />
                            <div className="text-xs text-gray-500">From paid orders</div>
                        </div>
                    </div>
                </Card>

                <Card className="bg-purple-100 rounded-none shadow-none">
                    <div className="p-2 flex flex-col gap-4">
                        <div className="flex justify-between">
                            <div className="text-xs text-[#4C406E]">Total Orders</div>
                            <FileText className="text-[#4C406E]" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[#4C406E]">
                                {data?.overview.totalOrders || 0}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <TrendingUp className="text-[#4C406E] w-4" />
                            <div className="text-xs text-gray-500">All time orders</div>
                        </div>
                    </div>
                </Card>

                <Card className="bg-purple-100 rounded-none shadow-none">
                    <div className="p-2 flex flex-col gap-4">
                        <div className="flex justify-between">
                            <div className="text-xs text-[#4C406E]">Total Customers</div>
                            <Users className="text-[#4C406E]" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[#4C406E]">
                                {data?.overview.totalCustomers || 0}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <TrendingUp className="text-[#4C406E] w-4" />
                            <div className="text-xs text-gray-500">Registered users</div>
                        </div>
                    </div>
                </Card>

                <Card className="bg-purple-100 rounded-none shadow-none">
                    <div className="p-2 flex flex-col gap-4">
                        <div className="flex justify-between">
                            <div className="text-xs text-[#4C406E]">Avg Order Value</div>
                            <TrendingUp className="text-[#4C406E]" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[#4C406E]">
                                {formatCurrency(avgOrderValue)}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <BarChart className="text-[#4C406E] w-4" />
                            <div className="text-xs text-gray-500">Per transaction</div>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
                <Card className="p-4 md:p-6 rounded-none shadow-none border-none">
                    <div className="mb-2">
                        <div className="text-base md:text-lg font-semibold text-[#4C406E]">Sales trend</div>
                        <div className="text-xs md:text-sm text-gray-500">Revenue over the last 30 days</div>
                    </div>
                    <div className="w-full h-56">
                        {data?.salesTrend && data.salesTrend.length > 0 ? (
                            <svg viewBox="0 0 400 180" className="w-full h-full">
                                <rect x="0" y="0" width="400" height="180" fill="#fff" />
                                {[0, 1, 2, 3, 4].map(i => (
                                    <line key={i} x1={40} x2={360} y1={30 + i * 30} y2={30 + i * 30} stroke="#e5e5f7" />
                                ))}
                                {(() => {
                                    const maxRevenue = Math.max(...data.salesTrend.map(d => d.revenue), 1);
                                    const points = data.salesTrend.slice(0, 7).map((d, i) => ({
                                        x: 40 + (i * 320 / 6),
                                        y: 150 - (d.revenue / maxRevenue * 100)
                                    }));
                                    const pathD = points.map((p, i) => 
                                        i === 0 ? `M${p.x} ${p.y}` : `L${p.x} ${p.y}`
                                    ).join(' ');
                                    
                                    return (
                                        <>
                                            <path d={pathD} fill="none" stroke="#6B46C1" strokeWidth="3" />
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
                </Card>
                <Card className="p-4 md:p-6 rounded-none shadow-none border-none">
                    <div className="mb-2">
                        <div className="text-base md:text-lg font-semibold text-[#4C406E]">Sales by Collection</div>
                        <div className="text-xs md:text-sm text-gray-500">Performance by product line</div>
                    </div>
                    <div className="w-full h-56">
                        {data?.salesByCollection && data.salesByCollection.length > 0 ? (
                            <svg viewBox="0 0 500 250" className="w-full h-full">
                                <rect x="0" y="0" width="500" height="250" fill="#fff" />
                                {[0, 1, 2, 3, 4].map(i => (
                                    <line key={i} x1={50} x2={470} y1={40 + i * 40} y2={40 + i * 40} stroke="#d9d9d9" strokeDasharray="4 2" />
                                ))}
                                <line x1={50} x2={50} y1={40} y2={200} stroke="#888" />
                                <line x1={50} x2={470} y1={200} y2={200} stroke="#888" />
                                {(() => {
                                    const maxSales = Math.max(...data.salesByCollection.map(c => c.totalSales), 1);
                                    const collections = data.salesByCollection.slice(0, 5);
                                    const barWidth = Math.min(50, 320 / collections.length);
                                    
                                    return (
                                        <>
                                            {collections.map((c, i) => {
                                                const height = (c.totalSales / maxSales) * 140;
                                                const x = 90 + (i * 75);
                                                return (
                                                    <g key={i}>
                                                        <rect 
                                                            x={x} 
                                                            y={200 - height} 
                                                            width={barWidth} 
                                                            height={height} 
                                                            fill="#4C406E" 
                                                            rx={4} 
                                                        />
                                                        <text 
                                                            x={x + barWidth / 2} 
                                                            y={220} 
                                                            fontSize="11" 
                                                            fill="#4C406E" 
                                                            textAnchor="middle"
                                                        >
                                                            {c._id || 'Unknown'}
                                                        </text>
                                                    </g>
                                                );
                                            })}
                                        </>
                                    );
                                })()}
                            </svg>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                No collection data available
                            </div>
                        )}
                    </div>
                </Card>
                <Card className="p-4 md:p-6 rounded-none shadow-none border-none">
                    <div className="mb-2">
                        <div className="text-base md:text-lg font-semibold text-[#4C406E]">Recent orders</div>
                        <div className="text-xs md:text-sm text-gray-500">Latest customer purchases</div>
                    </div>
                    {data?.recentOrders && data.recentOrders.length > 0 ? (
                        <ul className="space-y-4">
                            {data.recentOrders.map(order => (
                                <li key={order._id} className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium text-[#4C406E]">
                                            #{order.orderNumber}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {order.user.firstName} {order.user.lastName}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold">
                                            {formatCurrency(order.totalAmount)}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {formatDate(order.createdAt)}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex items-center justify-center h-32 text-gray-400">
                            No recent orders
                        </div>
                    )}
                </Card>
                <Card className="p-4 md:p-6 rounded-none shadow-none border-none">
                    <div className="mb-2">
                        <div className="text-base md:text-lg font-semibold text-[#4C406E]">Top Products</div>
                        <div className="text-xs md:text-sm text-gray-500">Best selling items</div>
                    </div>
                    {data?.topProducts && data.topProducts.length > 0 ? (
                        <ul className="space-y-4">
                            {data.topProducts.map((product, index) => (
                                <li key={product._id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-[#4C406E] font-semibold text-sm">
                                            #{index + 1}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-[#4C406E]">
                                                {product.productDetails.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {product.totalQuantity} sold
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold">
                                            {formatCurrency(product.totalRevenue)}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex items-center justify-center h-32 text-gray-400">
                            No product data available
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
