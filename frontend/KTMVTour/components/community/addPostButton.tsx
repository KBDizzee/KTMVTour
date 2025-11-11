import { View, Text, TouchableOpacity } from "react-native";
import { Plus } from "lucide-react-native";
import React from "react";

const AddPostButton = () => {
  return (
    <View>
      <TouchableOpacity
        className="w-[35px] h-[35px] rounded-xl bg-[#7B2FF7] justify-center items-center shadow-lg"
        style={{
          shadowColor: "#7B2FF7",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.6,
          shadowRadius: 20,
          elevation: 10,
        }}
        activeOpacity={0.8}
      >
        <Plus color={'white'}/>
      </TouchableOpacity>
    </View>
  );
};

export default AddPostButton;
