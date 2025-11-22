import { View, Text, ActivityIndicator, Modal, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { Info, MapPin, LucideDot, Sparkles, XCircle } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { loadTensorflowModel, TensorflowModel } from "react-native-fast-tflite";
import RNFS from "react-native-fs";

const tours = () => {
  const device = useCameraDevice("back");

  const { hasPermission, requestPermission } = useCameraPermission();
  const cameraRef = useRef<Camera>(null);
  const intervalRef = useRef<any>(null);

  const [detected, setdetected] = useState(false);
  const [detectedLandmark, setDetectedLandmark] = useState("");
  const [noLandmarkDetected, setNoLandmarkDetected] = useState(false);
  const [model, setModel] = useState<TensorflowModel | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  //useEffect hook in React is a built-in hook that allows functional components to perform "side effects."
  //Side effects are operations that interact with the outside world or affect things beyond the component's direct rendering, such as:
  //Data fetching
  //DOM manipulation
  //Subscriptions
  //Timers
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
    loadModel();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [hasPermission]);

  useEffect(() => {
    // Start capturing frames once model is loaded
    if (isModelLoaded && hasPermission) {
      startFrameCapture();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isModelLoaded, hasPermission]);

  const loadModel = async () => {
    try {
      const modelPath = require("../../assets/model/model.tflite");
      const loadedModel = await loadTensorflowModel(modelPath);

      setModel(loadedModel);
      setIsModelLoaded(true);
      console.log("model loaded successfully");
    } catch (err: any) {
      console.error("err loading model:", err);
    }
  };

  const startFrameCapture = () => {
    // Capture n process frame every 1.5 sec:
    intervalRef.current = setInterval(() => {
      captureAndClassify();
    }, 1500);
  };

  const captureAndClassify = async () => {
    if (!cameraRef.current || !model || !isModelLoaded) return;

    try {
      // Take photo from camera
      const photo = await cameraRef.current.takePhoto({
        flash: "off",
        enableShutterSound: false,
      });

      // Run model on captured image:
      // Read the image file as base64
      const base64Image = await RNFS.readFile(photo.path, "base64");

      // Convert base64 to Uint8Array
      const binaryString = atob(base64Image);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Run model with the typed array
      const results = await model.run([bytes]);

      // update state w results:
      if (results && results.length > 0) {
        // Get the output tensor
        const output = results[0];

        // Find the index with highest value
        let maxIndex = 0;
        let maxValue = output[0];

        for (let i = 1; i < output.length; i++) {
          if (output[i] > maxValue) {
            maxValue = output[i];
            maxIndex = i;
          }
        }

        // Define your landmark labels
        const landmarkLabels = ["Boudha-stupa", "no-landmark"];

        const detectedLabel = landmarkLabels[maxIndex];

        if (detectedLabel === "no-landmark") {
          setdetected(false);
          setDetectedLandmark("");
          setNoLandmarkDetected(true)
        } else {
          setdetected(true);
          setDetectedLandmark(detectedLabel);
          setNoLandmarkDetected(false)
        }
      } else {
        setdetected(false);
        setDetectedLandmark("");
        setNoLandmarkDetected(false)
      }

      // Clean up the temporary photo file
      await RNFS.unlink(photo.path);
    } catch (err: any) {
      setdetected(false);
      setNoLandmarkDetected(false);
    }
  };
  if (hasPermission == null || !isModelLoaded) {
    return (
      <View className="flex items-center justify-center h-screen bg-black">
        <ActivityIndicator size={"large"} color={"#8B5CF6"} />
        <Text className="text-white mt-4">
          {!isModelLoaded ? "Loading model..." : "Requesting permissions..."}
        </Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View className="flex-1 items-center pt-8 bg-black h-screen">
        <Text className="text-xl font-bold text-white mt-14 text-center p-3">
          Camera permission is required. Please enable it in settings.
        </Text>
      </View>
    );
  }

  if (device == null) {
    return (
      <View className="flex-1 items-center pt-8 bg-black h-screen">
        <Text className="text-xl font-bold text-white mt-14 text-center">
          No camera device found
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center pt-8 bg-black">
      <View></View>
      {/* { hasPermission && <Text className="text-3xl font-bold text-white mt-14 mb-6 text-center">Scan a landmark to receive a Virtual Tour!</Text>} */}
      <View style={{ position: "absolute", inset: 0 }}>
        <Camera
          ref={cameraRef}
          device={device}
          isActive={true}
          photo={true}
          style={{ height: "100%", width: "100%" }}
        />
      </View>

      <View className="flex-1 items-center justify-center mb-[120px]">
        {/* CTA Text */}
        <View className="items-center mb-10">
          <View className="bg-transparent border border-button rounded-2xl flex-row items-center gap-2 px-4 py-2">
            <Sparkles color={"#8B5CF6"} size={20} />
            <Text className="text-white font-semibold">
              Point Camera at a landmark
            </Text>
          </View>
        </View>

        {/* No Landmark Indicator */}
        {noLandmarkDetected && (
          <View className="items-center mb-6">
            <View className="bg-red-500/20 border border-red-500/50 rounded-xl flex-row items-center gap-2 px-4 py-2">
              <XCircle color={"#EF4444"} size={18} />
              <Text className="text-red-400 font-medium">
                No landmark detected
              </Text>
            </View>
          </View>
        )}

        {/* Scan area overlay */}
        <View style={{ width: "90%", aspectRatio: 1, position: "relative" }}>
          {/* Top-left corner */}
          <View className="h-[25%] w-[25%] border-t-4 border-l-4 border-button absolute top-0 left-0" />
          {/* Top-right corner */}
          <View className="h-[25%] w-[25%] border-t-4 border-r-4 border-button absolute top-0 right-0" />
          {/* Bottom-left corner */}
          <View className="h-[25%] w-[25%] border-b-4 border-l-4 border-button absolute bottom-0 left-0" />
          {/* Bottom-right corner */}
          <View className="h-[25%] w-[25%] border-b-4 border-r-4 border-button absolute bottom-0 right-0" />
        </View>
      </View>

      {/* Card {no detection}*/}
      {!detected && (
        <LinearGradient
          colors={[
            "rgba(25, 25, 35, 0.9)",
            "rgba(15, 15, 25, 0.85)",
            "rgba(20, 10, 30, 0.8)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: "95%",
            position: "absolute",
            bottom: 24,
            borderRadius: 20,
            padding: 16,
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.15)",
            overflow: "hidden",
          }}
        >
          {/* Card Content */}
          <View style={{ paddingLeft: 12 }}>
            <View className="flex-row gap-3 items-center mb-3">
              <View className="bg-fifth p-2 rounded-xl">
                <Info size={18} color={"#8B5CF6"} />
              </View>
              <Text className="text-white font-semibold text-xl">
                How it Works
              </Text>
            </View>

            <View>
              <View className="flex-row gap-2 items-center mb-1">
                <LucideDot color={"#fff"} />
                <Text className="text-secondary">
                  Point your camera at a recognised landmark
                </Text>
              </View>
              <View className="flex-row gap-2 items-center mb-1">
                <LucideDot color={"#fff"} />
                <Text className="text-secondary">
                  Custom model will identify the location
                </Text>
              </View>
              <View className="flex-row gap-2 items-center">
                <LucideDot color={"#fff"} />
                <Text className="text-secondary">
                  Get instant access to AR virtual tours
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      )}

      {/* Detected card */}
      {detected && (
        <LinearGradient
          colors={[
            "rgba(25, 25, 35, 0.9)",
            "rgba(15, 15, 25, 0.85)",
            "rgba(20, 10, 30, 0.8)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: "95%",
            position: "absolute",
            bottom: 24,
            borderRadius: 20,
            padding: 16,
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.15)",
            overflow: "hidden",
          }}
        >
          {/* Card Content */}
          <View style={{ paddingLeft: 12 }}>
            <View className="flex-row gap-3 items-center mb-1">
              <View className="bg-fifth p-2 rounded-xl">
                <MapPin size={18} color={"#8B5CF6"} />
              </View>
              <Text className="text-white font-semibold text-xl">
                Landmark Detected!
              </Text>
            </View>

            <View className="items-center justify-center mb-1">
              <Text className="text-secondary font-semibold text-xl items-center">
                Detected Landmark: {detectedLandmark}
              </Text>
            </View>

            <View className="animate-pulse">
              <Pressable className="bg-button items-center justify-center flex-row gap-2 rounded-lg p-2">
                <View>
                  <Sparkles color={"#fff"} />
                </View>
                <Text className="text-white text-lg text-center font-semibold">
                  Start Virtual Tour
                </Text>
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

export default tours;
