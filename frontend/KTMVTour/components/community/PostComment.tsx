import { View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Send } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { postCommentsAPI } from "@/src/api/comments.api";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { commentSchema } from "@/src/schema/comment.schema";
import Toast from "react-native-toast-message";

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

  const { handleSubmit, control } = useForm({
    defaultValues: {
      content: "",
    },
    resolver: yupResolver(commentSchema),
    mode: "all",
  });

  const { mutate,isPending } = useMutation({
    mutationFn: (data:ICommentData) => postCommentsAPI(post.id,data),
    mutationKey: ["post_Comment_API"],
    onSuccess: (response) => {
      Toast.show({
        type: "success",
        text1: response.message ?? "Successfully Commented",
        position: "top",
      });
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: err?.message ?? "Coudln't upload that comment",
        position: "top",
      });
    },
  });

  const onSubmit = async(data: ICommentData) => {
    await mutate(data);
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
