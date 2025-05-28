import { View, Text, Pressable } from "react-native";
import { Student } from "../types/student";
import { useRouter } from "expo-router";

export function StudentCard({ student }: { student: Student }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/student/${String(student.id)}`)}
      className="p-4 bg-gray-100 mb-2 rounded-xl"
    >
      <Text className="text-lg font-semibold">{student.full_name}</Text>
      <Text className="text-gray-500">{student.user.email}</Text>
    </Pressable>
  );
}
