import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Heart, MapPin, MessageCircle, Share2 } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddPostButton from "./addPostButton";
import LikeComponent from "./likeComponent";

interface PostItemProps {
  post: {
    id: string;
    caption: string;
    location?: string;
    likeCount: number;
    commentCount: number;
    photos: Array<{ id: string; url: string; order: number }>;
    user: {
      username: string;
      profilePicture?: {
        path: string;
        public_id: string;
      };
    };
  };
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const PostItem = ({ post }: PostItemProps) => {
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);
  const insets = useSafeAreaInsets();

  const photoUrls = post.photos.map((photo: any) => photo.url);

  return (
    <View style={{ height: screenHeight }}>
      {/* Main image section - Full screen */}
      <View className="absolute inset-0">
        <Image
          source={{ uri: photoUrls[0] }}
          style={{
            width: screenWidth,
            height: screenHeight,
            resizeMode: "cover",
          }}
        />
      </View>

      {/* Header Section - Overlay on top */}
      <View className="absolute top-0 left-0 right-0 flex flex-row items-center justify-between pr-4 pt-12 z-10">
        <View className="flex-row gap-2 items-center pl-2">
          {/* profile pictrue */}
          <View className="w-12 bg-third rounded-full border-2 border-secondary items-center">
            {post.user?.profilePicture?.path ? (
              <Image
                source={{ uri: post.user.profilePicture.path }}
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
              {post.user?.username || ""}
            </Text>
            <View className="flex-row items-center gap-1">
              <MapPin color={"#9ca3af"} size={14} />
              <Text className="text-white">
                {post.location || "Not specified"}
              </Text>
            </View>
          </View>
        </View>

        <AddPostButton />
      </View>

      {/* Like + comment + share buttons */}
      <View className="flex absolute right-0 bottom-[35%] p-3 gap-6">
        <LikeComponent post={post} />

        <View className="flex items-center">
          <TouchableOpacity
            className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm items-center justify-center"
            activeOpacity={0.7}
          >
            <MessageCircle color="#ffffff" size={24} fill="none" />
          </TouchableOpacity>
          <Text className="text-white">{post.commentCount || 0}</Text>
        </View>

        <TouchableOpacity
          className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm items-center justify-center"
          activeOpacity={0.7}
        >
          <Share2 color="#ffffff" size={24} fill="none" />
        </TouchableOpacity>
      </View>

      {/* Caption Section */}
      <View 
        className="flex absolute bottom-0 left-0 w-[90vw] p-4"
        style={{ paddingBottom: insets.bottom}}
      >
        <TouchableOpacity
          onPress={() => setIsCaptionExpanded(!isCaptionExpanded)}
          activeOpacity={0.8}
        >
          <Text
            className="text-white text-[15px] font-semibold"
            numberOfLines={isCaptionExpanded ? undefined : 3}
          >
            {post.caption || ""}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostItem;
