'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useAuthStore } from '@/store/useAuthStore';
import {
  Building2,
  Layers,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Link2,
  Lock,
  Loader2,
  FileSpreadsheet
} from 'lucide-react';

type Step = 1 | 2 | 3 | 4;

export default function OnboardingWizard() {
  const router = useRouter();
  const { user, updateOnboardingStatus, updateCompanyDetails } = useAuthStore();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);

  // Form states
  const [companyForm, setCompanyForm] = useState({
    businessName: user?.businessName || '',
    size: '1-10',
    website: ''
  });

  const [connectedSources, setConnectedSources] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>('Professional');

  // Lead sources
  const leadSources = [
    { id: 'meta', name: 'Meta Ads Manager', description: 'Connect Facebook & Instagram lead forms.', type: 'action' },
    { id: 'google', name: 'Google Lead Extensions', description: 'Sync search & local campaign leads.', type: 'action' },
    { id: 'web', name: 'Custom Website Forms', description: 'Generate HTML or API submission webhooks.', type: 'action' },
    { id: 'csv', name: 'CSV File Upload', description: 'Directly parse list spreadsheets.', type: 'soon' }
  ];

  // Subscription plans
  const subscriptionPlans = [
    { id: 'Starter', name: 'Starter', price: '₹4,999', limit: '500 leads /mo' },
    { id: 'Professional', name: 'Professional', price: '₹12,999', limit: '2,500 leads /mo' },
    { id: 'Enterprise', name: 'Enterprise', price: '₹39,999', limit: 'Unlimited leads' }
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      updateCompanyDetails({ businessName: companyForm.businessName });
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setLoading(true);
      const priceMap: Record<string, number> = {
        'Starter': 499900,
        'Professional': 1299900,
        'Enterprise': 3999900
      };

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_xyz', // Assuming user provides this
        amount: priceMap[selectedPlan].toString(), // Dynamic amount based on plan (in paise)
        currency: "INR",
        name: "Green Pilot",
        description: `${selectedPlan} Plan Subscription`,
        handler: function (response: any) {
          // Success
          setLoading(false);
          setCurrentStep(4);

          // Optionally notify backend here about payment success
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#22c55e"
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      try {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        // Setup listener for modal close to stop loading
        rzp.on('payment.failed', function () {
          setLoading(false);
        });
      } catch (err) {
        console.error("Razorpay SDK not loaded", err);
        setLoading(false);
        alert("Payment gateway could not be loaded. Please check your connection and try again.");
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleFinish = () => {
    updateOnboardingStatus(true);
    router.push('/dashboard');
  };

  const handleToggleSource = (sourceId: string) => {
    if (connectedSources.includes(sourceId)) {
      setConnectedSources(connectedSources.filter(id => id !== sourceId));
    } else {
      setConnectedSources([...connectedSources, sourceId]);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      {/* Brand Header */}
      <div className="max-w-md mx-auto w-full flex items-center justify-center gap-2 font-bold text-xl mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-foreground" />
        </div>
        <span className="">Green<span className="text-primary">Pilot</span></span>
      </div>

      {/* Main Container */}
      <div className="max-w-xl mx-auto w-full bg-card border border-border rounded-2xl p-8 shadow-2xl relative">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 border-b border-border pb-5">
          {[
            { step: 1, label: 'Company', icon: Building2 },
            { step: 2, label: 'Sources', icon: Link2 },
            { step: 3, label: 'Plan', icon: CreditCard },
            { step: 4, label: 'Done', icon: CheckCircle },
          ].map((item) => {
            const isCompleted = currentStep > item.step;
            const isActive = currentStep === item.step;
            return (
              <div key={item.step} className="flex flex-col items-center gap-1.5 flex-1 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${isCompleted
                  ? 'bg-primary border-primary text-black font-bold'
                  : isActive
                    ? 'border-primary text-primary bg-primary/5 font-bold shadow-lg shadow-primary/10'
                    : 'border-border text-muted-foreground'
                  }`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-semibold tracking-wider uppercase ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* STEP 1: Company Details */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h2 className="text-lg font-bold">Tell us about your company</h2>
              <p className="text-xs text-muted-foreground">Configure your initial CRM profile workspace settings.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block mb-1">Business Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Realty"
                  value={companyForm.businessName}
                  onChange={(e) => setCompanyForm({ ...companyForm, businessName: e.target.value })}
                  className="w-full bg-muted border border-border rounded-lg px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block mb-1">Company Size</label>
                <select
                  value={companyForm.size}
                  onChange={(e) => setCompanyForm({ ...companyForm, size: e.target.value })}
                  className="w-full bg-muted border border-border rounded-lg px-3.5 py-2.5 text-xs text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="1-10">1 - 10 employees</option>
                  <option value="11-50">11 - 50 employees</option>
                  <option value="51-200">51 - 200 employees</option>
                  <option value="200+">200+ employees</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block mb-1">Company Website</label>
                <input
                  type="url"
                  placeholder="e.g. https://apexrealty.com"
                  value={companyForm.website}
                  onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })}
                  className="w-full bg-muted border border-border rounded-lg px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Lead Sources */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h2 className="text-lg font-bold">Connect your lead channels</h2>
              <p className="text-xs text-muted-foreground">Select where your customer inquiries originate from.</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {leadSources.map((source) => {
                const isConnected = connectedSources.includes(source.id);
                const isComingSoon = source.type === 'soon';
                return (
                  <div
                    key={source.id}
                    className={`border rounded-xl p-4 flex items-center justify-between transition-colors ${isConnected
                      ? 'border-primary/50 bg-primary/5'
                      : 'border-border bg-muted/30'
                      }`}
                  >
                    <div>
                      <span className="font-bold text-xs block">{source.name}</span>
                      <span className="text-[10px] text-muted-foreground block mt-0.5">{source.description}</span>
                    </div>

                    {isComingSoon ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-muted-foreground bg-muted border border-border px-2 py-1 rounded">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Coming Soon</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleToggleSource(source.id)}
                        className={`text-[10px] font-bold px-3 py-1.5 rounded transition-colors ${isConnected
                          ? 'bg-muted text-primary border border-primary/30 hover:bg-muted/80'
                          : 'bg-primary hover:bg-primary/95 text-black'
                          }`}
                      >
                        {isConnected ? 'Disconnect' : 'Connect'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Subscriptions */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h2 className="text-lg font-bold">Choose your pricing plan</h2>
              <p className="text-xs text-muted-foreground">Start with a 14-day free trial. Downgrade or upgrade at any time.</p>
            </div>

            {loading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <span className="text-xs text-muted-foreground font-medium">Provisioning secure WhatsApp gateway...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {subscriptionPlans.map((plan) => {
                  const isSelected = selectedPlan === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${isSelected
                        ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5'
                        : 'border-border bg-muted/30 hover:border-zinc-700'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-primary text-primary' : 'border-zinc-500'
                          }`}>
                          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                        <div>
                          <span className="font-bold text-xs block">{plan.name}</span>
                          <span className="text-[10px] text-muted-foreground block mt-0.5">{plan.limit}</span>
                        </div>
                      </div>
                      <span className="font-bold text-sm">{plan.price}<span className="text-[9px] text-muted-foreground font-normal">/mo</span></span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* STEP 4: Setup Finished */}
        {currentStep === 4 && (
          <div className="text-center py-6 animate-fade-in space-y-4">
            <CheckCircle className="w-14 h-14 text-primary mx-auto" />

            <div>
              <h2 className="text-xl font-bold">Workspace setup complete!</h2>
              <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto leading-relaxed">
                Welcome to Green Pilot, **{companyForm.businessName || 'Apex Properties'}**. Your AI qualification workflow and CRM pipeline are ready for leads.
              </p>
            </div>

            <div className="border border-border rounded-xl p-4 bg-muted/20 text-left max-w-sm mx-auto space-y-2">
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Connected sources</span>
              <div className="flex gap-2 flex-wrap">
                {connectedSources.length > 0 ? (
                  connectedSources.map(id => (
                    <span key={id} className="text-[9px] bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 rounded font-bold uppercase">
                      {id === 'meta' ? 'Meta Ads' : id === 'google' ? 'Google' : 'Web Forms'}
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] text-muted-foreground">None connected (Manual Add only)</span>
                )}
              </div>
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block pt-1">Provisioned Plan</span>
              <span className="text-xs font-semibold text-foreground block">{selectedPlan} Tier ($0 due now)</span>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
          {currentStep > 1 && currentStep < 4 ? (
            <button
              onClick={handleBack}
              disabled={loading}
              className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              disabled={companyForm.businessName.length < 2 || loading}
              className="bg-primary hover:bg-primary/95 text-black disabled:opacity-50 text-xs font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-primary/10 ml-auto"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="bg-primary hover:bg-primary/95 text-black text-xs font-bold px-8 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/10 w-full"
            >
              <span>Launch Dashboard Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* <div className="text-center text-[10px] text-muted-foreground">
        Secured mock onboarding tunnel. No actual subscription charges will apply.
      </div> */}
    </div>
  );
}



