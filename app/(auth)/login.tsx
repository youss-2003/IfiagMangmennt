import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "../store/authStore"; // Update the path if needed
import axios from "axios";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please fill in all the fields.",
      });
      return;
    }

    try {
      setLoading(true);

      // 🔐 Login request
      const response = await axios.post("http://your-laravel-api.test/api/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      setToken(token);

      // 👤 Fetch user profile with token
      const profileRes = await axios.get("http://your-laravel-api.test/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(profileRes.data);

      Toast.show({
        type: "success",
        text1: "Login Successful",
      });

      router.replace("/profile");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <Text className="text-2xl font-bold mb-6 text-center">Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border border-gray-300 rounded p-3 mb-4"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        className="border border-gray-300 rounded p-3 mb-4"
        secureTextEntry
      />

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        className="bg-blue-500 py-3 rounded"
      >
        <Text className="text-center text-white font-bold">
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
}
