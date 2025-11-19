import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { MapPin, MessageCircle, Share2 } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
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
  const [currentImage, setCurrentImage] = useState<number>(0);
  const insets = useSafeAreaInsets();

  const photoUrls = post.photos.map((photo: any) => photo.url);

  // Preload adjacent photos whenever currentImage changes using expo image. This is to make the ux smoother/faster.
  useEffect(() => {
    const photosToPreload = [];

    // Preload previous photo if it exists
    if (currentImage > 0) {
      photosToPreload.push(photoUrls[currentImage - 1]);
    }

    // Preload next photo if it exists
    if (currentImage < photoUrls.length - 1) {
      photosToPreload.push(photoUrls[currentImage + 1]);
    }

    // Prefetch the adjacent images
    if (photosToPreload.length > 0) {
      Image.prefetch(photosToPreload);
    }
  }, [currentImage, photoUrls]);

  return (
    <View style={{ height: screenHeight }}>
      {/* Main image section - Full screen */}
      <View className="absolute inset-0">
        <PagerView
          style={{ flex: 1 }}
          initialPage={0}
          onPageSelected={(page) => setCurrentImage(page.nativeEvent.position)}
        >
          {photoUrls.map((url, index) => (
            <View key={index}>
              <Image
                source={{ uri: url }}
                style={{
                  width: screenWidth,
                  height: screenHeight,
                }}
                contentFit="cover"
                priority="high"
                cachePolicy="memory-disk"
              />
            </View>
          ))}
        </PagerView>

        {post.photos.length > 1 && (
          <View className="absolute bottom-[20%] left-0 right-0 flex-row justify-center gap-1.5">
            {post.photos.map((_: any, i: number) => (
              <View
                key={i}
                className="rounded-full"
                style={{
                  width: i === currentImage ? 8 : 6,
                  height: i === currentImage ? 8 : 6,
                  backgroundColor:
                    i === currentImage ? "#fff" : "rgba(255,255,255,0.5)",
                }}
              />
            ))}
          </View>
        )}
      </View>

      {/* Header Section - Overlay on top */}
      <View className="absolute top-0 left-0 right-0 flex flex-row items-center justify-between px-4 pt-8 z-10">
        <View className="flex-row gap-2 items-center">
          {/* profile picture */}
          <View className="w-12 bg-third rounded-full border-2 border-secondary items-center">
            {post.user?.profilePicture?.path ? (
              <Image
                source={{ uri: post.user.profilePicture.path }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                }}
                contentFit="cover"
                cachePolicy="memory-disk"
              />
            ) : (
              <Image
                source={require("@/assets/sample-images/no-profile.png")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                }}
                contentFit="cover"
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

        <View className="flex-row items-center gap-2">
          {/* Image counter e.g 1/4, 3/4 etc.. */}
          {post.photos.length > 1 && (
            <View
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            >
              <Text className="text-white text-sm font-semibold">
                {currentImage + 1}/{post.photos.length}
              </Text>
            </View>
          )}
          <AddPostButton />
        </View>
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
        style={{ paddingBottom: insets.bottom }}
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
