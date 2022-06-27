import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import StyledTextInput from "@components/StyledTextInput";
import IconButton from "@components/IconButton";
import theme from "@res/theme";

import * as ImagePicker from "expo-image-picker";

// use onSubmit to
export default function InputField({ onSubmit }) {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const imageUri = result.uri;

      setImage(imageUri);
    }
  };

  return (
    <View>
      {image ? <View style={styles.divider} /> : null}
      <Image
        style={image ? styles.image : null}
        source={image ? { uri: image } : null}
      />
      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage}>
          <FontAwesomeIcon
            style={styles.icon}
            icon="images"
            color={theme.colors.secondary}
            size={35}
          />
        </TouchableOpacity>
        <StyledTextInput
          flex={true}
          source={image}
          value={body}
          onChangeText={setBody}
        />
        <IconButton
          onPress={() => {
            setBody("");
            setImage("");
            onSubmit({ body: body, imageUri: image });
          }}
          icon="paper-plane"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
  },
  icon: {
    margin: 10,
  },
  image: {
    height: 100,
    width: 100,
    margin: 10,
    borderRadius: 10,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginTop: 10,
  },
});
