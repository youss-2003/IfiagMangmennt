import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

export default function EditProfileScreen() {
    const { user, token, setUser } = useAuthStore();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        birth_place: "",
        address: "",
        description: "",
    });

    const [photo, setPhoto] = useState<any>(null);

    useEffect(() => {
        if (user) {
            setForm({
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                email: user.email || "",
                password: "",
                phone: user?.student?.phone || "",
                birth_place: user?.student?.birth_place || "",
                address: user?.student?.address || "",
                description: user?.student?.description || "",
            });
        }
    }, [user]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0]);
        }
    };

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if (value !== "") formData.append(key, value);
        });

        if (photo) {
            formData.append("photo", {
                uri: photo.uri,
                name: "profile.jpg",
                type: "image/jpeg",
            } as any);
        }

        try {
            const response = await axios.put("https://ifiag.pidefood.com/api/auth/profile", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            });

            Toast.show({
                type: "success",
                text1: "Profile updated successfully",
            });

            setUser(response.data.data.user); // Update user in store
            router.back();
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Update Failed",
                text2: error?.response?.data?.message || "Something went wrong",
            });
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-white px-4 py-6">
            <Text className="text-2xl font-bold text-center mb-6">Update Profile</Text>

            <TouchableOpacity onPress={pickImage} className="items-center mb-4">
                {photo ? (
                    <Image source={{ uri: photo.uri }} className="w-28 h-28 rounded-full" />
                ) : user.photo ? (
                    <Image source={{ uri: user.photo }} className="w-28 h-28 rounded-full" />
                ) : (
                    <View className="w-28 h-28 rounded-full bg-gray-200 justify-center items-center">
                        <Text className="text-gray-500">Choose Photo</Text>
                    </View>
                )}
            </TouchableOpacity>

            {[
                "first_name",
                "last_name",
                "email",
                "password",
                "phone",
                "birth_place",
                "address",
                "description",
            ].map((field) => (
                <TextInput
                    key={field}
                    secureTextEntry={field === "password"}
                    placeholder={field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    value={form[field as keyof typeof form]}
                    onChangeText={(text) => handleChange(field, text)}
                    className="border border-gray-300 rounded p-3 mb-4"
                />
            ))}

            <TouchableOpacity
                onPress={handleSubmit}
                className="bg-blue-600 py-4 rounded-xl"
                disabled={loading}
            >
                <Text className="text-center text-white font-bold">
                    {loading ? "Updating..." : "Save Changes"}
                </Text>
            </TouchableOpacity>

            <Toast />
        </ScrollView>
    );
}
