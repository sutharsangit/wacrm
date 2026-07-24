'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useAuthStore } from '@/store/useAuthStore';
import { Sparkles, Eye, EyeOff, Loader2 } from 'lucide-react';

const loginSchema = zod.object({
  email: zod.string().email({ message: 'Please enter a valid business email.' }),
  password: zod.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type LoginFormValues = zod.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const result = await login(values.email, values.password);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.message || 'Invalid credentials.');
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

        <h2 className="text-xl font-bold">Welcome back</h2>
        <p className="text-xs text-muted-foreground mt-1">Log in to manage your qualified WhatsApp leads.</p>

        {error && (
          <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block mb-1">Business Email</label>
            <input
              type="email"
              disabled={loading}
              placeholder="admin@whatsappcrm.com"
              className={`w-full bg-muted border ${errors.email ? 'border-destructive' : 'border-border'} rounded-lg px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors`}
              {...register('email')}
            />
            {errors.email && (
              <span className="text-[10px] text-destructive mt-1 block">{errors.email.message}</span>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">Password</label>
              <Link href="/forgot-password" className="text-[10px] text-primary hover:underline">Forgot password?</Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                disabled={loading}
                placeholder="••••••"
                className={`w-full bg-muted border ${errors.password ? 'border-destructive' : 'border-border'} rounded-lg pl-3.5 pr-10 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors`}
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
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          New to Green Pilot
          ?{' '}
          <Link href="/register" className="text-primary hover:underline font-medium">Create a free account</Link>
        </div>
      </div>

      {/* <div className="mt-8 text-center text-[10px] text-muted-foreground">
        Demo Tip: Enter any email and a 6-character password to sign in.
      </div> */}
    </div>
  );
}



