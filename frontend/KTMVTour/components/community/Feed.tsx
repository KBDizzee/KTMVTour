import { View, FlatList, ActivityIndicator, Dimensions, Text } from "react-native";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { feedAPI } from "@/src/api/feed.api";
import PostItem from "./postItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const screenHeight = Dimensions.get("window").height;

const Feed = () => {
  
  const insets = useSafeAreaInsets();
  const tabBarHeight = 70
  const availableHeight = screenHeight - tabBarHeight - insets.bottom;
  
  const {
    data,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["feed_API"],
    queryFn: ({ pageParam = 1 }) => {
      return feedAPI(pageParam);
    },
    getNextPageParam: (lastPage) => {
      // Using next_page from backend response
      if (lastPage?.pagination?.has_next_page) {
        const nextPage = lastPage.pagination.next_page;
        return nextPage;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  // Flatten all pages into a single array of posts
  const allPosts = data?.pages.flatMap((page) => page.data) ?? [];

  // Optimize FlatList performance with getItemLayout
  const getItemLayout = (_: any, index: number) => ({
    length: screenHeight,
    offset: screenHeight * index,
    index,
  });

  const loadMorePosts = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    } else {
      console.log("Cant load anymore:", { hasNextPage, isFetchingNextPage });
    }
  };
  if (isPending) {
    return (
      <View className="flex items-center justify-center h-screen bg-black">
        <ActivityIndicator size={"large"} color={"#8B5CF6"} />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={allPosts}
        renderItem={({ item }: { item: any }) => <PostItem post={item} itemHeight={availableHeight}/>}
        keyExtractor={(item: any) => item.id}
        getItemLayout={getItemLayout}
        // Vertical paging:
        pagingEnabled={true}
        snapToInterval={availableHeight}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        // Load more posts:
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        // Loading indicator or end message:
        ListFooterComponent={
          isFetchingNextPage ? (
            <View
              style={{ height: availableHeight }}
              className="items-center justify-center"
            >
              <ActivityIndicator size="large" color="#8B5CF6" />
            </View>
          ) : !hasNextPage && allPosts.length > 0 ? (
            <View
              style={{ height: screenHeight }}
              className="items-center justify-center bg-black px-6"
            >
              <Text className="text-white text-center text-lg font-semibold">
                That's all we have for now!
              </Text>
              <Text className="text-white text-center text-base mt-4 opacity-80">
                Please share your experience to keep the community active.
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Feed;
