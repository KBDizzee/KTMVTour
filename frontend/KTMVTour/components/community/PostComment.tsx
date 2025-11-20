import { View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Send } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PostComment = () => {
  const insets = useSafeAreaInsets();

  return (
    <View 
      className="bg-[#0a0a1f] border-t border-purple-500/30 px-4 py-3"
      style={{ paddingBottom: insets.bottom + 12 }}
    >
      <View className="flex-row items-center gap-3">
        {/* Input Field */}
        <View className="flex-1 bg-[#1a1a3e] rounded-full px-4 py-2 flex-row items-center">
          <TextInput
            placeholder="Add a comment..."
            placeholderTextColor="#9ca3af"
            className="flex-1 text-white text-[15px]"
            multiline={false}
          />
        </View>

        {/* Send Button */}
        <TouchableOpacity 
          className="w-10 h-10 rounded-full bg-purple-500 items-center justify-center"
          activeOpacity={0.7}
        >
          <Send color="#ffffff" size={20} fill="none" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostComment;