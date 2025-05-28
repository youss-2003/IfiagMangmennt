import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View >
      
      <Text className="text-red-600">Edit app/index.tsx to edit this screen. <Link href={'/(auth)/register/step1'}>go here</Link></Text>
    </View>
  );
}
