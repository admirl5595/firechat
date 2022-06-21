import { View, Text, FlatList } from "react-native";
import React, { useContext } from "react";
import FriendsContext from "@services/contexts/FriendsContext";

import UserPreview from "@components/UserPreview";
import HeaderAndIcon from "@components/HeaderAndIcon";
import Layout from "@components/Layout";
import PrimaryButton from "@components/PrimaryButton";

export default function Friends({ navigation }) {
  const friends = useContext(FriendsContext);

  return (
    <Layout>
      {friends.length > 0 ? (
        <FlatList
          data={friends}
          renderItem={({ item }) => (
            <UserPreview fName={item.fName} lName={item.lName} />
          )}
        />
      ) : (
        <HeaderAndIcon
          title="You have no friends"
          icon="face-grin-tears"
          iconColor="black"
        />
      )}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <PrimaryButton
          title="Add friend"
          onPress={() => navigation.navigate("AddFriend")}
        />
      </View>
    </Layout>
  );
}
