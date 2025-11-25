import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { Sparkles, Route, Users } from "lucide-react-native";
import { LinearGradient } from 'expo-linear-gradient';

interface FeaturesProps {
  scrollY: Animated.Value;
}

interface Feature {
  id: string;
  icon: 'sparkles' | 'route' | 'users';
  title: string;
  description: string;
  gradient: string[];
}

const features: Feature[] = [
  {
    id: '1',
    icon: 'sparkles',
    title: 'Instant Recognition',
    description: 'AI identifies landmarks in real-time with detailed historical information and cultural significance',
    gradient: ['#7C3AED', '#A855F7']
  },
  {
    id: '2',
    icon: 'route',
    title: 'Smart Routes',
    description: 'Personalized walking tours based on your interests, time, and current location in the city',
    gradient: ['#EC4899', '#F472B6']
  },
  {
    id: '3',
    icon: 'users',
    title: 'Live Community',
    description: 'Connect with travelers, share photos, and discover hidden gems recommended by locals',
    gradient: ['#3B82F6', '#60A5FA']
  }
];

const Features = ({ scrollY }: FeaturesProps) => {
  // Header animations
  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const headerSlideAnim = useRef(new Animated.Value(40)).current;
  
  // Card animations
  const card1FadeAnim = useRef(new Animated.Value(0)).current;
  const card1ScaleAnim = useRef(new Animated.Value(0.85)).current;
  const card1SlideAnim = useRef(new Animated.Value(60)).current;
  
  const card2FadeAnim = useRef(new Animated.Value(0)).current;
  const card2ScaleAnim = useRef(new Animated.Value(0.85)).current;
  const card2SlideAnim = useRef(new Animated.Value(60)).current;
  
  const card3FadeAnim = useRef(new Animated.Value(0)).current;
  const card3ScaleAnim = useRef(new Animated.Value(0.85)).current;
  const card3SlideAnim = useRef(new Animated.Value(60)).current;
  
  const hasAnimated = useRef(false);

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      if (value > 2200 && !hasAnimated.current) {
        hasAnimated.current = true;

        // Header appears first
        Animated.parallel([
          Animated.timing(headerFadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.spring(headerSlideAnim, {
            toValue: 0,
            tension: 40,
            friction: 9,
            useNativeDriver: true,
          }),
        ]).start();

        // Cards cascade in
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(card1FadeAnim, {
              toValue: 1,
              duration: 700,
              useNativeDriver: true,
            }),
            Animated.spring(card1ScaleAnim, {
              toValue: 1,
              tension: 40,
              friction: 8,
              useNativeDriver: true,
            }),
            Animated.spring(card1SlideAnim, {
              toValue: 0,
              tension: 40,
              friction: 8,
              useNativeDriver: true,
            }),
          ]).start();
        }, 300);

        setTimeout(() => {
          Animated.parallel([
            Animated.timing(card2FadeAnim, {
              toValue: 1,
              duration: 700,
              useNativeDriver: true,
            }),
            Animated.spring(card2ScaleAnim, {
              toValue: 1,
              tension: 40,
              friction: 8,
              useNativeDriver: true,
            }),
            Animated.spring(card2SlideAnim, {
              toValue: 0,
              tension: 40,
              friction: 8,
              useNativeDriver: true,
            }),
          ]).start();
        }, 600);

        setTimeout(() => {
          Animated.parallel([
            Animated.timing(card3FadeAnim, {
              toValue: 1,
              duration: 700,
              useNativeDriver: true,
            }),
            Animated.spring(card3ScaleAnim, {
              toValue: 1,
              tension: 40,
              friction: 8,
              useNativeDriver: true,
            }),
            Animated.spring(card3SlideAnim, {
              toValue: 0,
              tension: 40,
              friction: 8,
              useNativeDriver: true,
            }),
          ]).start();
        }, 900);
      }
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY]);

  const cardAnimations = [
    { fade: card1FadeAnim, scale: card1ScaleAnim, slide: card1SlideAnim },
    { fade: card2FadeAnim, scale: card2ScaleAnim, slide: card2SlideAnim },
    { fade: card3FadeAnim, scale: card3ScaleAnim, slide: card3SlideAnim },
  ];

  const renderIcon = (iconName: string, color: string) => {
    switch(iconName) {
      case 'sparkles':
        return <Sparkles size={28} color={color} strokeWidth={2.5} />;
      case 'route':
        return <Route size={28} color={color} strokeWidth={2.5} />;
      case 'users':
        return <Users size={28} color={color} strokeWidth={2.5} />;
      default:
        return null;
    }
  };

  return (
    <View className="w-full px-5 py-16 bg-black">
      {/* HEADER */}
      <Animated.View
        style={{
          opacity: headerFadeAnim,
          transform: [{ translateY: headerSlideAnim }],
        }}
        className="mb-10"
      >
        <Text 
          className="text-purple-400 text-sm font-bold uppercase tracking-wider mb-2 text-center"
          style={{ letterSpacing: 2 }}
        >
          Features
        </Text>
        <Text 
          className="text-white font-bold text-center mb-3"
          style={{ fontSize: 36, lineHeight: 42, letterSpacing: -0.5 }}
        >
          Built for explorers
        </Text>
        <Text 
          className="text-gray-400 text-center px-4"
          style={{ fontSize: 17, lineHeight: 24 }}
        >
          Everything you need to discover and document your Kathmandu journey
        </Text>
      </Animated.View>

      {/* FEATURE CARDS */}
      <View className="gap-5">
        {features.map((feature, index) => (
          <Animated.View
            key={feature.id}
            style={{
              opacity: cardAnimations[index].fade,
              transform: [
                { scale: cardAnimations[index].scale },
                { translateY: cardAnimations[index].slide }
              ],
            }}
            className="rounded-3xl overflow-hidden"
            {...{
              shadowColor: feature.gradient[0],
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
            }}
          >
            <LinearGradient
              colors={[`${feature.gradient[0]}15`, `${feature.gradient[1]}10`]}
              className="p-6 border border-gray-800"
              style={{ borderRadius: 24 }}
            >
              {/* Icon */}
              <View 
                className="mb-4 self-start p-3 rounded-2xl"
                style={{ 
                  backgroundColor: `${feature.gradient[0]}20`,
                }}
              >
                {renderIcon(feature.icon, feature.gradient[0])}
              </View>

              {/* Title */}
              <Text 
                className="text-white font-bold mb-2"
                style={{ fontSize: 22, lineHeight: 28, letterSpacing: -0.3 }}
              >
                {feature.title}
              </Text>

              {/* Description */}
              <Text 
                className="text-gray-400"
                style={{ fontSize: 15, lineHeight: 22 }}
              >
                {feature.description}
              </Text>
            </LinearGradient>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

export default Features;