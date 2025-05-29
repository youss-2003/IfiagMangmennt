import { View, Text, TouchableOpacity, ActivityIndicator, Image } from "react-native";
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
      <Image
        source={{ uri: "https://scontent.fcmn2-2.fna.fbcdn.net/v/t39.30808-6/291395058_422206206588604_739071216033030624_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGmYEFxiJcl2GcfjPjqkiditq3OAS18VyS2rc4BLXxXJMJf1aKHCnLKJ9qgsl_bRg9ykCOzFJNPyErghRORascR&_nc_ohc=mvcKYbPOJMoQ7kNvwG1Ojdu&_nc_oc=Admxexd3GrZERKhlAMC-zj4oaK08XAwKKB3eLnWYTNbU22CiWI_ia_00cgwmDVVcqMU&_nc_zt=23&_nc_ht=scontent.fcmn2-2.fna&_nc_gid=3NLcsJYnEgEhglsdiTkkww&oh=00_AfKb8sDxOOIULqwdFOp7OkypQ3aWkqAkepD7I-6jppCKJg&oe=683E2403" }}
        className="w-24 h-24 self-center mb-4"
      />
      <Text className="text-center text-gray-500 mb-2">Step 4 of 4</Text>

      <TouchableOpacity onPress={() => router.back()} className="mb-2">
        <Text className="text-[#F68C2F]">← Back</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <TouchableOpacity onPress={handleSubmit} className="bg-[#F68C2F] p-4 rounded">
          <Text className="text-white text-center font-bold">Submit</Text>
        </TouchableOpacity>
      )}

      <Toast />
    </View>
  );
}
