import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useRegisterStore } from "../../store/registerStore";

export default function Step3() {
  const router = useRouter();
  const { setField, phone, birth_place, address, description, photo } = useRegisterStore();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setField("photo", result.assets[0]);
    }
  };

  const handleNext = () => {
    // All fields here are optional, so no validation
    router.push("/register/step4");
  };

  return (
    <View className="flex-1 p-4 bg-white justify-center">
      <Text className="text-xl font-bold mb-4 text-center">Step 3: Optional Info</Text>

      

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={(text) => setField("description", text)}
        className="border border-gray-300 p-3 rounded mb-4"
      />

      <TouchableOpacity onPress={pickImage} className="bg-gray-200 py-3 rounded mb-4">
        <Text className="text-center">{photo ? "Change Photo" : "Upload Profile Photo"}</Text>
      </TouchableOpacity>

      {photo && (
        <Image
          source={{ uri: photo.uri }}
          className="w-32 h-32 self-center rounded-full mb-4"
        />
      )}

      <TouchableOpacity onPress={handleNext} className="bg-blue-600 py-3 rounded">
        <Text className="text-white text-center font-bold">Next</Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
}
