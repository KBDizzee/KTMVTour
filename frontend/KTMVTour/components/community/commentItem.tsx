import { View, Text } from "react-native";
import { Image } from "expo-image";
import React from "react";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

interface CommentItemType {
  data: any;
}
const CommentItem = ({ data }: CommentItemType) => {
  return (
    <View className="mb-4">
      <View className="flex-row gap-3">
        {/* Profile Picture */}
        <View className="w-10 h-10 rounded-full bg-gray-700 items-center justify-center overflow-hidden">
          <Image
            source={{ uri: data.user.profilePicture.path }}
            style={{ width: 40, height: 40 }}
            contentFit="cover"
          />
        </View>

        {/* Comment Content */}
        <View className="flex-1">
          <View className="bg-[#1a1a3e] rounded-2xl rounded-tl-none px-4 py-3">
            <Text className="text-purple-400 font-semibold mb-1">
              {data.user.username}
            </Text>
            <Text className="text-white text-[15px]">{data.content}</Text>
          </View>

          {/* Timestamp */}
          <View className="mt-2 ml-2">
            <Text className="text-gray-500 text-sm">{dayjs(data.createdAt).fromNow()}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CommentItem;
