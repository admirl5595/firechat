import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import FriendsContext from "@services/contexts/FriendsContext";

import UserPreview from "@components/UserPreview";
import HeaderAndIcon from "@components/HeaderAndIcon";
import Layout from "@components/Layout";
import Card from "@components/Card";
import HeaderSmall from "@components/HeaderSmall";
import IconButton from "@components/IconButton";
import FriendRequestsContext from "@services/contexts/FriendRequestsContext";
import {
  getUserData,
  getProfilePicture,
} from "@services/crud-operations/users";
import styles from "./style";

export default function Friends({ navigation }) {
  const friends = useContext(FriendsContext);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const friendRequests = useContext(FriendRequestsContext);

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
      setLoading(false);
    }

    setLoading(true);
    GetUserData();
  }, [friends]);

  return (
    <Layout>
      <IconButton
        size={35}
        round
        icon="plus"
        style={{ position: "absolute", right: "5%", bottom: "5%", zIndex: 1 }}
        onPress={() => navigation.navigate("AddFriend")}
      />
      <View
        style={{
          position: "absolute",
          right: "5%",
          bottom: "15%",
          zIndex: 1,
        }}
      >
        <Text style={{ ...styles.tagText, ...styles.friendRequestsTag }}>
          {friendRequests.length}
        </Text>
        <IconButton
          size={35}
          round
          icon="user-group"
          onPress={() => navigation.navigate("FriendRequests")}
        />
      </View>
      {friends.length > 0 ? (
        <>
          <View style={{ margin: 10 }}>
            <HeaderSmall title={"Friends: " + friends.length} />
          </View>
          {loading && <ActivityIndicator size="small" />}
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
        </>
      ) : !loading ? (
        <HeaderAndIcon
          title="You have no friends!"
          icon="face-grin-tears"
          iconColor="black"
        />
      ) : null}
      <View style={{ justifyContent: "center", alignItems: "center" }}></View>
    </Layout>
  );
}
