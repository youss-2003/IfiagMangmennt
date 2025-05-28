import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useStudentStore } from "../store/studentStore";
import { StudentCard } from "../components/StudentCard";

export default function StudentList() {
  const { students, fetchStudents, loading } = useStudentStore();

  useEffect(() => {
    const loadStudents = async () => {
      await fetchStudents();
    };
    loadStudents();
  }, []);

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4">All Students</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))
      )}
    </ScrollView>
  );
}
