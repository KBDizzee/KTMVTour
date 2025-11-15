import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { MapPin, Heart, MessageCircle, Share2 } from "lucide-react-native";
import AddPostButton from "./addPostButton";
import { useQuery } from "@tanstack/react-query";
import { feedAPI } from "@/src/api/feed.api";

const Feed = () => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);
  const [photo,setPhoto] = useState<string[]>()

  const { data, isPending } = useQuery({
    queryFn: feedAPI,
    queryKey: ["feed_API"],
  });

  if (isPending) {
    return (
      <View className="flex items-center justify-center h-screen bg-black">
        <ActivityIndicator size={"large"} color={"#8B5CF6"} />
      </View>
    );
  }
  
  const photoUrls = data.data[0].photos.map((photo: any) => photo.url);
  

  return (
    <View className="flex-1">
      {/* Main image section - Full screen */}
      <View className="absolute inset-0">
          <Image
            source={{ uri: photoUrls[0]}}
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
            {data?.data?.[0]?.user?.profilePicture?.path ? (
              <Image
                source={{ uri: data.data[0].user.profilePicture.path }}
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
            <Text className="text-white text-xl pl-1 font-semibold">
              {data?.data?.[0]?.user?.username || ""}
            </Text>
            <View className="flex-row items-center gap-1">
              <MapPin color={"#9ca3af"} size={14} />
              <Text className="text-white">
                {data?.data?.[0]?.location || ""}
              </Text>
            </View>
          </View>
        </View>

        <AddPostButton />
      </View>

      {/* Like + comment + share buttons */}
      <View className="flex absolute right-0 bottom-[35%] p-3 gap-6">
        <View className="flex items-center">
          <TouchableOpacity
            className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm items-center justify-center"
            activeOpacity={0.7}
          >
            <Heart color="#ffffff" size={24} fill="none" />
          </TouchableOpacity>
          <Text className="text-white">{data?.data?.[0]?.likeCount || 0}</Text>
        </View>

        <View className="flex items-center">
          <TouchableOpacity
            className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm items-center justify-center"
            activeOpacity={0.7}
          >
            <MessageCircle color="#ffffff" size={24} fill="none" />
          </TouchableOpacity>
          <Text className="text-white">
            {data?.data?.[0]?.commentCount || 0}
          </Text>
        </View>

        <TouchableOpacity
          className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm items-center justify-center"
          activeOpacity={0.7}
        >
          <Share2 color="#ffffff" size={24} fill="none" />
        </TouchableOpacity>
      </View>

      {/* Caption Section */}
      <View className="flex absolute bottom-0 left-0 w-[90vw] p-4">
        <TouchableOpacity
          onPress={() => setIsCaptionExpanded(!isCaptionExpanded)}
          activeOpacity={0.8}
        >
          <Text
            className="text-white text-[15px] font-semibold"
            numberOfLines={isCaptionExpanded ? undefined : 3}
          >
            {data?.data?.[0]?.caption || ""}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Feed;
