import { View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Send } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCommentsAPI } from "@/src/api/comments.api";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { commentSchema } from "@/src/schema/comment.schema";
import Toast from "react-native-toast-message";
import { useAuthStore } from "@/src/store/auth.store";

interface postType {
  post: {
    id: string;
  };
}

export interface ICommentData {
  content: string;
}

const PostComment = ({ post }: postType) => {
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { handleSubmit, control,reset } = useForm({
    defaultValues: {
      content: "",
    },
    resolver: yupResolver(commentSchema),
    mode: "all",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ICommentData) => postCommentsAPI(post.id, data),
    mutationKey: ["post_Comment_API"],
    onMutate: async (newComment) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["get_comments", post.id] });

      // Snapshot the previous value
      const previousComments = queryClient.getQueryData([
        "get_comments",
        post.id,
      ]);

      // Optimistically update with new comment
      queryClient.setQueryData(["get_comments", post.id], (old: any) => {
        if (!old) return old;

        // Create optimistic comment
        const optimisticComment = {
          id: `temp-${Date.now()}`,
          content: newComment.content,
          createdAt: new Date().toISOString(),
          user: {
            username: user?.username ?? "You",
            profilePicture: user?.profilePicture?.path,
          },
        };

        // Add to first page
        return {
          ...old,
          pages: old.pages.map((page: any, i: number) =>
            i === 0
              ? { ...page, data: [optimisticComment, ...page.data] }
              : page
          ),
        };
      });

      return { previousComments };
    },
    onError: (err, newComment, context) => {
      // Rollback on error
      queryClient.setQueryData(
        ["get_comments", post.id],
        context?.previousComments
      );
      Toast.show({
        type: "error",
        text1: err?.message ?? "Couldn't upload that comment",
        position: "top",
      });
    },
    onSuccess: (response) => {
      // Refetch to get real data from server
      queryClient.invalidateQueries({ queryKey: ["get_comments", post.id] });
    },
  });

  const onSubmit = async (data: ICommentData) => {
    await mutate(data);
    reset()
  };

  return (
    <View
      className="bg-[#0a0a1f] border-t border-purple-500/30 px-4 py-3"
      style={{ paddingBottom: insets.bottom + 12 }}
    >
      <View className="flex-row items-center gap-3">
        {/* Input Field */}
        <View className="flex-1 bg-[#1a1a3e] rounded-full px-4 py-2 flex-row items-center">
          <Controller
            control={control}
            name="content"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Add a comment..."
                placeholderTextColor="#9ca3af"
                className="flex-1 text-white text-[15px]"
                multiline={false}
              />
            )}
          />
        </View>

        {/* Send Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
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
