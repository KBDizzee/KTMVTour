import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Image, MapPin } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const Upload = () => {
  const handleBackClick = () => {
    router.back();
  };
  return (
    <View className="bg-black pt-8 h-screen">
      {/* Nav */}
      <View className="flex-row items-center justify-between mx-2 mt-2">
        <TouchableOpacity
          className="p-1 rounded-full w-10 items-center bg-card"
          onPress={handleBackClick}
        >
          <Text className="text-white text-2xl">X</Text>
        </TouchableOpacity>
        <Text className="text-xl text-white font-semibold">New Post</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          className="bg-button rounded-2xl px-4 py-2"
        >
          <Text className="text-lg text-white font-semibold">Post</Text>
        </TouchableOpacity>
      </View>
      
      {/* Preview Section */}
      <View className="border-2 border-dashed border-six mt-2 p-16 items-center justify-center gap-6 w-[95vw] self-center">
        <View className="p-5 bg-seven w-24 items-center rounded-full border border-button">
          <Image color={"#8B5CF6"} size={48} />
        </View>
        <View className="items-center gap-2">
          <Text className="text-white text-2xl">No Photos Selected</Text>
          <Text className="text-purple-300 font-semibold">Tap Below to Add Photos</Text>
        </View>
      </View>

      {/* Select Photos Button */}
      <LinearGradient
        colors={["rgba(147, 51, 234, 0.2)", "rgba(107, 33, 168, 0.2)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="mt-6 w-[95vw] self-center rounded-md border border-border2 flex-row gap-2 items-center shadow-xl justify-center p-3"
      >
        <Image color={'#8B5CF6'}/>
        <Text className="text-white text-xl ">Select Photos</Text>
      </LinearGradient>

      {/* Add Location Button */}
      <LinearGradient
        colors={["rgba(147, 51, 234, 0.2)", "rgba(107, 33, 168, 0.2)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="mt-6 w-[95vw] self-center rounded-md border border-border2 flex-row gap-2 items-center shadow-xl justify-center p-3"
      >
        <MapPin color={'#8B5CF6'} size={20}/>
        <Text className="text-white text-xl ">Add Location (e.g Boudha Stupa)</Text>
      </LinearGradient>
    </View>
  );
};

export default Upload;
