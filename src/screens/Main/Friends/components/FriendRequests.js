import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import FriendRequestsContext from "@services/contexts/FriendRequestsContext";

import { getUserData } from "@services/crud-operations/users";
import { acceptFR, declineFR } from "@services/crud-operations/friends";

import UserPreview from "@components/UserPreview";
import HeaderSmall from "@components/HeaderSmall";
import Card from "@components/Card";
import IconButton from "@components/IconButton";

export default function FriendRequests() {
  const [users, setUsers] = useState([]);
  const [showFR, setShowFR] = useState(false);
  const friendRequests = useContext(FriendRequestsContext);

  useEffect(() => {
    async function GetUsers() {
      let userData = [];

      for (const id of friendRequests) {
        let user = await getUserData(id);

        userData.push(user);
      }

      setUsers(userData);
    }
    GetUsers();
  }, [friendRequests]);

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.dropDown}>
          <HeaderSmall title={"Friend requests: " + friendRequests.length} />
          <IconButton
            icon={
              showFR && friendRequests.length > 0 ? "angle-up" : "angle-down"
            }
            onPress={() => {
              friendRequests.length > 0 ? setShowFR(!showFR) : null;
            }}
          />
        </View>
        {friendRequests.length > 0 && showFR ? (
          <FlatList
            data={users}
            renderItem={({ item }) => (
              <UserPreview
                fName={item.fName}
                lName={item.lName}
                accept={() => acceptFR(item.id)}
                decline={() => declineFR(item.id)}
              />
            )}
          />
        ) : null}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  dropDown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
