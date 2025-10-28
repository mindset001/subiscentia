import React from 'react';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Receipt, User, LineChart, Mail, Bell } from 'lucide-react';
import Image from 'next/image';
import Logo from '../../../public/images/logo.png';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  // For server components, usePathname from next/navigation
  // const pathname = usePathname();
  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { href: '/admin/products', label: 'Products', icon: <Package size={20} /> },
    { href: '/admin/orders', label: 'Orders', icon: <Receipt size={20} /> },
    { href: '/admin/customers', label: 'Customers', icon: <User size={20} /> },
    { href: '/admin/analytics', label: 'Analytics', icon: <LineChart size={20} /> },
    { href: '/admin/newsletter', label: 'Newsletter', icon: <Mail size={20} /> },
  ];
  return (
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
              className={`flex items-center gap-2 px-3 py-2 rounded font-medium transition-colors duration-150
                ${pathname === link.href ? 'bg-[#4C406E] text-white' : 'text-[#4C406E] hover:text-purple-700'}`}
            >
              {link.icon} {link.label}
            </a>
          ))}
        </nav>
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
              <Image
                src="/images/admin-avatar.jpg"
                alt="Adam"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-medium text-gray-900 text-sm">Adam</span>
                <span className="text-xs text-gray-500">adam.lukat@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        <main className="flex-1 p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
