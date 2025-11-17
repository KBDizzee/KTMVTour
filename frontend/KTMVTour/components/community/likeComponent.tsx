import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkIfLikedAPI, likeAPI, unlikeAPI } from "@/src/api/like.api";

type PostLikeType = {
  post: {
    id: string;
    likeCount: number;
  };
};

const LikeComponent = ({ post }: PostLikeType) => {
  // we gotta check if post is liked first, if it's already liked then the like should show up purple not unliked state:
  const { data } = useQuery({
    queryFn: () => checkIfLikedAPI(post.id),
    queryKey: ["checkIfLikedAPI", post.id],
  });

  // const [liked, setIsLiked] = useState(data.data). This don't work because data.data is initially undefined
  // for some seconds/milliseconds.. until react query gives us data from backend...
  const [liked, setIsLiked] = useState(false);

  const [likeCount,setLikeCount] = useState(post.likeCount)

  // Even though we have the data from backend, our liked state doesn't automatically update...
  // so this useEffect updates the state based when and on backend status updates. It's like u ask
  // someone yo is this post liked, they don't respond instantaneously it takes them maybe a second or two
  // and you assume their answer is no in that time and when they answer you use the useEffect to update it.
  useEffect(() => {
    if (data?.data !== undefined) {
      setIsLiked(data.data);
    }
  }, [data]);

  // calling backend
  const { mutate } = useMutation({
    mutationFn: () => likeAPI(post.id),
  });

  const { mutate: unlike } = useMutation({
    mutationFn: () => unlikeAPI(post.id),
  });

  const handleLike = () => {
    if (liked === false) {
      setIsLiked(true);
      mutate();
      setLikeCount((currentNumofLikes)=> currentNumofLikes + 1)
    } else {
      setIsLiked(false);
      unlike();
      setLikeCount((currentNumofLikes)=> currentNumofLikes - 1)
    }
  };

  console.log(`This post ${post.id} is liked:`, data);

  return (
    <View className="flex items-center">
      <TouchableOpacity
        onPress={handleLike}
        className="w-12 h-12 rounded-full backdrop-blur-sm items-center justify-center"
        style={{
          backgroundColor: liked ? "#9333ea" : "rgba(0,0,0,0.4)",
        }}
        activeOpacity={0.7}
      >
        <Heart color="#ffffff" size={24} fill="none" />
      </TouchableOpacity>
      <Text className="text-white">{likeCount}</Text>
    </View>
  );
};

export default LikeComponent;
