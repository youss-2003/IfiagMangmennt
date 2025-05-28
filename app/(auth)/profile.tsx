import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "../store/authStore";

export default function ProfileScreen() {
  const router = useRouter();
  const { token, user, logout } = useAuthStore();

  useEffect(() => {
    if (!token || !user) {
      router.replace("/login");
    }
  }, [token, user]);

  if (!token || !user) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center px-4">
      <Text className="text-2xl font-bold mb-4">Welcome, {user?.name}</Text>
      <Text className="text-lg mb-2">Email: {user?.email}</Text>

      <TouchableOpacity
        onPress={() => {
          logout();
          router.replace("/login");
        }}
        className="mt-6 bg-red-500 px-4 py-2 rounded"
      >
        <Text className="text-white font-bold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
