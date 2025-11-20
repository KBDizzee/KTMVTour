import { View, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PostComment from "./PostComment";
import { useQuery } from "@tanstack/react-query";
import { getAllCommentsAPI } from "@/src/api/comments.api";
import CommentItem from "./commentItem";

interface postCommentType {
  post: {
    id: string;
  };
}

const CommentsSheet = ({ post }: postCommentType) => {
  const insets = useSafeAreaInsets();

  const { data, isPending } = useQuery({
    queryFn: () => getAllCommentsAPI(post.id),
    queryKey: ["get_comments", post.id],
  });

  if (!isPending && data) {
    console.log(data);
  }

  return (
    <View className="flex-1 bg-[#0a0a1f]">
      {/* how many comments this post has */}
      <View
        className="items-center py-2 border-b border-purple-500/30"
        style={{ paddingTop: insets.top + 8 }}
      >
        <View className="w-12 h-1 bg-purple-500 rounded-full mb-3" />
        <Text className="text-white text-lg font-semibold">
          {!isPending && data?.pagination?.total} Comments
        </Text>
      </View>

      {/* Comments List */}
      <ScrollView
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {isPending ? (
          <View className="flex-1 bg-[#0a0a1f] items-center justify-center animate-pulse">
            <Text className="text-white">Loading comments...</Text>
          </View>
        ) : (
          /* Comment Item */
          data.data.map((comment:any,index:number) => (
            <CommentItem key={index} data={comment} />
          ))
        )}
      </ScrollView>

      {/* Post comment component */}
      <PostComment />
    </View>
  );
};

export default CommentsSheet;
