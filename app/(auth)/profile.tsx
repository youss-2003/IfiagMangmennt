import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "../store/authStore";
import { LogOut, Settings } from "lucide-react-native";

export default function ProfileScreen() {
  const { access_token, user, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!access_token || !user) {
      router.replace("/login");
    }
  }, [access_token, user]);

  if (!access_token || !user) return null;

  return (
    <ScrollView className="flex-1 bg-[#f5f6ff] px-4 py-8">
      <View className="items-center mb-6">
        <Image
          source={{ uri: `https://ifiag.pidefood.com/storage/${user.photo}` }}
          className="w-28 h-28 rounded-full"
        />
        <Text className="text-xl font-bold mt-4">
          {user.first_name} {user.last_name}
        </Text>
        <Text className="text-gray-500">{user.specialty || "Étudiant"}</Text>
      </View>

      <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm space-y-3">
        <Text className="text-sm text-gray-500">Email</Text>
        <Text className="text-base font-semibold text-black">{user.email}</Text>

        <Text className="text-sm text-gray-500">Téléphone</Text>
        <Text className="text-base font-semibold text-black">{user.phone}</Text>

        <Text className="text-sm text-gray-500">Adresse</Text>
        <Text className="text-base font-semibold text-black">{user.address || "Non renseignée"}</Text>
      </View>

      <TouchableOpacity
        className="flex-row items-center bg-white p-4 rounded-2xl mb-4 shadow-sm"
        onPress={() => router.push("/editeprofile")}
      >
        <Settings size={20} color="#4B5563" className="mr-2" />
        <Text className="text-base font-medium text-gray-800">Modifier le profil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row items-center bg-white p-4 rounded-2xl shadow-sm"
        onPress={() => {
          logout();
          router.replace("/login");
        }}
      >
        <LogOut size={20} color="#EF4444" className="mr-2" />
        <Text className="text-base font-medium text-red-500">Déconnexion</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
