import { create } from 'zustand';
import { User, currentUser } from '../mock/mockUsers';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, businessName: string, email: string, industry: string) => Promise<boolean>;
  logout: () => void;
  updateOnboardingStatus: (onboarded: boolean) => void;
  updateCompanyDetails: (details: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Load state from localStorage on initialize (if runs in browser)
  let initialUser = null;
  let initialIsAuth = false;
  let initialIsOnboarded = false;

  if (typeof window !== 'undefined') {
    try {
      const savedUser = localStorage.getItem('auth_user');
      const savedIsAuth = localStorage.getItem('auth_isAuthenticated');
      const savedIsOnboarded = localStorage.getItem('auth_isOnboarded');
      
      if (savedUser) initialUser = JSON.parse(savedUser);
      if (savedIsAuth) initialIsAuth = savedIsAuth === 'true';
      if (savedIsOnboarded) initialIsOnboarded = savedIsOnboarded === 'true';
    } catch {
      // Ignore localStorage errors in SSR/Next build environments
    }
  }

  return {
    user: initialUser || currentUser, // default to admin user for convenience
    isAuthenticated: initialIsAuth || true, // default authenticated for easy testing
    isOnboarded: initialIsOnboarded || true, // default onboarded
    
    login: async (email, password) => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      if (email && password) {
        const mockLoggedInUser: User = {
          id: 'u1',
          name: email.split('@')[0],
          email: email,
          role: 'admin',
          businessName: 'Apex Properties',
          industry: 'Real Estate'
        };
        
        set({ user: mockLoggedInUser, isAuthenticated: true });
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_user', JSON.stringify(mockLoggedInUser));
          localStorage.setItem('auth_isAuthenticated', 'true');
        }
        return true;
      }
      return false;
    },

    register: async (name, businessName, email, industry) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const newUser: User = {
        id: `u-${Date.now()}`,
        name,
        email,
        role: 'admin',
        businessName,
        industry
      };
      
      set({ user: newUser, isAuthenticated: true, isOnboarded: false });
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_user', JSON.stringify(newUser));
        localStorage.setItem('auth_isAuthenticated', 'true');
        localStorage.setItem('auth_isOnboarded', 'false');
      }
      return true;
    },

    logout: () => {
      set({ user: null, isAuthenticated: false, isOnboarded: false });
      if (typeof window !== 'undefined') {
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
    }
  };
});
