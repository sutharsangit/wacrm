'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Key, 
  Globe, 
  Bell, 
  RefreshCw, 
  Copy, 
  Check, 
  Save, 
  ShieldAlert,
  Info
} from 'lucide-react';

export default function WhatsAppSettings() {
  const [businessName, setBusinessName] = useState('Green Pilot AI Solutions');
  const [connectedNumber, setConnectedNumber] = useState('+1 555-019-2834');
  const [timezone, setTimezone] = useState('GMT-5 (EST)');
  const [language, setLanguage] = useState('English (US)');

  // Webhook
  const [webhookUrl, setWebhookUrl] = useState('https://api.greenpilot.ai/api/v1/webhooks/whatsapp');
  const [webhookVerifyToken, setWebhookVerifyToken] = useState('gp_token_9f821a8d01b');
  const [webhookActive, setWebhookActive] = useState(true);

  // Security Token
  const [apiToken, setApiToken] = useState('gp_live_8f0a2d4c7b89e01d2a3f4e5c6b7a8d9e');
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Notifications
  const [notifyHotLead, setNotifyHotLead] = useState(true);
  const [notifyFailedBroadcast, setNotifyFailedBroadcast] = useState(true);
  const [notifyClientMessage, setNotifyClientMessage] = useState(false);

  const handleCopyToken = () => {
    navigator.clipboard.writeText(apiToken);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleGenerateToken = () => {
    if (window.confirm('Generating a new API token will invalidate the current one. Do you want to proceed?')) {
      setIsGenerating(true);
      setTimeout(() => {
        const randHex = Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join('');
        setApiToken(`gp_live_${randHex}`);
        setIsGenerating(false);
        alert('New API token generated successfully!');
      }, 1000);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    alert('WhatsApp module settings updated successfully!');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          <span>WhatsApp Module Settings</span>
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Configure business metadata, API integration tokens, and real-time webhook listeners.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Profile Card */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">Business Profile</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">WhatsApp Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Connected Number</label>
              <input
                type="text"
                disabled
                value={connectedNumber}
                className="w-full bg-muted/60 border border-border rounded-lg px-3 py-2 text-muted-foreground font-mono cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-muted-foreground focus:outline-none focus:border-primary"
              >
                <option value="GMT-5 (EST)">GMT-5 (EST)</option>
                <option value="GMT+5:30 (IST)">GMT+5:30 (IST)</option>
                <option value="GMT+0 (UTC)">GMT+0 (UTC)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-muted-foreground focus:outline-none focus:border-primary"
              >
                <option value="English (US)">English (US)</option>
                <option value="English (UK)">English (UK)</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
          </div>
        </div>

        {/* Webhooks Config Card */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Inbound Webhook Config</h3>
            
            {/* Toggle status */}
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold ${webhookActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {webhookActive ? 'Active' : 'Disabled'}
              </span>
              <button
                type="button"
                onClick={() => setWebhookActive(!webhookActive)}
                className={`w-8 h-4 rounded-full relative transition-colors flex items-center p-0.5 ${
                  webhookActive ? 'bg-primary' : 'bg-zinc-600'
                }`}
              >
                <div className={`w-3 h-3 rounded-full bg-white transition-transform shadow ${
                  webhookActive ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Webhook URL Endpoint</label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-foreground font-mono focus:outline-none focus:border-primary"
              />
              <span className="text-[9px] text-muted-foreground mt-1 block flex items-center gap-1">
                <Info className="w-3 h-3 text-primary" />
                <span>Meta API will post incoming WhatsApp message events to this listener.</span>
              </span>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Verify Token</label>
              <input
                type="text"
                value={webhookVerifyToken}
                onChange={(e) => setWebhookVerifyToken(e.target.value)}
                className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-foreground font-mono focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* API Tokens Card */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2 flex items-center gap-1.5">
            <Key className="w-4 h-4 text-primary" />
            <span>Developer API Tokens</span>
          </h3>

          <div className="space-y-3 text-xs">
            <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-0.5">Live CRM Integration Token</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={apiToken}
                className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-foreground font-mono focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopyToken}
                className="bg-secondary hover:bg-secondary/80 border border-border px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 text-foreground"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={handleGenerateToken}
                disabled={isGenerating}
                className="bg-secondary hover:bg-secondary/80 border border-border px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 text-destructive"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>Rotate</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2 flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-primary" />
            <span>Notification Settings</span>
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-2.5 font-semibold text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={notifyHotLead}
                onChange={(e) => setNotifyHotLead(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary w-4 h-4 bg-muted"
              />
              <span>Trigger instant dashboard notification when AI qualifies a Hot lead</span>
            </label>
            <label className="flex items-center gap-2.5 font-semibold text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={notifyFailedBroadcast}
                onChange={(e) => setNotifyFailedBroadcast(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary w-4 h-4 bg-muted"
              />
              <span>Send email alert on campaign broadcast failures</span>
            </label>
            <label className="flex items-center gap-2.5 font-semibold text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={notifyClientMessage}
                onChange={(e) => setNotifyClientMessage(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary w-4 h-4 bg-muted"
              />
              <span>Play browser sound when an agent thread receives a client message</span>
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-primary hover:bg-primary/95 text-black font-bold px-6 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-lg shadow-primary/10 transition-colors"
          >
            <Save className="w-4 h-4 text-black" />
            <span>Save Settings</span>
          </button>
        </div>

      </form>
    </div>
  );
}
