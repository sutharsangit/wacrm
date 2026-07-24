'use client';

import React, { useState } from 'react';
import Script from 'next/script';

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
  const defaultUsageMetrics = {
    activePlan: 'Starter',
    monthlyLeadsLimit: 500,
    monthlyLeadsUsed: 0,
    whatsAppMessagesLimit: 2000,
    whatsAppMessagesUsed: 0,
    billingCycleEnd: 'N/A',
    costPerAdditionalLead: 0.10,
    subscriptionPrice: 4999
  };

  const [billingDetails, setBillingDetails] = useState(defaultUsageMetrics);

  const plans = [
    { name: 'Starter', price: 4999, limit: '500 Leads /mo', messages: '2,000 messages', features: ['1 CRM pipeline', '2 seats access', 'Basic AI reply template'] },
    { name: 'Professional', price: 12999, limit: '2,500 Leads /mo', messages: '10,000 messages', features: ['Unlimited pipeline boards', 'Multi-number broadcasts', 'Advanced qualification AI engine', 'API sync webhooks', 'Priority SLA support'] },
    { name: 'Enterprise', price: 39999, limit: 'Unlimited Leads /mo', messages: 'Unlimited messages', features: ['Custom AI Model training', 'Dedicated account sync', '99.9% Uptime agreement', 'Custom data endpoints', 'Onsite team training'] }
  ];
  const handleOpenCheckout = (planName: string, price: number) => {
    const priceMap: Record<string, number> = {
      'Starter': 499900,
      'Professional': 1299900,
      'Enterprise': 3999900
    };

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_xyz',
      amount: priceMap[planName].toString(),
      currency: "INR",
      name: "Green Pilot",
      description: `Upgrade to ${planName} Plan`,
      handler: function (response: any) {
        // Update billing state on success
        setBillingDetails({
          ...billingDetails,
          activePlan: planName,
          subscriptionPrice: price,
          monthlyLeadsLimit: planName === 'Starter' ? 500 : planName === 'Professional' ? 2500 : 999999,
          whatsAppMessagesLimit: planName === 'Starter' ? 2000 : planName === 'Professional' ? 10000 : 999999,
        });
        alert(`Successfully upgraded to the ${planName} plan!`);
      },
      prefill: {
        name: "Admin User", // optionally fetch from auth store
        email: "admin@greenpilot.in",
      },
      theme: { color: "#22c55e" },
      modal: {
        ondismiss: function() {
          // Modal closed
        }
      }
    };

    try {
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay SDK not loaded", err);
      alert("Payment gateway could not be loaded. Please check your connection and try again.");
    }
  };

  // Percent calculation
  const leadPercent = Math.min(100, Math.round((billingDetails.monthlyLeadsUsed / billingDetails.monthlyLeadsLimit) * 100));
  const msgPercent = Math.min(100, Math.round((billingDetails.whatsAppMessagesUsed / billingDetails.whatsAppMessagesLimit) * 100));

  return (
    <div className="space-y-8 pb-12">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
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
              <span className="text-xl font-extrabold text-foreground">{billingDetails.activePlan} Plan</span>
              <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-[9px] font-bold">ACTIVE</span>
            </div>
            <p className="text-xs text-muted-foreground">Next invoice amount is **${billingDetails.subscriptionPrice}/mo** due on {billingDetails.billingCycleEnd}.</p>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-secondary/30 rounded border border-border/40 text-[10px] text-muted-foreground">
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
                <span className="text-2xl font-bold text-foreground">{billingDetails.monthlyLeadsUsed}</span>
                <span className="text-xs text-muted-foreground">/ {billingDetails.monthlyLeadsLimit === 999999 ? 'Unlimited' : billingDetails.monthlyLeadsLimit}</span>
              </div>
            </div>
            <span className="text-xs font-bold text-primary">{leadPercent}%</span>
          </div>

          <div className="w-full bg-muted h-2 rounded-full overflow-hidden border border-border/40">
            <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${leadPercent}%` }} />
          </div>
          <span className="text-[10px] text-muted-foreground block leading-tight">Resetting in 24 days. Additional leads are billed at ${billingDetails.costPerAdditionalLead} each.</span>
        </div>

        {/* WhatsApp Quota processed */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">WhatsApp API Messages</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-foreground">{billingDetails.whatsAppMessagesUsed}</span>
                <span className="text-xs text-muted-foreground">/ {billingDetails.whatsAppMessagesLimit === 999999 ? 'Unlimited' : billingDetails.whatsAppMessagesLimit}</span>
              </div>
            </div>
            <span className="text-xs font-bold text-primary">{msgPercent}%</span>
          </div>

          <div className="w-full bg-muted h-2 rounded-full overflow-hidden border border-border/40">
            <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${msgPercent}%` }} />
          </div>
          <span className="text-[10px] text-muted-foreground block leading-tight">Broadcasts and AI chat streams share credit. Meta Business rates may apply.</span>
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
                      <span className="font-bold text-sm text-foreground block">{p.name}</span>
                      <span className="text-2xl font-extrabold text-foreground mt-1 block">₹{p.price}<span className="text-xs text-muted-foreground font-normal">/mo</span></span>
                    </div>
                    {isCurrent && (
                      <span className="px-2.5 py-0.5 bg-primary text-black font-extrabold rounded-full text-[9px] uppercase">
                        Current plan
                      </span>
                    )}
                  </div>

                  <div className="border-t border-border/50 pt-4 space-y-2">
                    <span className="text-[10px] text-muted-foreground block font-semibold uppercase">Quota limits</span>
                    <span className="text-xs font-bold text-foreground block">{p.limit}</span>
                    <span className="text-xs text-muted-foreground block mt-0.5">{p.messages} API credits</span>
                  </div>

                  <div className="border-t border-border/50 pt-4 space-y-2.5">
                    <span className="text-[10px] text-muted-foreground block font-semibold uppercase">Features included</span>
                    <ul className="space-y-2 text-xs text-muted-foreground">
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
                    className="w-full bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs py-2 rounded-lg transition-colors border border-border"
                  >
                    Upgrade to {p.name}
                  </button>
                ) : (
                  <button 
                    disabled 
                    className="w-full bg-muted border border-border text-muted-foreground font-semibold text-xs py-2 rounded-lg cursor-not-allowed"
                  >
                    Your Active Plan
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>


    </div>
  );
}


