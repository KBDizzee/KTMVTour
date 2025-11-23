import { View, ScrollView, Dimensions, Animated } from "react-native";
import Heading from "../../components/landing/heading";
import TakeToLandmark from "../../components/landing/take2landmark-card";
import ShareExperienceCard from "../../components/landing/share-experience.card";
import CategoryCards from "../../components/landing/historical&temples.cards";
import Video from "react-native-video";
import { useRef } from "react";

const { height } = Dimensions.get("window");

export default function Index() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <Animated.ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      decelerationRate="fast"
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
    >
      <View
        className="items-center pb-12 bg-black"
        style={{ minHeight: height }}
      >
        <Video
          source={require("../../assets/vid/Comp1.mp4")}
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          resizeMode="cover"
          repeat
          paused={false}
        />
        {/* Page heading */}
        <Heading scrollY={scrollY} />
      </View>

      <View className="flex-1 items-center bg-black pb-8">
        {/* Take me to landmark card */}
        <TakeToLandmark />

        {/* Share your experience {post/checkIn} card */}
        <ShareExperienceCard />

        {/* Category Cards */}
        <CategoryCards />
      </View>
    </Animated.ScrollView>
  );
}