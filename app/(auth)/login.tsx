import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
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
  
      const response = await axios.post("https://ifiag.pidefood.com/api/auth/login", {
        email,
        password,
      });
  
      const { user, access_token } = response.data.data;
  
      // ✅ Save to Zustand
      setToken(access_token);
      setUser(user);
  
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
    <View className="flex-1 justify-center px-6 bg-white">
    {/* Logo */}
    <View className="items-center mb-8">
      <Image
        source={{ uri: "https://scontent.fcmn2-2.fna.fbcdn.net/v/t39.30808-6/291395058_422206206588604_739071216033030624_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGmYEFxiJcl2GcfjPjqkiditq3OAS18VyS2rc4BLXxXJMJf1aKHCnLKJ9qgsl_bRg9ykCOzFJNPyErghRORascR&_nc_ohc=mvcKYbPOJMoQ7kNvwG1Ojdu&_nc_oc=Admxexd3GrZERKhlAMC-zj4oaK08XAwKKB3eLnWYTNbU22CiWI_ia_00cgwmDVVcqMU&_nc_zt=23&_nc_ht=scontent.fcmn2-2.fna&_nc_gid=3NLcsJYnEgEhglsdiTkkww&oh=00_AfKb8sDxOOIULqwdFOp7OkypQ3aWkqAkepD7I-6jppCKJg&oe=683E2403" }}
        className="w-24 h-24 mb-4 shadow-lg"
        resizeMode="contain"
      />
    </View>

    {/* Title */}
    <Text className="text-2xl font-bold mb-6 text-center text-gray-800">
      Login to your Account
    </Text>

    {/* Email */}
    <TextInput
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      className="border border-gray-200 rounded-xl p-4 mb-4 shadow-sm text-base"
      autoCapitalize="none"
      keyboardType="email-address"
      placeholderTextColor="#aaa"
    />

    {/* Password */}
    <TextInput
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
      className="border border-gray-200 rounded-xl p-4 mb-6 shadow-sm text-base"
      secureTextEntry
      placeholderTextColor="#aaa"
    />

    {/* Login Button */}
    <TouchableOpacity
      onPress={handleLogin}
      disabled={loading}
      className="bg-[#F68C2F] py-4 rounded-xl shadow-md active:opacity-90"
    >
      <Text className="text-center text-white font-bold text-base">
        {loading ? "Logging in..." : "Sign in"}
      </Text>
    </TouchableOpacity>

    {/* Sign up link */}
    <View className="flex-row justify-center mt-6">
      <Text className="text-gray-500">Don’t have an account? </Text>
      <Link href={'/(auth)/register/step1'}>
        <Text className="text-[#F68C2F] font-medium">Sign up</Text>
      </Link>
    </View>

    <Toast />
  </View>
  );
}
