import { View, Text, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import FriendsContext from "@services/contexts/FriendsContext";

import UserPreview from "@components/UserPreview";
import HeaderAndIcon from "@components/HeaderAndIcon";
import Layout from "@components/Layout";
import PrimaryButton from "@components/PrimaryButton";
import Card from "@components/Card";
import HeaderSmall from "@components/HeaderSmall";

import FriendRequests from "./components/FriendRequests";
import {
  getUserData,
  getProfilePicture,
} from "@services/crud-operations/users";

export default function Friends({ navigation }) {
  const friends = useContext(FriendsContext);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function GetUserData() {
      let userData = [];

      let friendIds = friends.map((friend) => friend.id);

      for (const id of friendIds) {
        let user = await getUserData(id);
        let profilePicture = await getProfilePicture(id);

        userData.push({ ...user, profilePicture: profilePicture });
      }

      setUserData(userData);
    }

    GetUserData();
  }, [friends]);

  return (
    <Layout scroll={true}>
      {friends.length > 0 ? (
        <Card>
          <HeaderSmall title={"Friends: " + friends.length} />
          <FlatList
            data={userData}
            renderItem={({ item }) => (
              <UserPreview
                fName={item.fName}
                lName={item.lName}
                onPress={() =>
                  navigation.navigate("Profile", { userData: item })
                }
                source={item.profilePicture}
              />
            )}
          />
        </Card>
      ) : (
        <HeaderAndIcon
          title="You have no friends!"
          icon="face-grin-tears"
          iconColor="black"
        />
      )}
      <FriendRequests />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <PrimaryButton
          title="Add friend"
          onPress={() => navigation.navigate("AddFriend")}
        />
      </View>
    </Layout>
  );
}
