import { create } from "zustand";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  photo: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  access_token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  access_token: null,
  user: null,
  setToken: (token) => set({ access_token: token }),
  setUser: (user) => set({ user }),
  logout: () => set({ access_token: null, user: null }),
}));
