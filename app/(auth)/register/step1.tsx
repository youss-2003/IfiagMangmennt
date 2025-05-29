import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useRegisterStore } from "../../store/registerStore";

export default function Step1() {
  const router = useRouter();

  // Zustand store fields
  const { setField, first_name, last_name, email, password } = useRegisterStore();

  // Local state for password confirmation
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleNext = () => {
    if (!first_name || !last_name || !email || !password || !passwordConfirmation) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please fill in all fields.",
      });
      return;
    }

    if (password !== passwordConfirmation) {
      Toast.show({
        type: "error",
        text1: "Password Mismatch",
        text2: "Passwords do not match.",
      });
      return;
    }

    router.navigate("/register/step2")
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Image
       source={{ uri: "https://scontent.fcmn2-2.fna.fbcdn.net/v/t39.30808-6/291395058_422206206588604_739071216033030624_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGmYEFxiJcl2GcfjPjqkiditq3OAS18VyS2rc4BLXxXJMJf1aKHCnLKJ9qgsl_bRg9ykCOzFJNPyErghRORascR&_nc_ohc=mvcKYbPOJMoQ7kNvwG1Ojdu&_nc_oc=Admxexd3GrZERKhlAMC-zj4oaK08XAwKKB3eLnWYTNbU22CiWI_ia_00cgwmDVVcqMU&_nc_zt=23&_nc_ht=scontent.fcmn2-2.fna&_nc_gid=3NLcsJYnEgEhglsdiTkkww&oh=00_AfKb8sDxOOIULqwdFOp7OkypQ3aWkqAkepD7I-6jppCKJg&oe=683E2403" }}
      className="w-24 h-24 self-center mb-4"
    />
      {/* Title */}
      <Text className="text-center text-gray-500 mb-2">Step 1 of 4</Text>

      {/* First Name */}
      <TextInput
        placeholder="First Name"
        value={first_name}
        onChangeText={(text) => setField("first_name", text)}
        className="border border-gray-200 rounded-xl p-4 mb-4 shadow-sm text-base"
        placeholderTextColor="#aaa"
      />

      {/* Last Name */}
      <TextInput
        placeholder="Last Name"
        value={last_name}
        onChangeText={(text) => setField("last_name", text)}
        className="border border-gray-200 rounded-xl p-4 mb-4 shadow-sm text-base"
        placeholderTextColor="#aaa"
      />

      {/* Email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setField("email", text)}
        className="border border-gray-200 rounded-xl p-4 mb-4 shadow-sm text-base"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setField("password", text)}
        className="border border-gray-200 rounded-xl p-4 mb-4 shadow-sm text-base"
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      {/* Confirm Password */}
      <TextInput
        placeholder="Confirm Password"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        className="border border-gray-200 rounded-xl p-4 mb-6 shadow-sm text-base"
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      {/* Next Button */}
      <TouchableOpacity onPress={handleNext} className="bg-[#F68C2F] py-4 rounded-xl shadow-md active:opacity-90">
        <Text className="text-center text-white font-bold text-base">Next</Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
}
