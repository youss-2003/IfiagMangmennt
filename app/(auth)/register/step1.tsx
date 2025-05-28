import { View, Text, TextInput, TouchableOpacity } from "react-native";
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

    router.push("/register/step2");
  };

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <Text className="text-2xl font-bold mb-6 text-center">Step 1: Basic Info</Text>

      <TextInput
        placeholder="First Name"
        value={first_name}
        onChangeText={(text) => setField("first_name", text)}
        className="border border-gray-300 rounded p-3 mb-4"
      />

      <TextInput
        placeholder="Last Name"
        value={last_name}
        onChangeText={(text) => setField("last_name", text)}
        className="border border-gray-300 rounded p-3 mb-4"
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setField("email", text)}
        className="border border-gray-300 rounded p-3 mb-4"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setField("password", text)}
        className="border border-gray-300 rounded p-3 mb-4"
        secureTextEntry
      />

      <TextInput
        placeholder="Confirm Password"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        className="border border-gray-300 rounded p-3 mb-6"
        secureTextEntry
      />

      <TouchableOpacity onPress={handleNext} className="bg-blue-500 py-3 rounded">
        <Text className="text-center text-white font-bold">Next</Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
}
