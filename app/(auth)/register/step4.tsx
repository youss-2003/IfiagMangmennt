import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useRegisterStore } from "../../store/registerStore";

export default function Step4() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    first_name,
    last_name,
    email,
    password,
    photo,
    phone,
    birth_date,
    gender,
    birth_place,
    address,
    field,
    class: studentClass,
    enrollment_date,
    description,
  } = useRegisterStore();

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);
    if (photo) {
      formData.append("photo", {
        uri: photo.uri,
        name: photo.fileName || "profile.jpg",
        type: photo.type || "image/jpeg",
      } as any);
    }
    if (phone) formData.append("phone", phone);
    formData.append("birth_date", birth_date);
    formData.append("gender", gender);
    if (birth_place) formData.append("birth_place", birth_place);
    if (address) formData.append("address", address);
    formData.append("class", studentClass);  
    formData.append("field", field);
    formData.append("enrollment_date", enrollment_date);
    if (description) formData.append("description", description);

    try {
      const response = await axios.post("https://ifiag.pidefood.com/api/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Toast.show({
        type: "success",
        text1: "Registered Successfully",
      });

      router.replace("/login");
    } catch (error: any) {
      setLoading(false);
      console.log("API error response:", error.response?.data);
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: JSON.stringify(error.response?.data) || "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white justify-center p-4">
      <Text className="text-2xl font-bold text-center mb-6">Step 4: Submit Registration</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <TouchableOpacity onPress={handleSubmit} className="bg-green-600 p-4 rounded">
          <Text className="text-white text-center font-bold">Submit</Text>
        </TouchableOpacity>
      )}

      <Toast />
    </View>
  );
}
