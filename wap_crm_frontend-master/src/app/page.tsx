'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  MessageSquare,
  Zap,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Database,
  Calendar,
  Layers,
  Users2,
  X
} from 'lucide-react';

export default function LandingPage() {
  const [demoBooked, setDemoBooked] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', email: '', date: '' });

  const handleBookDemo = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoBooked(true);
    setTimeout(() => {
      setShowDemoModal(false);
      setDemoBooked(false);
      setDemoForm({ name: '', email: '', date: '' });
      alert('Mock Demo Booked! We will contact you shortly.');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-foreground">
      {/* Header / Navbar */}
      <header className="border-b border-border/80 bg-background/80 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Green Pilot Logo" width={32} height={32} className="rounded-lg" />
            <span className="text-xl font-bold tracking-tight ">
              Green Pilot
            </span>
          </div>

          <nav className="hidden md:flex space-x-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#workflow" className="hover:text-foreground transition-colors">Workflow</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-primary hover:bg-primary/90 text-foreground text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-lg shadow-primary/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-muted via-background to-background">
        {/* Glow Element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-green-900/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Conversational Lead Qualification</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Qualify Leads Automatically. <br />
            <span className="">Close Deals via WhatsApp.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect Meta Ads, Google Ads, and Web forms. Our AI engages leads on WhatsApp instantly, qualifies them, and syncs directly into your pipeline.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-foreground font-medium px-8 py-3 rounded-lg flex items-center justify-center gap-2 group transition-all shadow-xl shadow-primary/20"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => setShowDemoModal(true)}
              className="w-full sm:w-auto border border-border hover:border-zinc-500 bg-muted/30 hover:bg-muted/60 text-foreground font-medium px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4 text-primary" />
              <span>Book a Demo</span>
            </button>
          </div>

          {/* SaaS Mockup Preview */}
          <div className="mt-16 border border-border rounded-2xl bg-card/60 p-2 max-w-5xl mx-auto shadow-2xl relative">
            {/* Top Bar Circles */}
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="text-[10px] text-muted-foreground font-mono ml-4 truncate">https://app.greenpilot.io/dashboard</div>
            </div>

            {/* Layout simulation grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-background/40 text-left">
              {/* Left pane stats */}
              <div className="border border-border/80 rounded-xl p-4 bg-muted/20 backdrop-blur">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold block">Total Active Leads</span>
                <span className="text-2xl font-bold text-foreground block mt-1">830</span>
                <span className="text-xs text-primary font-medium flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +24% this month
                </span>

                <div className="border-t border-border/80 my-4" />

                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold block">Qualified Rate</span>
                <span className="text-2xl font-bold text-primary block mt-1">50.6%</span>
                <div className="w-full bg-secondary h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '50.6%' }} />
                </div>
              </div>

              {/* Middle conversation tracker */}
              <div className="md:col-span-2 border border-border/80 rounded-xl p-4 bg-muted/20 backdrop-blur relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-border/80 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-semibold">Live AI Chat Stream</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">Active now</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex flex-col items-end">
                    <div className="bg-primary text-foreground p-2.5 rounded-2xl rounded-tr-none max-w-[85%]">
                      Are you looking to purchase commercial office space within the next 30 days?
                    </div>
                    <span className="text-[9px] text-muted-foreground mt-1">AI Copilot • 11:32 AM</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="bg-secondary/80 text-foreground p-2.5 rounded-2xl rounded-tl-none max-w-[85%]">
                      Yes, looking for a workspace downtown. Budget is around $80k downpayment.
                    </div>
                    <span className="text-[9px] text-muted-foreground mt-1">David Miller (Lead) • 11:33 AM</span>
                  </div>
                </div>

                {/* Score popover */}
                <div className="absolute right-4 bottom-4 bg-card border border-primary/50 text-primary text-[10px] px-2.5 py-1.5 rounded-full font-bold flex items-center gap-1 shadow-lg shadow-primary/20">
                  <Zap className="w-3.5 h-3.5 fill-primary" />
                  <span>AI Score: 85 (Hot)</span>
                </div>
              </div>

              {/* Right column Kanban shortcut */}
              <div className="border border-border/80 rounded-xl p-4 bg-muted/20 backdrop-blur space-y-3">
                <span className="text-xs font-semibold text-muted-foreground block border-b border-border/80 pb-1.5">Lead Funnel Stage</span>

                <div className="space-y-2">
                  <div className="bg-muted border border-border p-2 rounded-lg text-xs flex justify-between items-center opacity-40">
                    <span className="font-medium text-muted-foreground">New Lead</span>
                    <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">20%</span>
                  </div>
                  <div className="bg-primary/5 border border-primary/30 p-2 rounded-lg text-xs flex justify-between items-center relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-primary/10 w-[70%]" />
                    <span className="font-semibold text-primary z-10">Qualified</span>
                    <span className="text-[10px] bg-primary text-foreground px-1.5 py-0.5 rounded z-10 font-bold">85%</span>
                  </div>
                  <div className="bg-muted border border-border p-2 rounded-lg text-xs flex justify-between items-center opacity-40">
                    <span className="font-medium text-muted-foreground">Proposal</span>
                    <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-card border-t border-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Everything You Need to Scale Conversions</h2>
            <p className="mt-4 text-muted-foreground text-sm sm:text-base">
              Say goodbye to manual calls and spreadsheet chaos. Automate lead categorization using a dedicated, high-converting CRM workflow.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border border-border rounded-xl bg-muted/30 hover:border-primary/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 text-primary group-hover:bg-primary group-hover:text-foreground transition-colors">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">WhatsApp Team Inbox</h3>
              <p className="mt-2.5 text-muted-foreground text-sm leading-relaxed">
                Connect multiple agents to a single business number. Collaborate on chat threads, save custom templates, and sync history logs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border border-border rounded-xl bg-muted/30 hover:border-primary/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 text-primary group-hover:bg-primary group-hover:text-foreground transition-colors">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">AI Auto-Qualification</h3>
              <p className="mt-2.5 text-muted-foreground text-sm leading-relaxed">
                Instantly trigger pre-screening questions via WhatsApp when a new ad click or web contact is captured. Compute scores without delay.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border border-border rounded-xl bg-muted/30 hover:border-primary/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 text-primary group-hover:bg-primary group-hover:text-foreground transition-colors">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Kanban Pipeline</h3>
              <p className="mt-2.5 text-muted-foreground text-sm leading-relaxed">
                Drag-and-drop qualified contacts across different deal stages (New, Contacted, Qualified, Proposal, Won, Lost). Track deal health visually.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 border border-border rounded-xl bg-muted/30 hover:border-primary/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 text-primary group-hover:bg-primary group-hover:text-foreground transition-colors">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Ad Source Integrations</h3>
              <p className="mt-2.5 text-muted-foreground text-sm leading-relaxed">
                Seamlessly import lead information from Meta Ads Manager, Google Search Campaigns, website contact blocks, or custom CSV lists.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 border border-border rounded-xl bg-muted/30 hover:border-primary/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 text-primary group-hover:bg-primary group-hover:text-foreground transition-colors">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Analytics & Funnels</h3>
              <p className="mt-2.5 text-muted-foreground text-sm leading-relaxed">
                Monitor conversion velocity, source distribution counts, team response statistics, and subscription ROI graphs in one dashboard.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 border border-border rounded-xl bg-muted/30 hover:border-primary/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 text-primary group-hover:bg-primary group-hover:text-foreground transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Enterprise Security</h3>
              <p className="mt-2.5 text-muted-foreground text-sm leading-relaxed">
                Manage agent roles, configure automated office-hour toggles, and enforce secure communication guidelines across teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Diagram */}
      <section id="workflow" className="py-20 bg-background border-t border-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold sm:text-4xl ">The Qualification Engine in Action</h2>
            <p className="mt-4 text-muted-foreground text-sm sm:text-base">
              Here is how lead data routes from the initial click to closing the final contract.
            </p>
          </div>

          {/* Workflow Graphic Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
            {/* Arrow background connector for large screens */}
            <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-primary/10 via-primary to-primary/10 -translate-y-6 -z-10" />

            {/* Step 1 */}
            <div className="border border-border rounded-xl p-6 bg-muted/30 text-center relative">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-foreground text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">1</span>
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 text-primary">
                <Users2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">Lead Form Submitted</h4>
              <p className="text-xs text-muted-foreground mt-2">Lead submits form on Meta Ad, Google search page, or landing site.</p>
            </div>

            {/* Step 2 */}
            <div className="border border-border rounded-xl p-6 bg-muted/30 text-center relative">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-foreground text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">2</span>
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 text-primary">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">Instant WhatsApp Engaged</h4>
              <p className="text-xs text-muted-foreground mt-2">Within 15 seconds, our system triggers welcome & screen questions.</p>
            </div>

            {/* Step 3 */}
            <div className="border border-border rounded-xl p-6 bg-muted/30 text-center relative">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-foreground text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">3</span>
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 text-primary">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">AI Score Calculation</h4>
              <p className="text-xs text-muted-foreground mt-2">AI parses customer details, calculates scoring thresholds, and flags fit status.</p>
            </div>

            {/* Step 4 */}
            <div className="border border-border rounded-xl p-6 bg-muted/30 text-center relative">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-foreground text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">4</span>
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 text-primary">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">Owner Pipeline Auto-Sync</h4>
              <p className="text-xs text-muted-foreground mt-2">Qualified items are added to CRM pipeline, prompting agent for high-value follow-ups.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold sm:text-4xl">SaaS Pricing Plans</h2>
            <p className="mt-4 text-muted-foreground text-sm sm:text-base">
              No hidden fees. Select a plan built to grow with your business operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan 1 */}
            <div className="border border-border rounded-xl p-8 bg-muted/20 backdrop-blur flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Starter</span>
                <span className="text-3xl font-bold">₹4,999<span className="text-xs text-muted-foreground font-normal">/month</span></span>
                <p className="text-xs text-muted-foreground mt-2">Ideal for sole proprietorships starting automation.</p>
                <div className="border-t border-border my-6" />
                <ul className="space-y-3.5 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>Up to 500 leads /mo</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>Basic AI auto-reply template</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>1 CRM pipeline board</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>2 Team members access</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/register"
                className="mt-8 bg-muted border border-border hover:border-border text-foreground font-medium py-2 rounded-lg text-center text-xs transition-colors"
              >
                Choose Starter
              </Link>
            </div>

            {/* Plan 2 */}
            <div className="border-2 border-primary rounded-xl p-8 bg-muted/40 backdrop-blur flex flex-col justify-between relative shadow-2xl shadow-primary/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-foreground text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">Most Popular</span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">Professional</span>
                <span className="text-3xl font-bold">₹12,999<span className="text-xs text-muted-foreground font-normal">/month</span></span>
                <p className="text-xs text-muted-foreground mt-2">Perfect for growing sales departments needing rich CRM details.</p>
                <div className="border-t border-border my-6" />
                <ul className="space-y-3.5 text-xs text-muted-foreground font-medium">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>Up to 2,500 leads /mo</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>Enterprise-grade qualification AI agent</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>Multi-number broadcast campaigns</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>Unlimited team members</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>Zapier & Webhook endpoints sync</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/register"
                className="mt-8 bg-primary hover:bg-primary/95 text-foreground font-semibold py-2 rounded-lg text-center text-xs transition-colors shadow-lg shadow-primary/10"
              >
                Choose Professional
              </Link>
            </div>

            {/* Plan 3 */}
            <div className="border border-border rounded-xl p-8 bg-muted/20 backdrop-blur flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Enterprise</span>
                <span className="text-3xl font-bold">₹39,999<span className="text-xs text-muted-foreground font-normal">/month</span></span>
                <p className="text-xs text-muted-foreground mt-2">Tailored for large firms demanding high volumes and uptime SLA.</p>
                <div className="border-t border-border my-6" />
                <ul className="space-y-3.5 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>Unlimited leads & broadcasts</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>Custom model training integration</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>Dedicated account support director</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>Custom contract & security SLA agreements</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/register"
                className="mt-8 bg-muted border border-border hover:border-border text-foreground font-medium py-2 rounded-lg text-center text-xs transition-colors"
              >
                Choose Enterprise
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold sm:text-4xl ">Trusted by Leading Teams</h2>
            <p className="mt-4 text-muted-foreground text-sm sm:text-base">
              See how agencies and property developers reduce sales response latency using Green Pilot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-border rounded-xl p-6 bg-muted/20">
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                "Green Pilot has transformed our real estate lead workflow. Within seconds of clicking our Meta Ad, leads are answering questions on WhatsApp. By the time our agents call them, they already know the budget and timeline. Conversion rate skyrocketed by 35%!"
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs">MC</div>
                <div>
                  <h5 className="text-xs font-bold">Marcus Cole</h5>
                  <span className="text-[10px] text-muted-foreground">Director of Sales, Apex Realty</span>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-xl p-6 bg-muted/20">
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                "Our marketing agency deals with thousands of form sign-ups daily. Manual calling was impossible. Green Pilot handles the initial triage chat natively. Only qualified hot leads make it onto our CRM board, letting us stay highly focused."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs">SM</div>
                <div>
                  <h5 className="text-xs font-bold">Sandra Martinez</h5>
                  <span className="text-[10px] text-muted-foreground">Founder, ScaleMedia Agency</span>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-xl p-6 bg-muted/20">
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                "The multi-agent WhatsApp Inbox is a game changer. We connected our standard customer support line and now 4 agents can coordinate inboxes without sharing phone devices. Plus, the CRM Kanban view is incredibly simple."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs">RK</div>
                <div>
                  <h5 className="text-xs font-bold">Ryan Kim</h5>
                  <span className="text-[10px] text-muted-foreground">Operations Manager, EduGrowth Inc</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Green Pilot Logo" width={24} height={24} className="rounded" />
            <span className="font-semibold text-foreground">Green Pilot SaaS Portal</span>
          </div>
          <p>© 2026 Green Pilot. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-muted-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-muted-foreground">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Booking Demo Modal (Mock UI) */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full relative animate-fade-in">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold">Schedule an AI CRM Demo</h3>
            <p className="text-xs text-muted-foreground mt-1">Select a comfortable slot for a live walk-through with our team.</p>

            <form onSubmit={handleBookDemo} className="mt-4 space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={demoForm.name}
                  onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-muted border border-border rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Business Email</label>
                <input
                  type="email"
                  required
                  value={demoForm.email}
                  onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                  placeholder="e.g. john@company.com"
                  className="w-full bg-muted border border-border rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Select Date</label>
                <input
                  type="date"
                  required
                  value={demoForm.date}
                  onChange={(e) => setDemoForm({ ...demoForm, date: e.target.value })}
                  className="w-full bg-muted border border-border rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={demoBooked}
                className="w-full bg-primary hover:bg-primary/95 text-foreground font-semibold py-2 rounded text-xs transition-colors flex items-center justify-center"
              >
                {demoBooked ? 'Scheduling...' : 'Confirm Booking'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}




