import { create } from 'zustand';
import { User } from '../mock/mockUsers';
import { apiFetch } from '@/lib/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  theme: 'light' | 'dark';
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, businessName: string, email: string, industry: string) => Promise<boolean>;
  logout: () => void;
  updateOnboardingStatus: (onboarded: boolean) => void;
  updateCompanyDetails: (details: Partial<User>) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Load state from localStorage on initialize (if runs in browser)
  let initialUser = null;
  let initialIsAuth = false;
  let initialIsOnboarded = false;
  let initialTheme: 'light' | 'dark' = 'dark';

  if (typeof window !== 'undefined') {
    try {
      const savedUser = localStorage.getItem('auth_user');
      const savedIsAuth = localStorage.getItem('auth_isAuthenticated');
      const savedIsOnboarded = localStorage.getItem('auth_isOnboarded');
      const savedTheme = localStorage.getItem('auth_theme');
      
      if (savedUser) initialUser = JSON.parse(savedUser);
      if (savedIsAuth) initialIsAuth = savedIsAuth === 'true';
      if (savedIsOnboarded) initialIsOnboarded = savedIsOnboarded === 'true';
      if (savedTheme === 'light' || savedTheme === 'dark') {
        initialTheme = savedTheme;
      }
    } catch {
      // Ignore localStorage errors in SSR/Next build environments
    }
  }

  return {
    user: initialUser,
    isAuthenticated: initialIsAuth,
    isOnboarded: initialIsOnboarded,
    theme: initialTheme,
    
    login: async (email, password) => {
      try {
        const response = await apiFetch('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
        
        const { user, organization, tokens } = response.data;
        const loggedInUser: User = {
          id: user.id,
          name: `${user.firstName} ${user.lastName || ''}`.trim(),
          email: user.email,
          role: user.roleId,
          businessName: organization.name,
          industry: organization.industry || 'Real Estate'
        };
        
        set({ user: loggedInUser, isAuthenticated: true, isOnboarded: true });
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', tokens.accessToken);
          localStorage.setItem('auth_refresh_token', tokens.refreshToken);
          localStorage.setItem('auth_user', JSON.stringify(loggedInUser));
          localStorage.setItem('auth_isAuthenticated', 'true');
          localStorage.setItem('auth_isOnboarded', 'true');
        }
        return true;
      } catch (error) {
        console.error('Login API error:', error);
        return false;
      }
    },

    register: async (name, businessName, email, industry) => {
      try {
        const [firstName = '', ...lastNameParts] = name.split(' ');
        const lastName = lastNameParts.join(' ');
        
        const response = await apiFetch('/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            companyName: businessName,
            industry,
            firstName,
            lastName: lastName || undefined,
            email,
            password: 'password' // default password for quick local registration testing
          }),
        });
        
        const { user, organization, tokens } = response.data;
        const newUser: User = {
          id: user.id,
          name: `${user.firstName} ${user.lastName || ''}`.trim(),
          email: user.email,
          role: user.roleId,
          businessName: organization.name,
          industry: organization.industry || 'Real Estate'
        };
        
        set({ user: newUser, isAuthenticated: true, isOnboarded: false });
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', tokens.accessToken);
          localStorage.setItem('auth_refresh_token', tokens.refreshToken);
          localStorage.setItem('auth_user', JSON.stringify(newUser));
          localStorage.setItem('auth_isAuthenticated', 'true');
          localStorage.setItem('auth_isOnboarded', 'false');
        }
        return true;
      } catch (error) {
        console.error('Registration API error:', error);
        return false;
      }
    },

    logout: () => {
      set({ user: null, isAuthenticated: false, isOnboarded: false });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_refresh_token');
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_isAuthenticated');
        localStorage.removeItem('auth_isOnboarded');
      }
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
    },

    setTheme: (newTheme) => {
      set({ theme: newTheme });
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_theme', newTheme);
      }
    }
  };
});
