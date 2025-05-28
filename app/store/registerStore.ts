import { create } from "zustand";

type RegisterData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  photo: any | null;
  phone?: string;
  birth_date: string; 
  gender: "Male" | "Female" | "";
  birth_place?: string;
  address?: string;
  class: string;  
  field: string;
  enrollment_date: string; 
  description?: string;
};

type RegisterStore = RegisterData & {
  setField: (field: keyof RegisterData, value: any) => void;
  reset: () => void;
};

export const useRegisterStore = create<RegisterStore>((set) => ({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  photo: null,
  phone: "",
  birth_date: "",
  gender: "",
  birth_place: "",
  address: "",
  class: "",
  field: "",
  enrollment_date: "",
  description: "",
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  reset: () =>
    set({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      photo: null,
      phone: "",
      birth_date: "",
      gender: "",
      birth_place: "",
      address: "",
      class: "",
      field: "",
      enrollment_date: "",
      description: "",
    }),
}));
