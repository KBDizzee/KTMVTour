import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { Camera, Plus, Upload } from "lucide-react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { postsAPI } from "@/src/api/posts.api";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

const AddPostButton = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClick = () => {
    setButtonClicked(true);
    router.push('/upload')
  };

  return (
    <View className="relative">
      <TouchableOpacity
        onPress={handleClick}
        className="w-[35px] h-[35px] rounded-xl bg-[#7B2FF7] justify-center items-center shadow-lg"
        style={{
          shadowColor: "#7B2FF7",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.6,
          shadowRadius: 20,
          elevation: 10,
        }}
        activeOpacity={0.8}
      >
        <Plus color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

export default AddPostButton;
