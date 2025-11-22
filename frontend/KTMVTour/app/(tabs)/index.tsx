import { View, ScrollView } from "react-native";
import Heading from "../../components/landing/heading";
import TakeToLandmark from "../../components/landing/take2landmark-card";
import InteractiveMapCard from "../../components/landing/interactiveMap-card";
import FeaturedPosts from "../../components/landing/featured-posts";
import ShareExperienceCard from "../../components/landing/share-experience.card";
import CategoryCards from "../../components/landing/historical&temples.cards";
import Video from "react-native-video" 

export default function Index() {
  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      decelerationRate="fast"
      scrollEventThrottle={16}
    >
      <View className="flex-1 items-center pt-10 pb-12 bg-black min-h-screen">
        <Video source={require('../../assets/vid/Comp1.mp4')}/>
        {/* Page heading */}
        <Heading />

        {/* Take me to landmark card */}
        <TakeToLandmark />

      </View>


      <View className="flex-1 items-center bg-black pb-8">
        {/* Share your experience {post/checkIn} card */}
        <ShareExperienceCard/>

        {/* Category Cards */}
        <CategoryCards/>
      </View>
    </ScrollView>
  );
}
