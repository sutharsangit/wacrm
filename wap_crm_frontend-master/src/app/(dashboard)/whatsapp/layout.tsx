'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Link2,
  MessageSquare,
  Megaphone,
  Sparkles,
  FileText,
  Users,
  TrendingUp,
  Settings
} from 'lucide-react';

interface SubNavItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
}

export default function WhatsAppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const subNavItems: SubNavItem[] = [
    { name: 'Overview', href: '/whatsapp/overview', icon: LayoutDashboard },
    { name: 'Connect Number', href: '/whatsapp/connect', icon: Link2 },
    { name: 'Inbox', href: '/whatsapp/inbox', icon: MessageSquare },
    { name: 'Broadcast', href: '/whatsapp/broadcast', icon: Megaphone },
    { name: 'AI Qualification', href: '/whatsapp/qualification', icon: Sparkles },
    { name: 'Templates', href: '/whatsapp/templates', icon: FileText },
    { name: 'Contacts', href: '/whatsapp/contacts', icon: Users },
    { name: 'Campaigns', href: '/whatsapp/campaigns', icon: TrendingUp },
    { name: 'Settings', href: '/whatsapp/settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 min-h-[calc(100vh-140px)]">
      {/* WhatsApp Sub Sidebar */}
      <aside className="w-full md:w-56 shrink-0 bg-card border border-border rounded-2xl p-4 flex flex-col gap-1">
        <div className="px-3 py-2 mb-2">
          <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">WhatsApp Module</p>
        </div>
        <nav className="space-y-1 flex-1">
          {subNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/whatsapp/overview' && pathname === '/whatsapp');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group",
                  isActive
                    ? "bg-primary text-black font-extrabold shadow-lg shadow-primary/15"
                    : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                )}
              >
                <item.icon className={cn(
                  "w-4 h-4 transition-colors",
                  isActive ? "text-black" : "text-muted-foreground group-hover:text-foreground"
                )} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Content Area */}
      <div className="flex-1 min-w-0 bg-card border border-border rounded-2xl p-6 shadow-2xl relative">
        {children}
      </div>
    </div>
  );
}
