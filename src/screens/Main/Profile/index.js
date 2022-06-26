import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { getUserData } from "@services/crud-operations/users";

import Layout from "@components/Layout";
import Thumbnail from "@components/Thumbnail";
import Card from "@components/Card";
import AttributeText from "@components/AttributeText";
import Header from "@components/Header";
import UserData from "@components/UserData";

export default function Profile() {
  const route = useRoute();

  const _userData = route.params.userData;
  const [userData, setUserData] = useState(_userData);

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <Layout>
      <UserData
        userData={userData}
        image={userData.profilePicture}
        friends={userData.friends}
      />
    </Layout>
  );
}
