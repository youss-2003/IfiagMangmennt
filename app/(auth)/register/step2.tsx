import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useRegisterStore } from "../../store/registerStore";

export default function Step2() {
  const router = useRouter();

  // Rename 'class' to 'studentClass' to avoid reserved keyword issues
  const {
    setField,
    phone,
    birth_date,
    gender,
    birth_place,
    address,
    field,
    enrollment_date,
    class: studentClass,
  } = useRegisterStore();

  const handleNext = () => {
    // Required fields for step 2: birth_date, gender, class, field, enrollment_date
    if (!birth_date || !gender || !studentClass || !field || !enrollment_date) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please fill in all required fields.",
      });
      return;
    }

    router.push("/register/step3");
  };

  return (
    <ScrollView className="flex-1 px-4 bg-white pt-6">
      <Text className="text-2xl font-bold mb-6 text-center">Step 2: Student Details</Text>

      <TextInput
        placeholder="Phone (optional)"
        value={phone}
        onChangeText={(text) => setField("phone", text)}
        className="border border-gray-300 rounded p-3 mb-4"
        keyboardType="phone-pad"
      />

      <TextInput
        placeholder="Birth Date (YYYY-MM-DD)"
        value={birth_date}
        onChangeText={(text) => setField("birth_date", text)}
        className="border border-gray-300 rounded p-3 mb-4"
      />

      <TextInput
        placeholder="Gender (Male or Female)"
        value={gender}
        onChangeText={(text) => setField("gender", text)}
        className="border border-gray-300 rounded p-3 mb-4"
      />

      <TextInput
        placeholder="Birth Place (optional)"
        value={birth_place}
        onChangeText={(text) => setField("birth_place", text)}
        className="border border-gray-300 rounded p-3 mb-4"
      />

      <TextInput
        placeholder="Address (optional)"
        value={address}
        onChangeText={(text) => setField("address", text)}
        className="border border-gray-300 rounded p-3 mb-4"
      />

      <TextInput
        placeholder="Class (e.g. 1st Year Computer Science)"
        value={studentClass}
        onChangeText={(text) => setField("class", text)}
        className="border border-gray-300 rounded p-3 mb-4"
      />

      <TextInput
        placeholder="Field (e.g. Computer Science)"
        value={field}
        onChangeText={(text) => setField("field", text)}
        className="border border-gray-300 rounded p-3 mb-4"
      />

      <TextInput
        placeholder="Enrollment Date (YYYY-MM-DD)"
        value={enrollment_date}
        onChangeText={(text) => setField("enrollment_date", text)}
        className="border border-gray-300 rounded p-3 mb-6"
      />

      <TouchableOpacity onPress={handleNext} className="bg-blue-500 py-3 rounded mb-6">
        <Text className="text-center text-white font-bold">Next</Text>
      </TouchableOpacity>

      <Toast />
    </ScrollView>
  );
}
