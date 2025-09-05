import axios from 'axios';
import {create} from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  onLogin: (token: string) => void;
  onLogout: () => void;
 
}

export const useAuthStore = create<AuthState>((set,get) => ({

  isLoggedIn: false,

  onLogin: (token: string) => {
    localStorage.setItem('@access_token', token);
    set({ isLoggedIn: true });  // 로그인 상태 true로 업데이트
  },

  onLogout: () => {
    localStorage.removeItem('@access_token');
    set({ isLoggedIn: false });  // 로그아웃 시 상태 업데이트
  },
  
}));

export const loadAccessToken = () => {  
  const value = localStorage.getItem('@access_token');
  if (value !== null) {
    return value;
  }
  return null;
};

