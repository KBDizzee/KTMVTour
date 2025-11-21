import { Stack } from "expo-router";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/src/store/auth.store";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import Toast from "react-native-toast-message";
import { CircleAlertIcon, CircleCheck } from "lucide-react-native";

// Create a client
const queryClient = new QueryClient();

// Toast config
const toastConfig = {
  success: (props: any) => (
    <View className="bg-post p-4 rounded-2xl flex-row items-center gap-3 mx-4">
      <CircleCheck color={"#8B5CF6"} size={20} />
      <Text className="text-white font-bold">{props.text1}</Text>
    </View>
  ),
  error: (props: any) => (
    <View className="bg-post p-4 rounded-2xl flex-row items-center gap-3 mx-4">
      <CircleAlertIcon color={"#8B5CF6"} size={20} />
      <Text className="text-white font-bold">{props.text1}</Text>
    </View>
  ),
};

export default function RootLayout() {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // Set Android navigation bar to immersive mode
      if (Platform.OS === "android") {
        await NavigationBar.setVisibilityAsync("hidden");
        NavigationBar.setBehaviorAsync("overlay-swipe");
      }
      await checkAuth();
      setIsLoading(false);
    };
    init();
  }, []);

  if (isLoading) {
    return (
      <View className="flex items-center justify-center h-screen bg-black">
        <ActivityIndicator size={"large"} color={"#8B5CF6"} />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="upload" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}
