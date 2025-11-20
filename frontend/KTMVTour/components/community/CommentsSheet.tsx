import { View, Text, ScrollView, FlatList } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PostComment from "./PostComment";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAllCommentsAPI } from "@/src/api/comments.api";
import CommentItem from "./commentItem";

interface postCommentType {
  post: {
    id: string;
  };
}

const CommentsSheet = ({ post }: postCommentType) => {
  const insets = useSafeAreaInsets();

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["get_comments", post.id],
      queryFn: ({ pageParam = 1 }) => {
        return getAllCommentsAPI(post.id, pageParam);
      },
      getNextPageParam: (currentPage) => {
        if (currentPage?.pagination.has_next_page) {
          const nextPage = currentPage.pagination.next_page;
          return nextPage;
        }
        return undefined;
      },
      initialPageParam: 1,
    });

  if (!isPending && data) {
    console.log(data);
  }

  const allComments = data?.pages.flatMap((page) => page.data) ?? [];

  const loadMoreComments = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    } else {
      console.log("Cant load anymore comments:", { hasNextPage, isFetchingNextPage });
    }
  };

  return (
    <View className="flex-1 bg-[#0a0a1f]">
      {/* how many comments this post has */}
      <View
        className="items-center py-2 border-b border-purple-500/30"
        style={{ paddingTop: insets.top + 8 }}
      >
        <View className="w-12 h-1 bg-purple-500 rounded-full mb-3" />
        <Text className="text-white text-lg font-semibold">
          {!isPending && data?.pages[0].pagination.total} Comments
        </Text>
      </View>

      {/* Comments List */}
      <FlatList
        data={allComments}
        renderItem={({item}) => <CommentItem data={item} />}
        keyExtractor={(comment:any)=>comment.id}
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreComments}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {isPending && (
          <View className="flex-1 bg-[#0a0a1f] items-center justify-center animate-pulse">
            <Text className="text-white">Loading comments...</Text>
          </View>
        )}
      </FlatList>

      {/* Post comment component */}
      <PostComment post={post} />
    </View>
  );
};

export default CommentsSheet;
