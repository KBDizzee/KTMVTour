import { View, Text, Pressable, Animated, ImageBackground, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import { Users } from "lucide-react-native";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface PopularDestinationsProps {
  scrollY: Animated.Value;
}

interface Landmark {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: any;
  visitors: string;
}

const landmarks: Landmark[] = [
  {
    id: '1',
    name: 'Swayambhunath',
    subtitle: 'Monkey Temple',
    description: 'Ancient Buddhist stupa perched atop a hill with panoramic valley views',
    image: require('../../assets/sample-images/1.jpg'),
    visitors: '5000+ daily'
  },
  {
    id: '2',
    name: 'Pashupatinath',
    subtitle: 'Sacred Hindu Temple',
    description: 'UNESCO World Heritage Site dedicated to Lord Shiva on the Bagmati River',
    image: require('../../assets/sample-images/2.jpg'),
    visitors: '10000+ daily'
  },
  {
    id: '3',
    name: 'Boudhanath Stupa',
    subtitle: 'Largest Stupa in Nepal',
    description: 'Massive mandala and important Tibetan Buddhist pilgrimage site',
    image: require('../../assets/sample-images/3.jpg'),
    visitors: '8000+ daily'
  }
];

const PopularDestinations = ({ scrollY }: PopularDestinationsProps) => {
  // Header animations
  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const headerSlideAnim = useRef(new Animated.Value(40)).current;
  
  // Individual card animations
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
      // Trigger when user scrolls to this section (adjust value based on your layout)
      if (value > 900 && !hasAnimated.current) {
        hasAnimated.current = true;

        // STORY SEQUENCE:
        
        // 1. Header fades in first
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

        // 2. First card emerges (400ms delay)
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
        }, 400);

        // 3. Second card emerges (600ms after first)
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
        }, 1000);

        // 4. Third card emerges (600ms after second)
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
        }, 1600);
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

  return (
    <View className="w-full px-5 py-16 bg-black">
      {/* HEADER - Appears first */}
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
          Popular Destinations
        </Text>
        <Text 
          className="text-white font-bold text-center mb-3"
          style={{ fontSize: 36, lineHeight: 42, letterSpacing: -0.5 }}
        >
          Must-visit landmarks
        </Text>
        <Text 
          className="text-gray-400 text-center px-4"
          style={{ fontSize: 17, lineHeight: 24 }}
        >
          Explore Kathmandu's most iconic cultural and historical sites
        </Text>
      </Animated.View>

      {/* LANDMARK CARDS - Cascade in one by one */}
      <View className="gap-6">
        {landmarks.map((landmark, index) => (
          <Animated.View
            key={landmark.id}
            style={{
              opacity: cardAnimations[index].fade,
              transform: [
                { scale: cardAnimations[index].scale },
                { translateY: cardAnimations[index].slide }
              ],
            }}
          >
            <Pressable
              className="rounded-3xl overflow-hidden active:scale-98"
              style={{
                shadowColor: '#8B5CF6',
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
              }}
            >
              <ImageBackground
                source={landmark.image}
                style={{ height: 280 }}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.95)']}
                  locations={[0, 0.4, 1]}
                  className="flex-1 justify-end p-6"
                >
                  {/* Top Badge */}
                  <View className="absolute top-5 left-5">
                    <View className="bg-purple-600/90 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Text className="text-white font-bold text-xs">
                        UNESCO Heritage
                      </Text>
                    </View>
                  </View>

                  {/* Content */}
                  <View>
                    <Text 
                      className="text-purple-400 font-semibold text-sm mb-1"
                      style={{ letterSpacing: 0.5 }}
                    >
                      {landmark.subtitle}
                    </Text>
                    <Text 
                      className="text-white font-bold mb-2"
                      style={{ fontSize: 28, lineHeight: 32, letterSpacing: -0.5 }}
                    >
                      {landmark.name}
                    </Text>
                    <Text 
                      className="text-gray-300 mb-4"
                      style={{ fontSize: 15, lineHeight: 20 }}
                    >
                      {landmark.description}
                    </Text>

                    {/* Visitors Info */}
                    <View className="flex-row items-center gap-2">
                      <Users size={16} color="#A78BFA" />
                      <Text className="text-gray-300 text-sm">
                        {landmark.visitors}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

export default PopularDestinations;