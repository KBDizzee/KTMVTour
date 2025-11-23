import { LucideDot, Scan, Users, ChevronDown } from "lucide-react-native";
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";

interface HeadingProps {
  scrollY: Animated.Value;
}

const Heading = ({ scrollY }: HeadingProps) => {
  // Animation values
  const badgeFadeAnim = useRef(new Animated.Value(0)).current;
  const badgeSlideAnim = useRef(new Animated.Value(-30)).current;
  const headingFadeAnim = useRef(new Animated.Value(0)).current;
  const headingSlideAnim = useRef(new Animated.Value(20)).current;
  const descFadeAnim = useRef(new Animated.Value(0)).current;
  const descSlideAnim = useRef(new Animated.Value(20)).current;
  const button1ScaleAnim = useRef(new Animated.Value(0.8)).current;
  const button1FadeAnim = useRef(new Animated.Value(0)).current;
  const button2ScaleAnim = useRef(new Animated.Value(0.8)).current;
  const button2FadeAnim = useRef(new Animated.Value(0)).current;
  const glowPulseAnim = useRef(new Animated.Value(0.2)).current;
  const cursorBlinkAnim = useRef(new Animated.Value(1)).current;
  const arrowBounceAnim = useRef(new Animated.Value(0)).current;
  const arrowFadeAnim = useRef(new Animated.Value(0)).current;

  // Typing effect state
  const [displayedText, setDisplayedText] = useState("");
  const [displayedKathmandu, setDisplayedKathmandu] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Experience";
  const kathmanduText = "Kathmandu";

  useEffect(() => {
    let typingTimeout: any;
    let kathmanduTimeout: any;

    // Smoother badge animation with easing
    Animated.parallel([
      Animated.timing(badgeFadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(badgeSlideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Cursor blink animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(cursorBlinkAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cursorBlinkAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Smooth typing effect for "Experience" using setTimeout recursion
    const typeExperience = (index = 0) => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        typingTimeout = setTimeout(() => typeExperience(index + 1), 100);
      } else {
        // Small pause before typing Kathmandu
        typingTimeout = setTimeout(() => {
          typeKathmandu(0);
        }, 300);
      }
    };

    const typeKathmandu = (index = 0) => {
      if (index <= kathmanduText.length) {
        setDisplayedKathmandu(kathmanduText.slice(0, index));
        kathmanduTimeout = setTimeout(() => typeKathmandu(index + 1), 85);
      } else {
        // Hide cursor after typing is complete
        kathmanduTimeout = setTimeout(() => setShowCursor(false), 500);
      }
    };

    // Start typing after a brief delay
    typingTimeout = setTimeout(() => typeExperience(0), 100);

    // Fade in heading container with slide
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(headingFadeAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(headingSlideAnim, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, 400);

    // Description fade in with slide
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(descFadeAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(descSlideAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, 2600);

    // Smoother button animations
    setTimeout(() => {
      Animated.parallel([
        Animated.spring(button1ScaleAnim, {
          toValue: 1,
          tension: 40,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(button1FadeAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, 3000);

    setTimeout(() => {
      Animated.parallel([
        Animated.spring(button2ScaleAnim, {
          toValue: 1,
          tension: 40,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(button2FadeAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, 3150);

    // Arrow fade in and bounce animation
    setTimeout(() => {
      Animated.timing(arrowFadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();

      // Continuous bounce
      Animated.loop(
        Animated.sequence([
          Animated.timing(arrowBounceAnim, {
            toValue: 10,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(arrowBounceAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, 3400);

    // Smoother continuous glow pulse
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulseAnim, {
          toValue: 0.5,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(glowPulseAnim, {
          toValue: 0.2,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    );
    setTimeout(() => pulseAnimation.start(), 3000);

    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
      if (kathmanduTimeout) clearTimeout(kathmanduTimeout);
    };
  }, []);

  // Scroll-based exit animations
  const contentOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const contentTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const contentScale = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const handleToursRoute = () => {
    router.push("/(tabs)/tours");
  };

  const handleCommunityRoute = () => {
    router.push("/(tabs)/community");
  };

  return (
    <Animated.View
      className="flex-1 justify-center px-6"
      style={{
        opacity: contentOpacity,
        transform: [
          { translateY: contentTranslateY },
          { scale: contentScale },
        ],
      }}
    >
      {/* AI-POWERED EXPLORATION Badge */}
      <Animated.View
        className="mb-6"
        style={{
          opacity: badgeFadeAnim,
          transform: [{ translateY: badgeSlideAnim }],
        }}
      >
        <View className="bg-card border border-gray-700 rounded-full flex-row items-center px-3 py-2 self-start">
          <LucideDot color={"#9810FA"} size={32} fill={"#9810FA"} />
          <Text className="text-gray-400 font-medium text-sm -ml-2">
            AI-POWERED EXPLORATION
          </Text>
        </View>
      </Animated.View>

      {/* Main Heading with Typing Effect */}
      <Animated.View
        style={{
          opacity: headingFadeAnim,
          transform: [{ translateY: headingSlideAnim }],
        }}
      >
        <Text className="text-7xl text-white font-bold leading-tight mb-4">
          {displayedText}
          {displayedText === fullText && (
            <>
              {"\n"}
              <Text className="text-[#9810FA]">{displayedKathmandu}</Text>
            </>
          )}
          {showCursor && (
            <Animated.Text
              className="text-[#9810FA]"
              style={{ opacity: cursorBlinkAnim }}
            >
              |
            </Animated.Text>
          )}
        </Text>
      </Animated.View>

      {/* Description */}
      <Animated.View
        style={{
          opacity: descFadeAnim,
          transform: [{ translateY: descSlideAnim }],
        }}
      >
        <Text className="text-gray-400 text-lg leading-relaxed mb-8">
          Discover Nepal's famous landmarks, vibrant culture, inclusive
          community and hidden gems through AI-powered recognition
        </Text>
      </Animated.View>

      {/* Buttons */}
      <View className="flex-row gap-4">
        {/* Start AR Tour Button with Glow */}
        <Animated.View
          className="relative"
          style={{
            transform: [{ scale: button1ScaleAnim }],
            opacity: button1FadeAnim,
          }}
        >
          {/* Glow layer */}
          <Animated.View
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: "#9810FA",
              opacity: glowPulseAnim,
              transform: [{ scale: 1.1 }],
              shadowColor: "#9810FA",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 30,
              elevation: 20,
            }}
          />
          <TouchableOpacity
            className="bg-[#9810FA] rounded-full px-6 py-4 flex-row items-center z-10"
            onPress={handleToursRoute}
          >
            <Scan color="white" size={20} />
            <Text className="text-white font-semibold text-base ml-2">
              Start VTour
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Explore Community Button */}
        <Animated.View
          style={{
            transform: [{ scale: button2ScaleAnim }],
            opacity: button2FadeAnim,
          }}
        >
          <TouchableOpacity
            className="bg-[#1F1F1F] border border-[#2A2A2A] rounded-full px-6 py-4 flex-row items-center"
            onPress={handleCommunityRoute}
          >
            <Users color="white" size={20} />
            <Text className="text-white font-semibold text-base ml-2">
              Explore Community
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Scroll Down Arrow */}
      <Animated.View
        className="absolute bottom-8 self-center"
        style={{
          opacity: arrowFadeAnim,
          transform: [{ translateY: arrowBounceAnim }],
        }}
      >
        <View className="items-center">
          <ChevronDown color="#9810FA" size={32} strokeWidth={2} />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default Heading;