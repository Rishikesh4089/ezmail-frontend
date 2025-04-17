'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import ComposeDrawer from '@/components/ComposeDrawer/ComposeDrawer';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [showCompose, setShowCompose] = useState(false); // <-- added

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.replace('/auth');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-600 text-sm">Loading dashboard...</p>
      </div>
    );
  }

  const navItems = [
    { name: 'Sent Mails', href: '/dashboard/sent' },
    { name: 'Analytics', href: '/dashboard/analytics' },
    { name: 'Settings', href: '/dashboard/settings' },
  ];

  const activePath = pathname.split('/').pop();

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 p-4 flex flex-col justify-between">
          <div>
          <Link href="/dashboard">
            <h1 className="text-lg font-bold mb-6 cursor-pointer hover:text-blue-600 transition">
              EzMail
            </h1>
          </Link>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded ${
                    pathname === item.href ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* User Summary */}
          <div className="text-sm">
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
            <div className="mt-2 text-xs text-gray-500">
              Free Plan — 12/50 mails
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          <header className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold capitalize">
              {activePath || 'Dashboard'}
            </h2>
            <button
              onClick={() => setShowCompose(true)}
              className="bg-black text-white px-4 py-2 rounded text-sm hover:opacity-90"
            >
              + New Mail
            </button>
          </header>
          {children}
        </main>
      </div>

      {/* Compose Drawer Modal */}
      <ComposeDrawer isOpen={showCompose} onClose={() => setShowCompose(false)} />
    </>
  );
}
