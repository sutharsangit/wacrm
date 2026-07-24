import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  businessName?: string;
  industry?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  login: (email: string, password: string) => Promise<{success: boolean, message?: string}>;
  register: (name: string, businessName: string, email: string, industry: string, password?: string) => Promise<boolean>;
  logout: () => void;
  updateOnboardingStatus: (onboarded: boolean) => void;
  updateCompanyDetails: (details: Partial<User>) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const useAuthStore = create<AuthState>((set) => {
  let initialUser = null;
  let initialIsAuth = false;
  let initialIsOnboarded = false;

  if (typeof window !== 'undefined') {
    try {
      const savedUser = localStorage.getItem('auth_user');
      const token = Cookies.get('token');
      const savedIsOnboarded = localStorage.getItem('auth_isOnboarded');
      
      if (savedUser && token) {
        initialUser = JSON.parse(savedUser);
        initialIsAuth = true;
      }
      if (savedIsOnboarded) initialIsOnboarded = savedIsOnboarded === 'true';
    } catch {
      // Ignore
    }
  }

  return {
    user: initialUser,
    isAuthenticated: initialIsAuth,
    isOnboarded: initialIsOnboarded,
    
    login: async (email, password) => {
      try {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        
        if (res.ok && data.success) {
          const u = {
            id: data.data.user.id,
            name: `${data.data.user.firstName} ${data.data.user.lastName || ''}`.trim(),
            email: data.data.user.email,
            role: data.data.user.role,
            businessName: data.data.organization?.name,
            industry: data.data.organization?.industry,
          };
          
          Cookies.set('token', data.data.tokens.accessToken, { expires: 7, path: '/' });
          localStorage.setItem('auth_user', JSON.stringify(u));
          
          set({ user: u, isAuthenticated: true });
          return { success: true };
        }
        
        return { success: false, message: data.message || 'Invalid credentials. Please try again.' };
      } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Network error. Please check your connection.' };
      }
    },

    register: async (name, businessName, email, industry, password = 'Password123!') => {
      try {
        const [firstName, ...lastNameParts] = name.split(' ');
        const lastName = lastNameParts.join(' ');
        
        const res = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            firstName,
            lastName,
            companyName: businessName,
            industry,
          }),
        });
        const data = await res.json();
        
        if (res.ok && data.success) {
          const u = {
            id: data.data.user.id,
            name,
            email,
            role: 'owner',
            businessName,
            industry,
          };
          
          Cookies.set('token', data.data.tokens.accessToken, { expires: 7 });
          localStorage.setItem('auth_user', JSON.stringify(u));
          localStorage.setItem('auth_isOnboarded', 'false');
          
          set({ user: u, isAuthenticated: true, isOnboarded: false });
          return true;
        }
      } catch (error) {
        console.error('Register error:', error);
      }
      return false;
    },

    logout: () => {
      Cookies.remove('token', { path: '/' });
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_isOnboarded');
      set({ user: null, isAuthenticated: false, isOnboarded: false });
    },

    updateOnboardingStatus: (onboarded) => {
      set({ isOnboarded: onboarded });
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_isOnboarded', onboarded ? 'true' : 'false');
      }
    },

    updateCompanyDetails: (details) => {
      set((state) => {
        if (!state.user) return state;
        const updated = { ...state.user, ...details };
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_user', JSON.stringify(updated));
        }
        return { user: updated };
      });
    }
  };
});
