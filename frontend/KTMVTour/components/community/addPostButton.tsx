import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { Camera, Plus, Upload } from "lucide-react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { postsAPI } from "@/src/api/posts.api";
import Toast from "react-native-toast-message";

const AddPostButton = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleTakePhotos = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.status !== "granted") {
        const newPermission = await ImagePicker.requestCameraPermissionsAsync();

        if (newPermission.status !== "granted") {
          alert("Camera permission is required");
          setButtonClicked(false);
          return;
        }
      }

      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back || ImagePicker.CameraType.front,
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
      });

      if (!result.canceled) {
        // await saveImage(result.assets[0].uri);
      }
    } catch (err: any) {
      alert("Error uploading image:" + err);
      setButtonClicked(false);
    }
  };

  const handleUploadPhotos = async () => {
    try {
      const permission = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (permission.status !== "granted") {
        const newPermission = await ImagePicker.requestCameraPermissionsAsync();

        if (newPermission.status !== "granted") {
          alert("Photo library permission is required");
          setButtonClicked(false);
          return;
        }
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        // await saveImage(result.assets[0].uri);
      }
    } catch (err: any) {
      alert("Error uploading image:" + err);
      setButtonClicked(false);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: postsAPI,
    mutationKey: ["upload_post_key"],
    onSuccess: (response: any) => {
      console.log(response);
      Toast.show({
        type: "success",
        text1: `Post uploaded`,
        position: "top",
      });
    },
    onError: (err: any) => {
      (console.log("Err:", err),
        Toast.show({
          type: "error",
          text1: `Error uploading post`,
          position: "top",
        }));
    },
  });

  // const upload = async(uri:string | null)=>{
  //   const formData = new FormData()
  //   formData.append('posts',{
  //     uri,
  //     name:`${Date.now()}`,
  //     type:'image/jpeg'
  //   } as any)
  //   formData.append('caption',caption)
  //   await mutate(formData)
  //   setButtonClicked(false)
  // }

  const handleClick = () => {
    console.log(`Clicked`);
    setButtonClicked(true);
  };

  const handleExitClick = () => {
    console.log(`Exit`);
    setButtonClicked(false);
  };

  return (
    <View className="relative">
      <TouchableOpacity
        onPress={handleClick}
        className="w-[35px] h-[35px] rounded-xl bg-[#7B2FF7] justify-center items-center shadow-lg"
        style={{
          shadowColor: "#7B2FF7",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.6,
          shadowRadius: 20,
          elevation: 10,
        }}
        activeOpacity={0.8}
      >
        <Plus color={"white"} />
      </TouchableOpacity>

      {buttonClicked && (
        <View className="absolute bg-card w-[35vw] rounded-lg pb-4 border-fourth mt-1 top-[100%] right-[-15%]">
          <Text className="text-white font-semibold text-xl mt-4 text-center">
            Upload Photos
          </Text>

          {/* Icons */}
          <View className="mt-3">
            {/* Take photo + icon */}
            <View className="pl-2">
              <TouchableOpacity
                onPress={handleTakePhotos}
                activeOpacity={0.8}
                className="flex-row items-center gap-3"
              >
                <View className="bg-fourth p-1 rounded-full items-center">
                  <Camera color={"#8B5CF6"} size={20} />
                </View>
                <Text className="text-white">Take Photo</Text>
              </TouchableOpacity>
              {/* Line Break */}
              <View className="border-[0.2px] border-button w-[90%] mt-2 flex itesm"></View>
            </View>

            {/* Upload from photos + icon */}
            <View className="pl-2">
              <TouchableOpacity
                onPress={handleUploadPhotos}
                activeOpacity={0.8}
                className="flex-row items-center gap-3 mt-4"
              >
                <View className="bg-fourth p-1 rounded-full items-center">
                  <Upload color={"#8B5CF6"} size={20} />
                </View>
                <Text className="text-white">Upload</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default AddPostButton;
