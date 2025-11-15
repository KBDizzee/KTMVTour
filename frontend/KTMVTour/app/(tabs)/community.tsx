import { View, Text } from "react-native";
import React from "react";
import Feed from "@/components/community/Feed";

const community = () => {
  return (
    <View className="flex-1 bg-black">
      {/* Feed */}
      <Feed />
    </View>
  );
};

export default community;
