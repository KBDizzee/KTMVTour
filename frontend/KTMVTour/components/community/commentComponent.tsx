import { View, Text, TouchableOpacity, Modal, Dimensions } from "react-native";
import React, { useState } from "react";
import { MessageCircle } from "lucide-react-native";
import CommentsSheet from "./CommentsSheet";

interface postCommentType {
  post: {
    id: string;
    commentCount: number;
  };
}

const { height: screenHeight } = Dimensions.get("window");

const CommentComponent = ({ post }: postCommentType) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <>
      <View className="flex items-center">
        <TouchableOpacity
          className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm items-center justify-center"
          activeOpacity={0.7}
          onPress={() => setShowComments(true)}
        >
          <MessageCircle color="#ffffff" size={24} fill="none" />
        </TouchableOpacity>
        <Text className="text-white">{post.commentCount || 0}</Text>
      </View>

      <Modal
        visible={showComments}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowComments(false)}
      >
        <View className="flex-1">
          {/* Transparent top half - tappable to close */}
          <TouchableOpacity
            className="flex-1"
            activeOpacity={1}
            onPress={() => setShowComments(false)}
          />

          {/* Bottom half with comments */}
          <View style={{ height: screenHeight * 0.7 }}>
            <CommentsSheet post={post} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CommentComponent;
