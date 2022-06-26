import { View, Text } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import PrimaryButton from "@components/PrimaryButton";
import { signOut } from "firebase/auth";
import { auth } from "@firebase-config";

import Layout from "@components/Layout";
import Toggler from "@components/Toggler";
import UserData from "@components/UserData";

import UserDataContext from "@services/contexts/UserDataContext";
import FriendsContext from "@services/contexts/FriendsContext";

import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@firebase-config";
import { getProfilePicture } from "@services/crud-operations/users";

import * as ImagePicker from "expo-image-picker";

export default function Settings() {
  const friends = useContext(FriendsContext);
  const { userData, setUserData } = useContext(UserDataContext);

  const [image, setImage] = useState(userData.profilePicture);

  const logout = () => {
    signOut(auth);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      let path = "profile-pictures/";
      let filename = auth.currentUser.uid;

      let storageRef = ref(storage, path + filename);

      const img = await fetch(result.uri);
      const bytes = await img.blob();

      await uploadBytes(storageRef, bytes);

      setImage(result.uri);
      // change profile picture in context
      setUserData((prevUserData) => ({
        ...prevUserData,
        profilePicture: result.uri,
      }));
    }
  };

  return (
    <Layout scroll={true}>
      <UserData
        userData={userData}
        image={image}
        pickImage={pickImage}
        friends={friends}
      />
      <Toggler
        title="Dark-mode"
        onValueChange={(isEnabled) =>
          isEnabled ? console.log("darkmode") : console.log("light mode")
        }
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PrimaryButton onPress={logout} title="Log out" />
      </View>
    </Layout>
  );
}
