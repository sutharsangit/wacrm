'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  User, 
  Building2, 
  Link2, 
  Bell, 
  Paintbrush, 
  CheckCircle,
  Save,
  Lock,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'profile' | 'company' | 'integrations' | 'notifications' | 'theme';

export default function SettingsPage() {
  const { user, updateCompanyDetails, theme, setTheme } = useAuthStore();
  const [activeSubTab, setActiveSubTab] = useState<Tab>('profile');
  const [loadingSave, setLoadingSave] = useState(false);

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Sutharsan',
    email: user?.email || 'admin@whatsappcrm.com',
    password: ''
  });

  const [companyForm, setCompanyForm] = useState({
    businessName: user?.businessName || 'Apex Properties',
    industry: user?.industry || 'Real Estate',
    size: '11-50',
    timezone: '(GMT+05:30) India Standard Time'
  });

  const [connectedState, setConnectedState] = useState({
    meta: true,
    google: false,
    web: true
  });

  const [notificationsState, setNotificationsState] = useState({
    emailAll: true,
    emailWeekly: false,
    waNewLead: true,
    waScoreHot: true,
    browserPush: false
  });



  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSave(true);
    setTimeout(() => {
      setLoadingSave(false);
      
      // Update global store
      updateCompanyDetails({
        name: profileForm.name,
        email: profileForm.email,
        businessName: companyForm.businessName,
        industry: companyForm.industry
      });



      alert('Workspace settings updated successfully!');
    }, 1000);
  };

  const handleToggleIntegration = (key: 'meta' | 'google' | 'web') => {
    setConnectedState({
      ...connectedState,
      [key]: !connectedState[key]
    });
  };

  const subTabs = [
    { id: 'profile' as Tab, label: 'My Profile', icon: User },
    { id: 'company' as Tab, label: 'Company Workspace', icon: Building2 },
    { id: 'integrations' as Tab, label: 'Lead Integrations', icon: Link2 },
    { id: 'notifications' as Tab, label: 'Notification Settings', icon: Bell },
    { id: 'theme' as Tab, label: 'Portal Theme', icon: Paintbrush },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="border-b border-border pb-6">
        <h2 className="text-xl font-bold tracking-tight md:text-2xl">Console Settings</h2>
        <p className="text-xs text-muted-foreground">Adjust account configurations, notification alerts, and active connections.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-60 shrink-0 space-y-1 bg-secondary/10 p-2.5 rounded-xl border border-border/80 h-fit">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all",
                activeSubTab === tab.id 
                  ? "bg-primary text-black" 
                  : "text-zinc-400 hover:text-white hover:bg-secondary/40"
              )}
            >
              <tab.icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Configuration Body Content */}
        <div className="flex-1 bg-card border border-border rounded-xl p-6 shadow-xl">
          <form onSubmit={handleSaveSettings} className="space-y-6">
            
            {/* TAB 1: Profile Details */}
            {activeSubTab === 'profile' && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <h3 className="text-sm font-bold text-white">Profile Details</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Manage your user email identity and passwords.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-1">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-1">Business Email</label>
                    <input 
                      type="email" 
                      required
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-1">Change Password (Mock)</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={profileForm.password}
                      onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white focus:outline-none focus:border-primary"
                    />
                    <span className="text-[9px] text-zinc-500 block mt-1">Leave empty to keep current credential passwords active.</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Company Workspace */}
            {activeSubTab === 'company' && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <h3 className="text-sm font-bold text-white">Company Workspace</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Manage business demographics and general parameters.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-1">Business Name</label>
                    <input 
                      type="text" 
                      required
                      value={companyForm.businessName}
                      onChange={(e) => setCompanyForm({ ...companyForm, businessName: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-1">Primary Industry</label>
                    <input 
                      type="text" 
                      required
                      value={companyForm.industry}
                      onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-1">Company Size</label>
                    <select
                      value={companyForm.size}
                      onChange={(e) => setCompanyForm({ ...companyForm, size: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-zinc-300 focus:outline-none"
                    >
                      <option value="1-10">1-10 Employees</option>
                      <option value="11-50">11-50 Employees</option>
                      <option value="51-200">51-200 Employees</option>
                      <option value="200+">200+ Employees</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-1">Default Timezone</label>
                    <input 
                      type="text" 
                      disabled
                      value={companyForm.timezone}
                      className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded p-2 text-xs text-zinc-500 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Integrations */}
            {activeSubTab === 'integrations' && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <h3 className="text-sm font-bold text-white">Lead Source Integrations</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Toggle active APIs syncing inbound lead forms.</p>
                </div>

                <div className="space-y-3.5">
                  {/* Meta */}
                  <div className="border border-border p-4 rounded-xl flex items-center justify-between bg-zinc-900/10">
                    <div>
                      <span className="font-bold text-xs text-white block">Meta Ads Lead Sync</span>
                      <span className="text-[10px] text-zinc-500 block mt-0.5">Syncs Facebook & Instagram Instant Forms.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleIntegration('meta')}
                      className={cn(
                        "text-[10px] font-bold px-3 py-1.5 rounded transition-all",
                        connectedState.meta 
                          ? 'bg-zinc-900 text-primary border border-primary/20' 
                          : 'bg-primary text-black'
                      )}
                    >
                      {connectedState.meta ? 'Connected' : 'Connect API'}
                    </button>
                  </div>

                  {/* Google */}
                  <div className="border border-border p-4 rounded-xl flex items-center justify-between bg-zinc-900/10">
                    <div>
                      <span className="font-bold text-xs text-white block">Google Ads Lead Forms</span>
                      <span className="text-[10px] text-zinc-500 block mt-0.5">Capture search & maps extensions leads.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleIntegration('google')}
                      className={cn(
                        "text-[10px] font-bold px-3 py-1.5 rounded transition-all",
                        connectedState.google 
                          ? 'bg-zinc-900 text-primary border border-primary/20' 
                          : 'bg-primary text-black'
                      )}
                    >
                      {connectedState.google ? 'Connected' : 'Connect API'}
                    </button>
                  </div>

                  {/* Website Forms */}
                  <div className="border border-border p-4 rounded-xl flex items-center justify-between bg-zinc-900/10">
                    <div>
                      <span className="font-bold text-xs text-white block">Website Webhook Endpoint</span>
                      <span className="text-[10px] text-zinc-500 block mt-0.5">Receive form submits from custom domains.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleIntegration('web')}
                      className={cn(
                        "text-[10px] font-bold px-3 py-1.5 rounded transition-all",
                        connectedState.web 
                          ? 'bg-zinc-900 text-primary border border-primary/20' 
                          : 'bg-primary text-black'
                      )}
                    >
                      {connectedState.web ? 'Connected' : 'Connect API'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Notifications Toggles */}
            {activeSubTab === 'notifications' && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <h3 className="text-sm font-bold text-white">Notification Alert Preferences</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Define when team members are pinged about lead events.</p>
                </div>

                <div className="space-y-4 bg-zinc-900/20 p-4 rounded-xl border border-border/80">
                  {/* Email alerts */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-zinc-200 block">Instant Email alerts</span>
                      <span className="text-[10px] text-zinc-500 block mt-0.5">Send mail as soon as a lead completes triage.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotificationsState({ ...notificationsState, emailAll: !notificationsState.emailAll })}
                      className={cn(
                        "w-8 h-4 rounded-full relative transition-colors flex items-center p-0.5",
                        notificationsState.emailAll ? 'bg-primary' : 'bg-zinc-700'
                      )}
                    >
                      <div className={cn("w-3 h-3 rounded-full bg-white transition-transform", notificationsState.emailAll ? 'translate-x-4' : 'translate-x-0')} />
                    </button>
                  </div>

                  {/* WhatsApp new lead alert */}
                  <div className="flex items-center justify-between border-t border-border/40 pt-4">
                    <div>
                      <span className="text-xs font-bold text-zinc-200 block">WhatsApp New Lead Ping</span>
                      <span className="text-[10px] text-zinc-500 block mt-0.5">Ping account owner on WhatsApp when assigned a record.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotificationsState({ ...notificationsState, waNewLead: !notificationsState.waNewLead })}
                      className={cn(
                        "w-8 h-4 rounded-full relative transition-colors flex items-center p-0.5",
                        notificationsState.waNewLead ? 'bg-primary' : 'bg-zinc-700'
                      )}
                    >
                      <div className={cn("w-3 h-3 rounded-full bg-white transition-transform", notificationsState.waNewLead ? 'translate-x-4' : 'translate-x-0')} />
                    </button>
                  </div>

                  {/* Hot leads only */}
                  <div className="flex items-center justify-between border-t border-border/40 pt-4">
                    <div>
                      <span className="text-xs font-bold text-zinc-200 block">High AI Score alerts only</span>
                      <span className="text-[10px] text-zinc-500 block mt-0.5">Only trigger email/WhatsApp pings if AI score is {'>'} 80.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotificationsState({ ...notificationsState, waScoreHot: !notificationsState.waScoreHot })}
                      className={cn(
                        "w-8 h-4 rounded-full relative transition-colors flex items-center p-0.5",
                        notificationsState.waScoreHot ? 'bg-primary' : 'bg-zinc-700'
                      )}
                    >
                      <div className={cn("w-3 h-3 rounded-full bg-white transition-transform", notificationsState.waScoreHot ? 'translate-x-4' : 'translate-x-0')} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: Portal Theme customization */}
            {activeSubTab === 'theme' && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <h3 className="text-sm font-bold text-white">Portal Theme Customization</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Toggle light-theme overlay variables.</p>
                </div>

                <div className="flex gap-4">
                  {/* Dark box */}
                  <div 
                    onClick={() => setTheme('dark')}
                    className={cn(
                      "flex-1 border rounded-xl p-4 cursor-pointer text-center space-y-2 bg-black",
                      theme === 'dark' ? 'border-primary ring-2 ring-primary/10' : 'border-border'
                    )}
                  >
                    <span className="font-bold text-xs text-white block">Dark Slate</span>
                    <span className="text-[10px] text-zinc-500 block leading-tight">Default low-emission layout.</span>
                  </div>

                  {/* Light box */}
                  <div 
                    onClick={() => setTheme('light')}
                    className={cn(
                      "flex-1 border rounded-xl p-4 cursor-pointer text-center space-y-2 bg-white",
                      theme === 'light' ? 'border-amber-600 ring-2 ring-amber-600/10' : 'border-border'
                    )}
                  >
                    <span className="font-bold text-xs text-black block">Light Contrast</span>
                    <span className="text-[10px] text-zinc-500 block leading-tight">High-visibility workspace styling.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Save Buttons Panel */}
            <div className="flex justify-end pt-5 border-t border-border">
              <button
                type="submit"
                disabled={loadingSave}
                className="bg-primary hover:bg-primary/95 text-black disabled:opacity-50 text-xs font-bold px-6 py-2.5 rounded-lg flex items-center gap-1.5 shadow-lg shadow-primary/10 transition-colors"
              >
                {loadingSave ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Workspace Settings</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
