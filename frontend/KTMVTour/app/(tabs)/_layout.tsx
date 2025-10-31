import { Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

const layout = () => {
  // const insets = useSafeAreaInsets()
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#1C1C1E",
          borderColor: "#3A3A3C",
          paddingTop: 7,
          // paddingBottom: insets.bottom,
          // height: 60 + insets.bottom
        },
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarActiveTintColor: "#9370DB",
      }}
    >
      {/* Making sure all the top navbar route sections created by native are hidden */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <Image
                source={require("../../assets/icons/house.png")}
                style={{
                  tintColor: focused ? "#9370DB" : "#fff",
                }}
              />
            </>
          ),
        }}
      />

      <Tabs.Screen
        name="tours"
        options={{
          title: "Tours",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/icons/map-pinned.png")}
              style={{
                tintColor: focused ? "#9370DB" : "#fff",
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/icons/users.png")}
              style={{
                tintColor: focused ? "#9370DB" : "#fff",
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/icons/circle-user-round.png")}
              style={{
                tintColor: focused ? "#9370DB" : "#fff",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default layout;
