export async function fetchWithToken(url: string, token: string, options: RequestInit = {}) {
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}${url}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "An error occurred");
    }
  
    return res;
  }
  