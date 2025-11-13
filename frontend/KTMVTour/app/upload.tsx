import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { Image, LucideDot, MapPin } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { postsAPI } from "@/src/api/posts.api";
import Toast from "react-native-toast-message";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postSchema } from "@/src/schema/posts.schema";
import { IPostData } from "@/src/types/post.types";

const Upload = () => {
  // building a state to store the image uri's until it's time to append them
  const [imageUri, setImageUri] = useState<string[]>([]);

  const handleUploadPhotos = async () => {
    try {
      const permission = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (permission.status !== "granted") {
        const newPermission = await ImagePicker.requestCameraPermissionsAsync();

        if (newPermission.status !== "granted") {
          alert("Photo library permission is required");
          return;
        }
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        aspect: [9, 16],
        quality: 1,
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        console.log(`Array of objects: ${JSON.stringify(result.assets)}`);
        setImageUri(
          result.assets.map(
            (eachObjectWithinArray) => eachObjectWithinArray.uri
          )
        );
      }
    } catch (err: any) {
      alert("Error uploading image:" + err);
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      caption: "",
    },
    resolver: yupResolver(postSchema),
    mode: "all",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: postsAPI,
    mutationKey: ["upload_post_key"],
    onSuccess: (response: any) => {
      console.log(response);
      Toast.show({
        type: "success",
        text1: response.message ?? `Post uploaded`,
        position: "top",
      });
    },
    onError: (err: any) => {
      (console.log("Err:", err),
        Toast.show({
          type: "error",
          text1: err.message ?? `Error uploading post`,
          position: "top",
        }));
    },
  });

  const onSubmit = async (data: IPostData) => {
    const { location, caption } = data;

    const formData = new FormData();
    // appending uri's saved to our state:
    console.log(imageUri)
    imageUri.forEach((uri,index) => {
      formData.append("photos", {
        uri,
        name: `${Date.now()}_${index}.jpg`,
        type: "image/jpeg",
      } as any);
    });
    formData.append("caption", caption);
    formData.append("location", location);
    await mutate(formData);
    console.log(`mutated func`);
  };

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      decelerationRate="fast"
      scrollEventThrottle={16}
    >
      <View className="bg-black pt-8 pb-10">
        {/* Nav */}
        <View className="flex-row items-center justify-between mx-2 mt-2">
          <TouchableOpacity
            className="p-1 rounded-full w-10 items-center bg-card"
            onPress={handleBackClick}
          >
            <Text className="text-white text-2xl">X</Text>
          </TouchableOpacity>
          <Text className="text-xl text-white font-semibold">New Post</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSubmit(onSubmit)}
          >
            <LinearGradient
              colors={["#9333EA", "#7C3AED", "#6D28D9"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-2xl px-4 py-2"
            >
              <Text className="text-lg text-white font-semibold">Post</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Preview Section */}
        <View className="border-2 border-dashed border-six mt-2 p-16 items-center justify-center gap-6 w-[95vw] self-center rounded-md">
          <View className="p-5 bg-seven w-24 items-center rounded-full border border-button">
            <Image color={"#8B5CF6"} size={48} />
          </View>
          <View className="items-center gap-2">
            <Text className="text-white text-2xl">No Photos Selected</Text>
            <Text className="text-purple-300 font-semibold">
              Tap Below to Add Photos
            </Text>
          </View>
        </View>

        {/* Select Photos Button */}
        <TouchableOpacity activeOpacity={0.8} onPress={handleUploadPhotos}>
          <LinearGradient
            colors={["rgba(147, 51, 234, 0.2)", "rgba(107, 33, 168, 0.2)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="mt-6 w-[95vw] self-center rounded-md border border-border2 flex-row gap-2 items-center shadow-xl justify-center p-3"
          >
            <Image color={"#8B5CF6"} />
            <Text className="text-white text-xl ">Select Photos</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Add Location Input */}
        <View className="mt-6 w-[95vw] self-center rounded-md border border-border2 flex-row gap-1 items-center shadow-xl pl-2 bg-post">
          <MapPin color={"#8B5CF6"} size={20} />
          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Add Location (e.g Boudha Stupa)"
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-white text-xl"
              />
            )}
          />
        </View>

        {/* Caption Input */}
        <View className="mt-8 w-[95vw] self-center rounded-md border border-border2 flex-row gap-1 items-start shadow-xl p-3 bg-post">
          <Controller
            control={control}
            name="caption"
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Write a brief caption about your post...."
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-white text-xl"
                multiline
                style={{ minHeight: 100, textAlignVertical: "top" }}
              />
            )}
          />
        </View>

        {/* Tips for Posts section */}
        <LinearGradient
          colors={["rgba(147, 51, 234, 0.2)", "rgba(107, 33, 168, 0.2)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="mt-6 w-[95vw] self-center rounded-md border border-border2 flex-row gap-2 shadow-xl p-3"
        >
          <View>
            {/* Heading */}
            <View>
              <Text className="text-white text-xl font-semibold">
                💡 Things to keep in mind:
              </Text>
            </View>
            {/* Points */}
            <View className="mt-4 max-w-[80vw]">
              <View className="flex-row gap-2 items-center mb-3">
                <LucideDot color={"#fff"} />
                <Text className="text-secondary">
                  Please keep your posts to be about sharing your experiences &
                  photos around Kathmandu or Nepal. Posts containing spam,
                  inappropriate content, or unrelated topics will be removed.
                </Text>
              </View>
              <View className="flex-row gap-2 items-center mb-3">
                <LucideDot color={"#fff"} />
                <Text className="text-secondary">
                  You are able to share up to 10 photos, select some good
                  pictures from your trips and let others see them. It is
                  advised that your photos are clear and easily convey the
                  message you want to get across.
                </Text>
              </View>
              <View className="flex-row gap-2 items-center">
                <LucideDot color={"#fff"} />
                <Text className="text-secondary">
                  For any feature requests or problems please contact our
                  support team at support@ktmvtour.com or through the app
                  settings.
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default Upload;
