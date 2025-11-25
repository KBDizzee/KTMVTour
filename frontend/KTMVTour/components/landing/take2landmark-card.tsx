import { View, Text, Linking, Platform, Pressable, Animated, ImageBackground, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import { Navigation, ArrowRight } from "lucide-react-native";
import * as Location from "expo-location";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface TakeToLandmarkProps {
  scrollY: Animated.Value;
}

interface openMapArgs {
  latitude: string | number;
  longitude: string | number;
}

const TakeToLandmark = ({ scrollY }: TakeToLandmarkProps) => {
  // Header animations
  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const headerSlideAnim = useRef(new Animated.Value(30)).current;
  
  // Card animations
  const cardFadeAnim = useRef(new Animated.Value(0)).current;
  const cardScaleAnim = useRef(new Animated.Value(0.85)).current;
  const cardSlideAnim = useRef(new Animated.Value(80)).current;
  
  // Icon animations
  const iconRotateAnim = useRef(new Animated.Value(0)).current;
  const iconScaleAnim = useRef(new Animated.Value(0)).current;
  
  // Button animations
  const buttonPulseAnim = useRef(new Animated.Value(1)).current;
  const buttonSlideAnim = useRef(new Animated.Value(20)).current;
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;
  
  const hasAnimated = useRef(false);

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      if (value > 400 && !hasAnimated.current) {
        hasAnimated.current = true;

        // STEP 1: Header text appears first (storytelling begins)
        Animated.parallel([
          Animated.timing(headerFadeAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.spring(headerSlideAnim, {
            toValue: 0,
            tension: 40,
            friction: 9,
            useNativeDriver: true,
          }),
        ]).start();

        // STEP 2: Card emerges after header (500ms delay)
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(cardFadeAnim, {
              toValue: 1,
              duration: 900,
              useNativeDriver: true,
            }),
            Animated.spring(cardScaleAnim, {
              toValue: 1,
              tension: 35,
              friction: 8,
              useNativeDriver: true,
            }),
            Animated.spring(cardSlideAnim, {
              toValue: 0,
              tension: 35,
              friction: 8,
              useNativeDriver: true,
            }),
          ]).start();
        }, 500);

        // STEP 3: Icon pops and rotates (300ms after card)
        setTimeout(() => {
          Animated.parallel([
            Animated.spring(iconScaleAnim, {
              toValue: 1,
              tension: 100,
              friction: 6,
              useNativeDriver: true,
            }),
            Animated.timing(iconRotateAnim, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
          ]).start();
        }, 800);

        // STEP 4: Button slides in and starts pulsing (400ms after icon)
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(buttonFadeAnim, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.spring(buttonSlideAnim, {
              toValue: 0,
              tension: 50,
              friction: 8,
              useNativeDriver: true,
            }),
          ]).start(() => {
            // Start continuous pulse after button appears
            Animated.loop(
              Animated.sequence([
                Animated.timing(buttonPulseAnim, {
                  toValue: 1.08,
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
        }, 1200);
      }
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY]);

  const openMap = ({ latitude, longitude }: openMapArgs) => {
    const searchQuery = encodeURIComponent("Landmarks near me");

    const scheme = Platform.select({
      ios: `maps://?q=${searchQuery}&sll=${latitude},${longitude}`,
      android: `https://www.google.com/maps/search/?api=1&query=${searchQuery}&center=${latitude},${longitude}`,
    });

    if (scheme) {
      Linking.openURL(scheme).catch((err) =>
        console.error("Error opening map: ", err)
      );
    }
  };

  const handleOpenMap = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    openMap({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const iconRotate = iconRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="items-center w-full px-5 mb-12">
      {/* HEADER TEXT - Appears first in the story */}
      <Animated.View
        style={{
          opacity: headerFadeAnim,
          transform: [{ translateY: headerSlideAnim }],
        }}
        className="mb-10 w-full"
      >
        <Text 
          className="text-white text-center font-bold mb-3"
          style={{ fontSize: 42, lineHeight: 50, letterSpacing: -0.5 }}
        >
          Lost in Wonder?
        </Text>
        <Text 
          className="text-gray-400 text-center px-6"
          style={{ fontSize: 17, lineHeight: 24 }}
        >
          Let us guide you to history's doorstep
        </Text>
      </Animated.View>

      {/* MAIN CARD - Emerges second with scale and fade */}
      <Animated.View
        style={{
          opacity: cardFadeAnim,
          transform: [
            { scale: cardScaleAnim },
            { translateY: cardSlideAnim }
          ],
        }}
        className="w-full rounded-3xl overflow-hidden"
        // Premium shadow
        {...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 20 },
            shadowOpacity: 0.5,
            shadowRadius: 30,
          },
          android: {
            elevation: 24,
          },
        })}
      >
        <ImageBackground
          source={require('../../assets/sample-images/form-bg.png')}
          className="w-full"
          style={{ height: 420 }}
          resizeMode="cover"
        >
          {/* Premium gradient overlay */}
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.95)']}
            locations={[0, 0.5, 1]}
            className="flex-1 justify-between p-7"
          >
            {/* ICON - Pops and spins third */}
            <Animated.View
              style={{
                transform: [
                  { scale: iconScaleAnim },
                  { rotate: iconRotate }
                ],
              }}
              className="self-start"
            >
              <View 
                className="bg-purple-600 p-3 rounded-2xl"
                style={{
                  shadowColor: '#8B5CF6',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.4,
                  shadowRadius: 16,
                }}
              >
                <Navigation color="white" size={26} strokeWidth={2.5} />
              </View>
            </Animated.View>

            {/* BOTTOM CONTENT */}
            <View>
              {/* Title and Description */}
              <View className="mb-6">
                <Text 
                  className="text-white font-bold mb-2"
                  style={{ fontSize: 32, lineHeight: 38, letterSpacing: -0.5 }}
                >
                  Find nearby landmarks
                </Text>
                <Text 
                  className="text-gray-200"
                  style={{ fontSize: 16, lineHeight: 22, opacity: 0.9 }}
                >
                  Discover historical sites and temples within walking distance
                </Text>
              </View>

              {/* BUTTON - Slides in last and pulses */}
              <Animated.View
                style={{
                  opacity: buttonFadeAnim,
                  transform: [
                    { translateY: buttonSlideAnim },
                    { scale: buttonPulseAnim }
                  ],
                }}
              >
                <Pressable
                  onPress={handleOpenMap}
                  className="bg-white rounded-2xl py-4 px-6 flex-row items-center justify-center gap-2 active:scale-95"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.25,
                    shadowRadius: 16,
                  }}
                >
                  <Text 
                    className="text-purple-900 font-bold"
                    style={{ fontSize: 17, letterSpacing: 0.2 }}
                  >
                    Explore Now
                  </Text>
                  <ArrowRight color="#581c87" size={20} strokeWidth={3} />
                </Pressable>
              </Animated.View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

export default TakeToLandmark;