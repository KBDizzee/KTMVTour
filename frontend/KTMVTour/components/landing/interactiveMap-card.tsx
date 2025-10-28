import { Map, MapPin } from "lucide-react-native";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { AppleMaps, GoogleMaps } from 'expo-maps';

const InteractiveMapCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <View className="bg-post w-[90vw] mt-12 rounded-2xl border border-border pb-5 overflow-hidden">
      {/* Image of card for loading state */}
      {isLoading ? (
        <LinearGradient
          colors={["#1f1f1f", "rgba(45, 27, 105, 0.2)"]}
          className=" w-full bg-gradient-to-br from-[#1f1f1f] to-[#2d1b69]/20 h-[200px]  flex items-center justify-center rounded-t-2xl"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View className="flex items-center justify-center h-[230px] w-full">
            <View className="flex flex-col items-center justify-center">
              <Map size={60} color={"#8B5CF6"} />
              <Text className="text-secondary animate-pulse">
                Interactive map loading...
              </Text>
            </View>
            <View className="absolute top-12 left-12 animate-pulse">
              <MapPin size={24} color={"#8B5CF6"} />
            </View>
            <View className="absolute bottom-12 left-8 animate-pulse">
              <MapPin size={24} color={"#8B5CF6"} />
            </View>
            <View className="absolute top-8 right-8 animate-pulse">
              <MapPin size={24} color={"#8B5CF6"} />
            </View>
          </View>
        </LinearGradient>
      ) : (
        <View className="w-full h-[200px]  flex items-center justify-center rounded-t-2xl">
          if (Platform.OS === 'ios') {
          <AppleMaps.View/>
        } else if (Platform.OS === 'android') {
          <GoogleMaps.View/>
        } else {
          <Text className="text-secondary text-center">Maps are only available on Android and iOS</Text>
        }
        </View>
      )}

      {/* Listing nearby landmarks with distance */}
      <View className="mt-6">
        <Text className="text-white font-semibold pl-4 text-xl">
          Nearby Landmarks
        </Text>

        <View className="p-2 mt-2">
          {/* First landmark */}
          <View className="flex-row justify-between items-center">
            <View className="flex flex-row gap-1 items-center">
              <MapPin size={14} color={"#8B5CF6"} />
              <Text className="text-white text-lg">Swayambhunath Temple</Text>
            </View>
            <Text className="text-secondary text-lg text-center">2.1km NW</Text>
          </View>

          {/* Second landmark */}
          <View className="flex-row justify-between items-center mt-3">
            <View className="flex flex-row gap-1 items-center">
              <MapPin size={14} color={"#8B5CF6"} />
              <Text className="text-white text-lg">Durbar Square</Text>
            </View>
            <Text className="text-secondary text-lg text-center">1.8km S</Text>
          </View>

          {/* Third landmark */}
          <View className="flex-row justify-between items-center mt-3">
            <View className="flex flex-row gap-1 items-center">
              <MapPin size={14} color={"#8B5CF6"} />
              <Text className="text-white text-lg">Boudhanath Stupa</Text>
            </View>
            <Text className="text-secondary text-lg text-center">
              3.5 km NE
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InteractiveMapCard;
