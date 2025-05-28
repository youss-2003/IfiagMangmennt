export type Student = {
    id: number;
    full_name: string;
    class: string;
    field: string;
    status: string;
    user: {
      email: string;
      photo: string;
    };
  };
  
  export type StudentFilters = {
    field?: string;
    class?: string;
    status?: string;
    search?: string;
    per_page?: number;
    page?: number;
  };