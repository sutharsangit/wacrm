'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useAuthStore } from '@/store/useAuthStore';
import { Sparkles, Eye, EyeOff, Loader2 } from 'lucide-react';

const registerSchema = zod.object({
  name: zod.string().min(2, { message: 'Your name must be at least 2 characters.' }),
  businessName: zod.string().min(2, { message: 'Business name must be at least 2 characters.' }),
  email: zod.string().email({ message: 'Please enter a valid business email.' }),
  password: zod.string().min(6, { message: 'Password must be at least 6 characters.' }),
  industry: zod.string().min(1, { message: 'Please select your industry.' }),
});

type RegisterFormValues = zod.infer<typeof registerSchema>;

const industries = [
  'Real Estate',
  'Automotive',
  'Healthcare',
  'Education',
  'SaaS / Tech',
  'E-commerce',
  'Professional Services',
  'Other'
];

export default function RegisterPage() {
  const router = useRouter();
  const { register: authRegister, updateOnboardingStatus } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', businessName: '', email: '', password: '', industry: '' },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const success = await authRegister(
        values.name,
        values.businessName,
        values.email,
        values.industry,
        values.password
      );
      if (success) {
        updateOnboardingStatus(false); // set onboarding status to false to trigger wizard
        router.push('/onboarding');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      {/* Brand Header */}
      <Link href="/" className="flex items-center gap-2 mb-8 font-bold text-2xl">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-foreground" />
        </div>
        <span className="">Green<span className="text-primary">Pilot</span></span>
      </Link>

      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />

        <h2 className="text-xl font-bold">Create your workspace</h2>
        <p className="text-xs text-muted-foreground mt-1">Get started with a free 14-day trial. No credit card required.</p>

        {error && (
          <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block mb-1">Your Name</label>
              <input
                type="text"
                disabled={loading}
                placeholder="Marcus"
                className={`w-full bg-muted border ${errors.name ? 'border-destructive' : 'border-border'} rounded-lg px-3.5 py-2 text-xs text-foreground focus:outline-none focus:border-primary transition-colors`}
                {...register('name')}
              />
              {errors.name && (
                <span className="text-[10px] text-destructive mt-1 block">{errors.name.message}</span>
              )}
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block mb-1">Business Name</label>
              <input
                type="text"
                disabled={loading}
                placeholder="Apex Realty"
                className={`w-full bg-muted border ${errors.businessName ? 'border-destructive' : 'border-border'} rounded-lg px-3.5 py-2 text-xs text-foreground focus:outline-none focus:border-primary transition-colors`}
                {...register('businessName')}
              />
              {errors.businessName && (
                <span className="text-[10px] text-destructive mt-1 block">{errors.businessName.message}</span>
              )}
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block mb-1">Industry</label>
            <select
              disabled={loading}
              className={`w-full bg-muted border ${errors.industry ? 'border-destructive' : 'border-border'} rounded-lg px-3.5 py-2 text-xs text-muted-foreground focus:outline-none focus:border-primary transition-colors`}
              {...register('industry')}
            >
              <option value="">Select industry...</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
            {errors.industry && (
              <span className="text-[10px] text-destructive mt-1 block">{errors.industry.message}</span>
            )}
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block mb-1">Business Email</label>
            <input
              type="email"
              disabled={loading}
              placeholder="marcus@apexrealty.com"
              className={`w-full bg-muted border ${errors.email ? 'border-destructive' : 'border-border'} rounded-lg px-3.5 py-2 text-xs text-foreground focus:outline-none focus:border-primary transition-colors`}
              {...register('email')}
            />
            {errors.email && (
              <span className="text-[10px] text-destructive mt-1 block">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                disabled={loading}
                placeholder="••••••"
                className={`w-full bg-muted border ${errors.password ? 'border-destructive' : 'border-border'} rounded-lg pl-3.5 pr-10 py-2 text-xs text-foreground focus:outline-none focus:border-primary transition-colors`}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-muted-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <span className="text-[10px] text-destructive mt-1 block">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/95 text-foreground font-semibold py-2.5 rounded-lg text-xs transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-primary/10"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Creating workspace...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline font-medium">Sign in</Link>
        </div>
      </div>
    </div>
  );
}



