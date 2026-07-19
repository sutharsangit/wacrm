'use client';

import React, { useState } from 'react';
import { mockUsageMetrics } from '@/mock/mockAnalytics';
import { 
  Check, 
  CreditCard, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  CheckCircle,
  HelpCircle,
  Loader2,
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BillingPage() {
  const [billingDetails, setBillingDetails] = useState(mockUsageMetrics);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState<{ name: string; price: number } | null>(null);
  
  // Checkout Form State
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [cardForm, setCardForm] = useState({ number: '', expiry: '', cvc: '' });

  const plans = [
    { name: 'Starter', price: 49, limit: '500 Leads /mo', messages: '2,000 messages', features: ['1 CRM pipeline', '2 seats access', 'Basic AI reply template'] },
    { name: 'Professional', price: 129, limit: '2,500 Leads /mo', messages: '10,000 messages', features: ['Unlimited pipeline boards', 'Multi-number broadcasts', 'Advanced qualification AI engine', 'API sync webhooks', 'Priority SLA support'] },
    { name: 'Enterprise', price: 399, limit: 'Unlimited Leads /mo', messages: 'Unlimited messages', features: ['Custom AI Model training', 'Dedicated account sync', '99.9% Uptime agreement', 'Custom data endpoints', 'Onsite team training'] }
  ];

  const handleOpenCheckout = (planName: string, price: number) => {
    setSelectedUpgradePlan({ name: planName, price });
    setShowCheckout(true);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUpgradePlan) return;

    setLoadingCheckout(true);
    setTimeout(() => {
      setLoadingCheckout(false);
      setShowCheckout(false);
      
      // Update billing state
      setBillingDetails({
        ...billingDetails,
        activePlan: selectedUpgradePlan.name,
        subscriptionPrice: selectedUpgradePlan.price,
        monthlyLeadsLimit: selectedUpgradePlan.name === 'Starter' ? 500 : selectedUpgradePlan.name === 'Professional' ? 2500 : 999999,
        whatsAppMessagesLimit: selectedUpgradePlan.name === 'Starter' ? 2000 : selectedUpgradePlan.name === 'Professional' ? 10000 : 999999,
      });

      setCardForm({ number: '', expiry: '', cvc: '' });
      alert(`Successfully upgraded to the ${selectedUpgradePlan.name} plan!`);
    }, 1500);
  };

  // Percent calculation
  const leadPercent = Math.min(100, Math.round((billingDetails.monthlyLeadsUsed / billingDetails.monthlyLeadsLimit) * 100));
  const msgPercent = Math.min(100, Math.round((billingDetails.whatsAppMessagesUsed / billingDetails.whatsAppMessagesLimit) * 100));

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="border-b border-border pb-6">
        <h2 className="text-xl font-bold tracking-tight md:text-2xl">Billing & Subscriptions</h2>
        <p className="text-xs text-muted-foreground">Manage your subscription, monitor usage quotas, and upgrade plans.</p>
      </div>

      {/* Usage Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active plan summary */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Current active Plan</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-white">{billingDetails.activePlan} Plan</span>
              <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-[9px] font-bold">ACTIVE</span>
            </div>
            <p className="text-xs text-zinc-400">Next invoice amount is **${billingDetails.subscriptionPrice}/mo** due on {billingDetails.billingCycleEnd}.</p>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-secondary/30 rounded border border-border/40 text-[10px] text-zinc-400">
            <CreditCard className="w-4 h-4 text-primary shrink-0" />
            <span>Card on file: VISA ending in **4242**</span>
          </div>
        </div>

        {/* Lead Quota processed */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Leads Processed</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-white">{billingDetails.monthlyLeadsUsed}</span>
                <span className="text-xs text-zinc-500">/ {billingDetails.monthlyLeadsLimit === 999999 ? 'Unlimited' : billingDetails.monthlyLeadsLimit}</span>
              </div>
            </div>
            <span className="text-xs font-bold text-primary">{leadPercent}%</span>
          </div>

          <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-border/40">
            <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${leadPercent}%` }} />
          </div>
          <span className="text-[10px] text-zinc-500 block leading-tight">Resetting in 24 days. Additional leads are billed at ${billingDetails.costPerAdditionalLead} each.</span>
        </div>

        {/* WhatsApp Quota processed */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">WhatsApp API Messages</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-white">{billingDetails.whatsAppMessagesUsed}</span>
                <span className="text-xs text-zinc-500">/ {billingDetails.whatsAppMessagesLimit === 999999 ? 'Unlimited' : billingDetails.whatsAppMessagesLimit}</span>
              </div>
            </div>
            <span className="text-xs font-bold text-primary">{msgPercent}%</span>
          </div>

          <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-border/40">
            <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${msgPercent}%` }} />
          </div>
          <span className="text-[10px] text-zinc-500 block leading-tight">Broadcasts and AI chat streams share credit. Meta Business rates may apply.</span>
        </div>
      </div>

      {/* Plans comparison cards */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold block">Comparison & Upgrade paths</span>
          <span className="text-[10px] text-muted-foreground">Select a pricing plan matching your inbound ad scale.</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => {
            const isCurrent = billingDetails.activePlan === p.name;
            return (
              <div 
                key={p.name} 
                className={cn(
                  "border rounded-xl p-6 bg-card flex flex-col justify-between space-y-6 transition-all",
                  isCurrent ? 'border-primary ring-2 ring-primary/10' : 'border-border hover:border-zinc-700'
                )}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-sm text-white block">{p.name}</span>
                      <span className="text-2xl font-extrabold text-white mt-1 block">${p.price}<span className="text-xs text-zinc-500 font-normal">/mo</span></span>
                    </div>
                    {isCurrent && (
                      <span className="px-2.5 py-0.5 bg-primary text-black font-extrabold rounded-full text-[9px] uppercase">
                        Current plan
                      </span>
                    )}
                  </div>

                  <div className="border-t border-border/50 pt-4 space-y-2">
                    <span className="text-[10px] text-zinc-400 block font-semibold uppercase">Quota limits</span>
                    <span className="text-xs font-bold text-zinc-200 block">{p.limit}</span>
                    <span className="text-xs text-zinc-400 block mt-0.5">{p.messages} API credits</span>
                  </div>

                  <div className="border-t border-border/50 pt-4 space-y-2.5">
                    <span className="text-[10px] text-zinc-400 block font-semibold uppercase">Features included</span>
                    <ul className="space-y-2 text-xs text-zinc-400">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {!isCurrent ? (
                  <button
                    onClick={() => handleOpenCheckout(p.name, p.price)}
                    className="w-full bg-secondary hover:bg-secondary/80 text-white font-semibold text-xs py-2 rounded-lg transition-colors border border-border"
                  >
                    Upgrade to {p.name}
                  </button>
                ) : (
                  <button 
                    disabled 
                    className="w-full bg-zinc-900 border border-zinc-800 text-zinc-600 font-semibold text-xs py-2 rounded-lg cursor-not-allowed"
                  >
                    Your Active Plan
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Checkout Modal popup overlay */}
      {showCheckout && selectedUpgradePlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 max-w-sm w-full relative animate-fade-in space-y-4">
            <div>
              <h3 className="text-sm font-bold flex items-center gap-1.5 text-white">
                <Lock className="w-4 h-4 text-primary" />
                <span>Secure Checkout Simulator</span>
              </h3>
              <p className="text-xs text-muted-foreground mt-1">Upgrading workspace to the **{selectedUpgradePlan.name} Plan**.</p>
            </div>

            <div className="bg-zinc-900/60 p-3 rounded-lg border border-border/40 text-xs flex justify-between font-semibold">
              <span className="text-zinc-400">Monthly Plan Charge</span>
              <span className="text-white">${selectedUpgradePlan.price}.00 / mo</span>
            </div>

            <form onSubmit={handlePay} className="space-y-3.5">
              <div>
                <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-1">Card Number</label>
                <input 
                  type="text" 
                  required
                  placeholder="4242 4242 4242 4242"
                  value={cardForm.number}
                  onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-1">Expiry Date</label>
                  <input 
                    type="text" 
                    required
                    placeholder="MM/YY"
                    value={cardForm.expiry}
                    onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-1">CVC Code</label>
                  <input 
                    type="text" 
                    required
                    placeholder="123"
                    value={cardForm.cvc}
                    onChange={(e) => setCardForm({ ...cardForm, cvc: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="px-4 py-2 border border-zinc-800 text-xs font-semibold rounded text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loadingCheckout}
                  className="px-4 py-2 bg-primary text-black font-semibold rounded text-xs hover:bg-primary/90 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {loadingCheckout && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Confirm Mock Payment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
