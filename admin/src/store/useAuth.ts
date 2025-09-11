import {create} from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  userName?: string;
  sessionExpiresAt?: number; // epoch ms
  onLogin: (token: string, userName?: string, sessionMs?: number) => void;
  onLogout: () => void;
  extendSession: (ms: number) => void;
}

export const useAuthStore = create<AuthState>((set,get) => ({
  isLoggedIn: !!localStorage.getItem('@access_token'),
  userName: localStorage.getItem('@user_name') || undefined,
  sessionExpiresAt: (() => {
    const raw = localStorage.getItem('@session_expires');
    return raw ? Number(raw) : undefined;
  })(),

  onLogin: (token: string, userName?: string, sessionMs: number = 60 * 60 * 1000) => {
    const expiresAt = Date.now() + sessionMs;
    localStorage.setItem('@access_token', token);
    if (userName) localStorage.setItem('@user_name', userName);
    localStorage.setItem('@session_expires', String(expiresAt));
    set({ isLoggedIn: true, userName, sessionExpiresAt: expiresAt });
  },

  onLogout: () => {
    localStorage.removeItem('@access_token');
    localStorage.removeItem('@user_name');
    localStorage.removeItem('@session_expires');
    set({ isLoggedIn: false, userName: undefined, sessionExpiresAt: undefined });
  },

  extendSession: (ms: number) => {
    const newExpires = Date.now() + ms;
    localStorage.setItem('@session_expires', String(newExpires));
    set({ sessionExpiresAt: newExpires });
  }
}));

export const loadAccessToken = () => {  
  const value = localStorage.getItem('@access_token');
  if (value !== null) {
    return value;
  }
  return null;
};

