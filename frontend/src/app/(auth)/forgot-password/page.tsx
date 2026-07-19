'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useAuthStore } from '@/store/useAuthStore';
import { Sparkles, Loader2, CheckCircle2, Sun, Moon } from 'lucide-react';

const forgotPasswordSchema = zod.object({
  email: zod.string().email({ message: 'Please enter a valid business email.' }),
});

type ForgotPasswordFormValues = zod.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { theme, setTheme } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 relative transition-colors duration-300">
      {/* Theme Toggle Button */}
      {mounted && (
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/40 rounded-full transition-colors border border-border bg-card"
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-500" />
            )}
          </button>
        </div>
      )}

      {/* Brand Header */}
      <Link href="/" className="flex items-center gap-2 mb-8 font-bold text-2xl">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-gradient-green">WA<span className="text-primary">CRM</span></span>
      </Link>

      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />

        {submitted ? (
          <div className="text-center py-4 font-sans">
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold">Check your inbox</h2>
            <p className="text-xs text-muted-foreground mt-2 max-w-xs mx-auto">
              We have sent a simulated password recovery link to your email address.
            </p>
            <div className="mt-8">
              <Link 
                href="/login" 
                className="bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold px-6 py-2.5 rounded-lg transition-colors inline-block"
              >
                Return to sign in
              </Link>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold">Reset password</h2>
            <p className="text-xs text-muted-foreground mt-1">Enter your email and we'll send you instructions.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block mb-1">Business Email</label>
                <input
                  type="email"
                  disabled={loading}
                  placeholder="admin@whatsappcrm.com"
                  className={`w-full bg-secondary border ${errors.email ? 'border-destructive' : 'border-border'} rounded-lg px-3.5 py-2.5 text-xs text-foreground placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors`}
                  {...register('email')}
                />
                {errors.email && (
                  <span className="text-[10px] text-destructive mt-1 block">{errors.email.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold py-2.5 rounded-lg text-xs transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-primary/10"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending email...</span>
                  </>
                ) : (
                  <span>Send Reset Instructions</span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              Remembered your password?{' '}
              <Link href="/login" className="text-primary hover:underline font-semibold">Back to sign in</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
