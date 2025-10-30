import { View, Text, Pressable } from "react-native";
import { Camera, Upload, Trash2Icon } from "lucide-react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { updateProfileAPI } from "@/src/api/user.api";
import { useAuthStore } from "@/src/store/auth.store";
import { setItem } from "@/src/store/storage";
import Toast from "react-native-toast-message";

interface Types {
  ChangePfpClicked: boolean;
  setChangePfpClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

//ok so when user clicks Take photo button, we call handleTakePhotos at the top using expo image picker and
// that ends up calling saveImage passing it the uri of the image user took which then gets mutated
// calling the backend function.

const ChangePictureOptions = ({ setChangePfpClicked }: Types) => {
  const { user } = useAuthStore();

  //take photo on the spot function
  const handleTakePhotos = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.status !== "granted") {
        const newPermission = await ImagePicker.requestCameraPermissionsAsync();

        if (newPermission.status !== "granted") {
          alert("Camera permission is required");
          setChangePfpClicked(false);
          return;
        }
      }

      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (err: any) {
      alert("Error uploading image:" + err);
      setChangePfpClicked(false);
    }
  };

  // get from gallery
  const handleGalleryPhotos = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.status !== "granted") {
        const newPermission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (newPermission.status !== "granted") {
          alert("Media permission is required");
          setChangePfpClicked(false);
          return;
        }
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        aspect: [1, 1],
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (err: any) {
      alert("Error uploading image:" + err);
      setChangePfpClicked(false);
    }
  };

  // delete pfp
  const handleDeletePfp = async () => {
    try {
      await saveImage(null)
    } catch (err:any) {
      Toast.show({
        type: "error",
        text1: err,
        position: "top",
      });
    }
  };

  // calling backend
  const { mutate, isPending } = useMutation({
    mutationFn: updateProfileAPI,
    mutationKey: ["update_profile_key"],
    onSuccess: (response, variables) => {
      // updating user key to our updated values
      const updatedUser = { ...user, ...variables };
      setItem("user", updatedUser);

      Toast.show({
        type: "success",
        text1: "Profile Picture updated. Changes will show on app reload.",
        position: "top",
      });
      setChangePfpClicked(false);
    },
    onError: (err) => {
      console.error("Mutation Error:", err);

      Toast.show({
        type: "error",
        text1:
          err?.message ?? "Error updating profile. Please try again later.",
        position: "top",
      });
    },
  });

  const saveImage = async (uri: string | null) => {
    const formdata = new FormData();
    formdata.append("profilePicture", {
      uri,
      name: "photo.jpg",
      type: "image/jpeg",
    } as any);
    await mutate(formdata);
    setChangePfpClicked(false);
  };

  return (
    <View className="bg-card w-[85vw] rounded-lg pb-10 border-fourth">
      <Text className="text-white font-semibold text-3xl pl-5 mt-6">
        Change Profile Picture
      </Text>

      {/* Icons */}
      <View className="mt-6">
        {/* Take photo + icon */}
        <View className="pl-9">
          <Pressable
            className="flex-row items-center gap-3"
            onPress={handleTakePhotos}
          >
            <View className="bg-fourth p-2 rounded-full items-center">
              <Camera color={"#8B5CF6"} />
            </View>
            <Text className="text-white text-lg">Take Photo</Text>
          </Pressable>
          {/* Line Break */}
          <View className="border-[0.2px] border-button w-[80%] mt-4 flex itesm"></View>
        </View>

        {/* Upload from photos + icon */}
        <View className="pl-9">
          <Pressable
            className="flex-row items-center gap-3 mt-6"
            onPress={handleGalleryPhotos}
          >
            <View className="bg-fourth p-2 rounded-full items-center">
              <Upload color={"#8B5CF6"} />
            </View>
            <Text className="text-white text-lg">Upload from Photos</Text>
          </Pressable>
          {/* Line Break */}
          <View className="border-[0.2px] border-button w-[80%] mt-4 flex itesm"></View>
        </View>

        {/* Delete + icon */}
        <Pressable className="flex-row items-center gap-3 pl-9 mt-6" onPress={handleDeletePfp}>
          <View className="bg-fourth p-2 rounded-full items-center">
            <Trash2Icon color={"#ef4444"} />
          </View>
          <Text className="text-red-500 text-lg">Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ChangePictureOptions;
