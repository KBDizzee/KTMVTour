import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAuthStore } from "@/src/store/auth.store";
import { MapPin, Heart, MessageCircle, Share2 } from "lucide-react-native";
import AddPostButton from "./addPostButton";

const Feed = () => {
  const { user } = useAuthStore();
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);

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
            <Text className="text-white text-xl pl-1 font-semibold">
              {user?.username}
            </Text>
            <View className="flex-row items-center gap-1">
              <MapPin color={"#9ca3af"} size={14} />
              <Text className="text-white">Location</Text>
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
          <Text className="text-white">2.3k</Text>
        </View>

        <View className="flex items-center">
          <TouchableOpacity
            className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm items-center justify-center"
            activeOpacity={0.7}
          >
            <MessageCircle color="#ffffff" size={24} fill="none" />
          </TouchableOpacity>
          <Text className="text-white">89</Text>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            corporis debitis quis in optio, veritatis soluta vitae harum maiores
            sunt dolores obcaecati earum porro doloremque nobis quae quibusdam
            expedita dicta aperiam natus voluptate! Maiores iure quibusdam rem
            ipsum! Cupiditate magnam aut necessitatibus, a vel atque voluptate hic
            veritatis temporibus non esse, quo nostrum mollitia iste voluptates
            nemo nesciunt. Eligendi alias sint quod, voluptas nulla quas, quos
            nostrum minus repudiandae assumenda a quam, sed reiciendis odit
            suscipit maxime. Exercitationem facilis et quas est laborum voluptas
            enim quia. Laudantium expedita aperiam quod, nisi repellendus debitis
            fugit nostrum. Magnam repellendus fugit praesentium ex.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Feed;
