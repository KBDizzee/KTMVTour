import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { useAuthStore } from "@/src/store/auth.store";
import { MapPin } from "lucide-react-native";
import AddPostButton from "./addPostButton";

const Feed = () => {
  const { user } = useAuthStore();
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  
  return (
    <View className="flex-1">
      {/* Main image section - Full screen */}
      <View className="absolute inset-0">
        <Image
          source={require("@/assets/sample-images/photo-1581260466152-d2c0303e54f5.jpeg")}
          style={{
            width: screenWidth,
            height: screenHeight,
            resizeMode: "cover",
          }}
        />
      </View>

      {/* Header Section - Overlay on top */}
      <View className="absolute top-0 left-0 right-0 flex flex-row items-center justify-between pr-4 pt-8 z-10">
        <View className="flex-row gap-2 items-center pl-2">
          {/* profile pictrue */}
          <View className="w-12 bg-third rounded-full border-2 border-secondary items-center">
            {user?.profilePicture && user?.profilePicture.path ? (
              <Image
                source={{ uri: user?.profilePicture.path }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  resizeMode: "cover",
                }}
              />
            ) : (
              <Image
                source={require("@/assets/sample-images/no-profile.png")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  resizeMode: "cover",
                }}
              />
            )}
          </View>

          {/* Text section */}
          <View className="flex">
            <Text className="text-white text-xl pl-1">{user?.username}</Text>
            <View className="flex-row items-center gap-1">
              <MapPin color={"#9ca3af"} size={14} />
              <Text className="text-white">Location</Text>
            </View>
          </View>
        </View>

        <AddPostButton />
      </View>
    </View>
  );
};

export default Feed;