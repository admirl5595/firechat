import { View, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import FriendRequestsContext from "@services/contexts/FriendRequestsContext";

import { getUserData } from "@services/crud-operations/users";
import { acceptFR, declineFR } from "@services/crud-operations/friends";

import UserPreview from "@components/UserPreview";
import HeaderSmall from "@components/HeaderSmall";
import Card from "@components/Card";
import IconButton from "@components/IconButton";
import Layout from "@components/Layout";
import styles from "./style";

export default function FriendRequests() {
  const [users, setUsers] = useState([]);
  const friendRequests = useContext(FriendRequestsContext);

  // TODO: if friendRequests, add loading indicator
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
    <Layout>
      <View style={styles.container}>
        <Card>
          <HeaderSmall title={"Friend requests: " + friendRequests.length} />

          {friendRequests.length > 0 ? (
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
    </Layout>
  );
}
