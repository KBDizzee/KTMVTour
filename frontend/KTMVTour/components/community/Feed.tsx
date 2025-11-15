import { View, Text, Image } from "react-native";
import React from "react";
import { useAuthStore } from "@/src/store/auth.store";
import { MapPin } from "lucide-react-native";
import AddPostButton from "./addPostButton";

const Feed = () => {
  // TODO: Add feed logic here
  // - Fetch posts from API
  // - Render post items
  // - Handle loading/error states
  const { user } = useAuthStore();
  return (
    <View className="flex-1">
      {/* Header Section */}
      <View className="flex flex-row items-center justify-between pr-4">
        <View className="flex-row gap-3 items-center pl-2">
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
                  width: 100,
                  height: 100,
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

        <AddPostButton/>
      </View>
    </View>
  );
};

export default Feed;
