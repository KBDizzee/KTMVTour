import { View, Text, ActivityIndicator, Modal } from "react-native";
import React, { useEffect } from "react";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { Info, MapPin, LucideDot } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const tours = () => {
  const device = useCameraDevice("back");

  const { hasPermission, requestPermission } = useCameraPermission();

  //useEffect hook in React is a built-in hook that allows functional components to perform "side effects."
  //Side effects are operations that interact with the outside world or affect things beyond the component's direct rendering, such as:
  //Data fetching
  //DOM manipulation
  //Subscriptions
  //Timers
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  if (hasPermission == null) {
    return (
      <View className="flex items-center justify-center h-screen bg-black">
        <ActivityIndicator size={"large"} color={"#8B5CF6"} />
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View className="flex-1 items-center pt-8 bg-black h-screen">
        <Text className="text-xl font-bold text-white mt-14 text-center p-3">
          Camera permission is required. Please enable it in settings.
        </Text>
      </View>
    );
  }

  if (device == null) {
    return (
      <View className="flex-1 items-center pt-8 bg-black h-screen">
        <Text className="text-xl font-bold text-white mt-14 text-center">
          No camera device found
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center pt-8 bg-black relative">
      {/* { hasPermission && <Text className="text-3xl font-bold text-white mt-14 mb-6 text-center">Scan a landmark to receive a Virtual Tour!</Text>} */}

      <Camera
        device={device}
        isActive={true}
        style={{ height: "100%", width: "100%" }}
      />

      {/* Scan area overlay */}
      <View>
        {/* Top left square */}
        <View className=" border-t border-l border-button z-100 h-[100px] w-[100px] bg-transparent"/>
      </View>

      {/* Card {no detection}*/}
      <LinearGradient
        colors={[
          "rgba(25, 25, 35, 0.9)",
          "rgba(15, 15, 25, 0.85)",
          "rgba(20, 10, 30, 0.8)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: "95%",
          position: "absolute",
          bottom: 24,
          borderRadius: 20,
          padding: 16,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.15)",
          overflow: "hidden",
        }}
      >
        {/* Card Content */}
        <View style={{ paddingLeft: 12 }}>
          <View className="flex-row gap-3 items-center mb-3">
            <View className="bg-fifth p-2 rounded-xl">
              <Info size={18} color={"#8B5CF6"} />
            </View>
            <Text className="text-white font-semibold text-xl">
              How it Works
            </Text>
          </View>

          <View>
            <View className="flex-row gap-2 items-center mb-1">
              <LucideDot color={"#fff"} />
              <Text className="text-secondary">
                Point your camera at a recognised landmark
              </Text>
            </View>
            <View className="flex-row gap-2 items-center mb-1">
              <LucideDot color={"#fff"} />
              <Text className="text-secondary">
                Custom model will identify the location
              </Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <LucideDot color={"#fff"} />
              <Text className="text-secondary">
                Get instant access to AR virtual tours
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default tours;
