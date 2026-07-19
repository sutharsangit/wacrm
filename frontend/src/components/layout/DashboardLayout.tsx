'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore';
import { 
  LayoutDashboard, 
  Users, 
  Kanban, 
  BarChart3, 
  MessageSquare, 
  CreditCard, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  ChevronDown,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: number;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, theme, setTheme } = useAuthStore();
  const { chats, setActiveChatId } = useChatStore();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Count total unread chats
  const unreadChatsCount = chats.reduce((acc, chat) => acc + chat.unreadCount, 0);

  const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Leads', href: '/leads', icon: Users },
    { name: 'CRM Pipeline', href: '/crm', icon: Kanban },
    { name: 'WhatsApp CRM', href: '/whatsapp', icon: MessageCircle, badge: unreadChatsCount > 0 ? unreadChatsCount : undefined },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Billing', href: '/billing', icon: CreditCard },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border sticky top-0 h-screen z-20">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="tracking-tight text-white dark:text-white text-gradient-green">
              WA<span className="text-primary font-extrabold">CRM</span>
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-secondary text-primary border-l-2 border-primary" 
                    : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn(
                    "w-4 h-4 transition-colors", 
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-primary text-primary-foreground rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border space-y-3 bg-secondary/20">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate leading-tight">{user?.name || 'Administrator'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.businessName || 'My Business'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors font-medium text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={cn(
        "fixed top-0 bottom-0 left-0 w-64 bg-card border-r border-border z-40 md:hidden flex flex-col transition-transform duration-300 transform",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="tracking-tight text-gradient-green font-bold">WACRM</span>
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive 
                    ? "bg-secondary text-primary border-l-2 border-primary" 
                    : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground")} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-primary text-primary-foreground rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-3 bg-secondary/20">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate leading-tight">{user?.name || 'Administrator'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.businessName || 'My Business'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors font-medium text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Topbar */}
        <header className="h-16 border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-muted-foreground hover:text-foreground md:hidden rounded-lg hover:bg-secondary"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold tracking-tight capitalize">
              {navItems.find(n => pathname.startsWith(n.href))?.name || 'Portal'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-full transition-colors relative"
              title="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? (
                <span className="text-xs font-semibold px-2 py-0.5 border border-primary text-primary rounded bg-primary/10">DARK</span>
              ) : (
                <span className="text-xs font-semibold px-2 py-0.5 border border-amber-600 text-amber-600 rounded bg-amber-50">LIGHT</span>
              )}
            </button>

            {/* Notification Center */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-full transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {unreadChatsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-card" />
                )}
              </button>

              {notificationsOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setNotificationsOpen(false)} />
                  <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-2xl py-2 z-30 animate-fade-in">
                    <div className="px-4 py-2 border-b border-border flex items-center justify-between">
                      <span className="font-semibold text-sm">Notifications</span>
                      {unreadChatsCount > 0 && (
                        <span className="text-xs text-primary font-medium">{unreadChatsCount} unread chats</span>
                      )}
                    </div>
                    <div className="max-h-64 overflow-y-auto py-1">
                      {unreadChatsCount > 0 ? (
                        chats.filter(c => c.unreadCount > 0).map((chat) => (
                          <Link
                            key={chat.leadId}
                            href="/whatsapp"
                            onClick={() => {
                              setActiveChatId(chat.leadId);
                              setNotificationsOpen(false);
                            }}
                            className="flex flex-col gap-1 px-4 py-2 hover:bg-secondary/40 border-b border-border/50 last:border-b-0"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-xs text-foreground">{chat.leadName}</span>
                              <span className="text-[10px] text-muted-foreground">Just now</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground truncate">{chat.lastMessage}</p>
                          </Link>
                        ))
                      ) : (
                        <div className="py-6 text-center text-xs text-muted-foreground">
                          No new notifications
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 hover:bg-secondary/60 rounded-full transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-2xl py-1 z-30 animate-fade-in">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-xs font-semibold truncate">{user?.name || 'Admin User'}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{user?.email || 'admin@wa.com'}</p>
                    </div>
                    <Link 
                      href="/settings" 
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span>Settings</span>
                    </Link>
                    <button 
                      onClick={() => {
                        setProfileOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-destructive hover:bg-destructive/10 text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Layout Body Content */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
