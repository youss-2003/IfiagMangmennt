import { create } from "zustand";
import { Student, StudentFilters } from "../types/student";
import { fetchWithToken } from "../lib/api";
import { useAuthStore } from "./authStore";

type StudentStore = {
  students: Student[];
  filters: StudentFilters;
  loading: boolean;
  fetchStudents: (params?: Partial<StudentFilters>) => Promise<void>;
  selectedStudent: Student | null;          // for single student details
  fetchStudentById: (id: string) => Promise<void>;
};

export const useStudentStore = create<StudentStore>((set, get) => ({
  students: [],
  filters: {
    field: "",
    class: "",
    status: "",
    search: "",
    per_page: 10,
    page: 1,
  },
  loading: false,
  selectedStudent: null,
  fetchStudents: async (params = {}) => {
    set({ loading: true });

    const token = useAuthStore.getState().token;

    const cleanParams = Object.entries({
      ...get().filters,
      ...params,
    }).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>);

    const query = new URLSearchParams(cleanParams).toString();

    const res = await fetchWithToken(`/students?${query}`, token);
    const data = await res.json();

    set({
      students: data?.data?.data || [],
      filters: { ...get().filters, ...params },
      loading: false,
    });
  },
  fetchStudentById: async (id) => {
    set({ loading: true });

    const token = useAuthStore.getState().token;

    const res = await fetchWithToken(`/students/${id}`, token);
    const data = await res.json();

    set({
      selectedStudent: data?.data || null,
      loading: false,
    });
  },
}));
