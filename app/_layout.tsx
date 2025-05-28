import '../global.css'
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "./store/authStore";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const segments = useSegments(); // e.g., ["(auth)", "login"]
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    const currentRoute = segments.join("/");

    // Define public routes
    const publicRoutes = ["", "index", "about"];
    const isPublicRoute = publicRoutes.includes(currentRoute);

    if (!token && !inAuthGroup && !isPublicRoute) {
      router.replace("/login");
    } else if (token && inAuthGroup) {
      router.replace("/profile");
    }

    setReady(true);
  }, [token, segments]);

  if (!ready) return null;

  return (
    <>
      <Slot />
      <Toast />
    </>
  );
}
