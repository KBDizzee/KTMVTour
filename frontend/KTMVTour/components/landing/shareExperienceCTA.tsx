import { View, Text, Pressable, Animated, ImageBackground } from "react-native";
import React, { useEffect, useRef } from "react";
import { Camera, ArrowRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

interface ShareExperienceCTAProps {
  scrollY: Animated.Value;
}

const ShareExperienceCTA = ({ scrollY }: ShareExperienceCTAProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const slideAnim = useRef(new Animated.Value(60)).current;
  const buttonPulseAnim = useRef(new Animated.Value(1)).current;
  const iconScaleAnim = useRef(new Animated.Value(0)).current;

  const hasAnimated = useRef(false);

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      if (value > 2400 && !hasAnimated.current) {
        hasAnimated.current = true;

        // Main card animation
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 35,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.spring(slideAnim, {
            toValue: 0,
            tension: 35,
            friction: 8,
            useNativeDriver: true,
          }),
        ]).start();

        // Icon pops in after card
        setTimeout(() => {
          Animated.spring(iconScaleAnim, {
            toValue: 1,
            tension: 100,
            friction: 6,
            useNativeDriver: true,
          }).start(() => {
            // Start pulse animation after icon appears
            Animated.loop(
              Animated.sequence([
                Animated.timing(buttonPulseAnim, {
                  toValue: 1.06,
                  duration: 1200,
                  useNativeDriver: true,
                }),
                Animated.timing(buttonPulseAnim, {
                  toValue: 1,
                  duration: 1200,
                  useNativeDriver: true,
                }),
              ])
            ).start();
          });
        }, 600);
      }
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY]);

  const handleUpload = ()=>{
    router.push('/upload')
  }

  return (
    <View className="w-full px-5 py-16 bg-black">
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
          shadowColor: "#8B5CF6",
          shadowOffset: { width: 0, height: 20 },
          shadowOpacity: 0.4,
          shadowRadius: 30,
        }}
        className="rounded-3xl overflow-hidden"
      >
        <ImageBackground
          source={require('../../assets/sample-images/photo3.jpeg')}
          style={{ height: 550 }}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.65)", "rgba(0,0,0,0.95)"]}
            locations={[0, 0.4, 1]}
            className="flex-1 justify-between p-8 pt-12"
          >
            {/* Top Section - Icon */}
            <View className="items-center">
              <Animated.View
                style={{
                  transform: [{ scale: iconScaleAnim }],
                }}
              >
                <View
                  className="bg-purple-600 p-5 rounded-full"
                  style={{
                    shadowColor: "#8B5CF6",
                    shadowOffset: { width: 0, height: 12 },
                    shadowOpacity: 0.6,
                    shadowRadius: 20,
                  }}
                >
                  <Camera size={36} color="white" strokeWidth={2.5} />
                </View>
              </Animated.View>
            </View>

            {/* Bottom Section - Content */}
            <View>
              {/* Main Heading */}
              <Text
                className="text-white font-bold mb-4"
                style={{ fontSize: 40, lineHeight: 46, letterSpacing: -0.5 }}
              >
                Share your experience
              </Text>

              {/* Description */}
              <Text
                className="text-gray-300 mb-8"
                style={{ fontSize: 17, lineHeight: 26 }}
              >
                Join thousands exploring Kathmandu's ancient temples, vibrant
                markets, and sacred sites with AI-guided tours. Keep the community 
                active and help others discover hidden gems.
              </Text>

              {/* CTA Button */}
              <Animated.View
                style={{
                  transform: [{ scale: buttonPulseAnim }],
                }}
              >
                <Pressable
                  className="bg-white rounded-2xl py-5 px-8 flex-row items-center justify-center gap-3 active:scale-95 mb-5"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 12 },
                    shadowOpacity: 0.3,
                    shadowRadius: 20,
                  }}
                  onPress={handleUpload}
                >
                  <Text
                    className="text-purple-900 font-bold"
                    style={{ fontSize: 19, letterSpacing: 0.3 }}
                  >
                    Get Started
                  </Text>
                  <ArrowRight color="#581c87" size={22} strokeWidth={3} />
                </Pressable>
              </Animated.View>

              {/* Bottom Text */}
              <View className="items-center">
                <Text
                  className="text-gray-400 text-center mb-1"
                  style={{ fontSize: 15, lineHeight: 20 }}
                >
                  Share your experience today
                </Text>
                <Text
                  className="text-gray-500 text-center"
                  style={{ fontSize: 14, lineHeight: 18 }}
                >
                  Let others discover Kathmandu through your lens
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

export default ShareExperienceCTA;