import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useStudentStore } from "../store/studentStore";

export default function StudentDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();  // get student id from route
  const { selectedStudent, fetchStudentById, loading } = useStudentStore();

  useEffect(() => {
    if (id) {
      fetchStudentById(id);
    }
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!selectedStudent) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No student found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">{selectedStudent.full_name}</Text>
      <Text className="text-lg mb-2">Class: {selectedStudent.class}</Text>
      <Text className="text-lg mb-2">Field: {selectedStudent.field}</Text>
      <Text className="text-lg mb-2">Status: {selectedStudent.status}</Text>
      <Text className="text-lg mb-2">Email: {selectedStudent.user.email}</Text>
    </ScrollView>
  );
}
