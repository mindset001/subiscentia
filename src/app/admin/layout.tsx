'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Receipt, User, LineChart, Mail, Bell, LogOut } from 'lucide-react';
import Image from 'next/image';
import Logo from '../../../public/images/logo.png';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { href: '/admin/products', label: 'Products', icon: <Package size={20} /> },
    { href: '/admin/orders', label: 'Orders', icon: <Receipt size={20} /> },
    { href: '/admin/customers', label: 'Customers', icon: <User size={20} /> },
    { href: '/admin/analytics', label: 'Analytics', icon: <LineChart size={20} /> },
    { href: '/admin/newsletter', label: 'Newsletter', icon: <Mail size={20} /> },
  ];
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-6">
          <div className="mb-10">
            <Image src={Logo} alt="Subi Centia" width={120} height={40} />
          </div>
          <nav className="flex-1 space-y-2">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-2 rounded font-medium transition-colors duration-150 font-circular
                  ${pathname === link.href ? 'bg-[#4C406E] text-white' : 'text-[#4C406E] hover:text-purple-700'}`}
              >
                {link.icon} {link.label}
              </a>
            ))}
          </nav>
          
          {/* Logout Button */}
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 rounded font-medium transition-colors duration-150 text-red-600 hover:bg-red-50 mt-4 font-circular"
          >
            <LogOut size={20} /> Logout
          </button>
        </aside>
        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-10 py-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <Image src={Logo} alt="Subi Centia" width={60} height={20} />
            </div>
            <div className="flex items-center gap-6">
              <Bell size={12} className="text-gray-700" />
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-purple-900 rounded-full flex items-center justify-center text-white font-medium">
                  {user?.name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="flex flex-col font-circular">
                  <span className="font-medium text-gray-900 text-sm">{user?.name || user?.email?.split('@')[0] || 'Admin'}</span>
                  <span className="text-xs text-gray-500">{user?.email || 'admin@subiscentia.com'}</span>
                </div>
              </div>
            </div>
          </div>
          <main className="flex-1 p-10">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
