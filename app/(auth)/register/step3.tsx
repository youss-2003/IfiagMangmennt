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
    router.navigate("/register/step4")
  };

  return (
    <View className="flex-1 p-4 bg-white justify-center">
      <Image
       source={{ uri: "https://scontent.fcmn2-2.fna.fbcdn.net/v/t39.30808-6/291395058_422206206588604_739071216033030624_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGmYEFxiJcl2GcfjPjqkiditq3OAS18VyS2rc4BLXxXJMJf1aKHCnLKJ9qgsl_bRg9ykCOzFJNPyErghRORascR&_nc_ohc=mvcKYbPOJMoQ7kNvwG1Ojdu&_nc_oc=Admxexd3GrZERKhlAMC-zj4oaK08XAwKKB3eLnWYTNbU22CiWI_ia_00cgwmDVVcqMU&_nc_zt=23&_nc_ht=scontent.fcmn2-2.fna&_nc_gid=3NLcsJYnEgEhglsdiTkkww&oh=00_AfKb8sDxOOIULqwdFOp7OkypQ3aWkqAkepD7I-6jppCKJg&oe=683E2403" }}
      className="w-24 h-24 self-center mb-4"
    />
      <Text className="text-center text-gray-500 mb-2">Step 3 of 4</Text>
      <TouchableOpacity onPress={() => router.back()} className="mb-2">
        <Text className="text-[#F68C2F]">← Back</Text>
      </TouchableOpacity>

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

      <TouchableOpacity onPress={handleNext} className="bg-[#F68C2F] py-3 rounded">
        <Text className="text-white text-center font-bold">Next</Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
}
