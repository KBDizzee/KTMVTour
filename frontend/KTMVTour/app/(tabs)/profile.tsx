import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useAuthStore } from "@/src/store/auth.store";
import { getItem, removeItem } from "@/src/store/storage";
import { LinearGradient } from "expo-linear-gradient";
import BasicInfoSection from "../../components/profile/basic-info.section";
import RecentActivitySection from "../../components/profile/recent-activity.section";
import { Camera } from "lucide-react-native";
import ChangePictureOptions from "@/components/profile/change-pfp.options";
import { Modal } from "react-native";

const profile = () => {
  const { logout } = useAuthStore();
  const { user } = useAuthStore();

  const [pfp, setPfp] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [changePfpClicked, setChangePfpClicked] = useState(false);

  const handlePfpClick = () => {
    setChangePfpClicked(true);
    console.log(`Set state true`);
  };

  const handleExitPfpClick = () => {
    setChangePfpClicked(false);
    console.log(`Set state false`);
  };

  const handlelogout = () => {
    removeItem("user");
    removeItem("KTMVTour_token");
    logout();
    // console.log(user)
  };

  return (
    <>
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      decelerationRate="fast"
      scrollEventThrottle={16}
    >
      <View className="items-center bg-black pb-10">
        {/* Header Section: Gradient + Profile Picture */}
        <View className="relative w-full h-40">
          <LinearGradient
            colors={["#25153e", "#10071b", "#321e55"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          />

          {/* Profile Picture (Positioned inside gradient) */}
          <View className="absolute left-[5%] bottom-[-55px] bg-third rounded-full z-10 border-2 border-border">
            {user?.profilePicture && user?.profilePicture.path ? <Image
              source={{uri: user?.profilePicture.path}}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50, 
                resizeMode: "cover",
              }}
            /> 
           : <Image
              source={require("@/assets/sample-images/no-profile.png")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50, 
                resizeMode: "cover",
              }}
            /> }
            {isEditing && (
              <Pressable
                className="bg-bg rounded-full p-2 items-center absolute"
                onPress={handlePfpClick}
              >
                <Camera color={"#8B5CF6"} />
              </Pressable>
            )}
          </View>
        </View>

        {/* Content section {below header} */}
        <View className="mt-16">
          {/* profile name + stats section */}
          <View className="flex items-center">
            <Text className="text-white text-3xl font-semibold">
              {user ? user.username : "Guest"}{" "}
            </Text>
            <Text className="text-secondary text-lg">
              Member since{" "}
              {new Date(user?.createdAt!).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </Text>
            {/* Stats */}
            <View className="mt-2 flex-row gap-8 items-center justify-center">
              {/* Posts stats */}
              <View className="flex items-center">
                <Text className="text-white text-2xl font-semibold">-</Text>
                <Text className="text-white">Posts</Text>
              </View>

              {/* Places visited. */}
              <View className="flex items-center">
                <Text className="text-white text-2xl font-semibold">-</Text>
                <Text className="text-white">Check Ins</Text>
              </View>
            </View>
          </View>

          {/* Basic info section */}
          <BasicInfoSection isEditing={isEditing} setIsEditing={setIsEditing} />

          {/* Recent Activity section */}
          <RecentActivitySection />

          {/* logout button */}
          <Pressable
            onPress={handlelogout}
            className="border border-red-500 w-[90vw] rounded-lg p-2 flex items-center justify-center mt-6"
          >
            <Text className="text-red-500 font-bold text-lg">Logout</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>

    {/* Modal for changing profile picture - OUTSIDE ScrollView */}
      <Modal
        visible={changePfpClicked}
        transparent={true}
        animationType="fade"
        onRequestClose={handleExitPfpClick}
      >
        <Pressable
          className="flex-1 bg-black/50 items-center justify-center"
          onPress={handleExitPfpClick}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <ChangePictureOptions
              pfp={pfp}
              setPfp={setPfp}
              setChangePfpClicked={setChangePfpClicked}
              ChangePfpClicked={changePfpClicked}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default profile;
