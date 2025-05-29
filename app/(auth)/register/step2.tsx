import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
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

    router.navigate("/register/step3")
  };

  return (
    <ScrollView className="flex-1 px-6 pt-10 bg-white">
    {/* Logo */}
    <Image
       source={{ uri: "https://scontent.fcmn2-2.fna.fbcdn.net/v/t39.30808-6/291395058_422206206588604_739071216033030624_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGmYEFxiJcl2GcfjPjqkiditq3OAS18VyS2rc4BLXxXJMJf1aKHCnLKJ9qgsl_bRg9ykCOzFJNPyErghRORascR&_nc_ohc=mvcKYbPOJMoQ7kNvwG1Ojdu&_nc_oc=Admxexd3GrZERKhlAMC-zj4oaK08XAwKKB3eLnWYTNbU22CiWI_ia_00cgwmDVVcqMU&_nc_zt=23&_nc_ht=scontent.fcmn2-2.fna&_nc_gid=3NLcsJYnEgEhglsdiTkkww&oh=00_AfKb8sDxOOIULqwdFOp7OkypQ3aWkqAkepD7I-6jppCKJg&oe=683E2403" }}
      className="w-24 h-24 self-center mb-4"
    />

    {/* Step indicator */}
    <Text className="text-center text-gray-500 mb-4">Step 2 of 4</Text>

    {/* Back button */}
    <TouchableOpacity onPress={() => router.back()} className="mb-4 self-start">
      <Text className="text-[#F68C2F] font-semibold">← Back</Text>
    </TouchableOpacity>

    {/* Form fields */}
    <TextInput
      placeholder="Phone (optional)"
      value={phone}
      onChangeText={(text) => setField("phone", text)}
      keyboardType="phone-pad"
      className="border border-gray-200 rounded-xl p-4 mb-4 shadow-sm text-base"
      placeholderTextColor="#aaa"
    />

    <TextInput
      placeholder="Birth Date (YYYY-MM-DD)"
      value={birth_date}
      onChangeText={(text) => setField("birth_date", text)}
      className="border border-gray-200 rounded-xl p-4 mb-4 shadow-sm text-base"
      placeholderTextColor="#aaa"
    />

    <TextInput
      placeholder="Gender (Male or Female)"
      value={gender}
      onChangeText={(text) => setField("gender", text)}
      className="border border-gray-200 rounded-xl p-4 mb-4 shadow-sm text-base"
      placeholderTextColor="#aaa"
    />

    <TextInput
      placeholder="Birth Place (optional)"
      value={birth_place}
      onChangeText={(text) => setField("birth_place", text)}
      className="border border-gray-200 rounded-xl p-4 mb-4 shadow-sm text-base"
      placeholderTextColor="#aaa"
    />

    <TextInput
      placeholder="Address (optional)"
      value={address}
      onChangeText={(text) => setField("address", text)}
      className="border border-gray-200 rounded-xl p-4 mb-4 shadow-sm text-base"
      placeholderTextColor="#aaa"
    />

    <TextInput
      placeholder="Class (e.g. 1st Year Computer Science)"
      value={studentClass}
      onChangeText={(text) => setField("class", text)}
      className="border border-gray-200 rounded-xl p-4 mb-4 shadow-sm text-base"
      placeholderTextColor="#aaa"
    />

    <TextInput
      placeholder="Field (e.g. Computer Science)"
      value={field}
      onChangeText={(text) => setField("field", text)}
      className="border border-gray-200 rounded-xl p-4 mb-4 shadow-sm text-base"
      placeholderTextColor="#aaa"
    />

    <TextInput
      placeholder="Enrollment Date (YYYY-MM-DD)"
      value={enrollment_date}
      onChangeText={(text) => setField("enrollment_date", text)}
      className="border border-gray-200 rounded-xl p-4 mb-6 shadow-sm text-base"
      placeholderTextColor="#aaa"
    />

    {/* Next button */}
    <TouchableOpacity
      onPress={handleNext}
      className="bg-[#F68C2F] py-4 rounded-xl shadow-md active:opacity-90 mb-6"
    >
      <Text className="text-center text-white font-bold text-base">Next</Text>
    </TouchableOpacity>

    <Toast />
  </ScrollView>
  );
}
