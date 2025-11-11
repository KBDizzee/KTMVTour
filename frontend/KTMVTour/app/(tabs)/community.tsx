import { View, Text } from "react-native";
import React from "react";
import AddPostButton from "@/components/community/addPostButton";

const community = () => {
  return (
    <View className="flex-1 items-center pt-8 bg-black">
      {/* Add your post */}
      <AddPostButton />
    </View>
  );
};

export default community;
