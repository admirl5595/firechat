import { FlatList } from "react-native";
import React, { useState, useContext } from "react";

import SearchInput from "@components/SearchInput";
import Layout from "@components/Layout";
import UserPreview from "@components/UserPreview";

import FriendsContext from "@services/contexts/FriendsContext";

import { db } from "@firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "@firebase-config";
import { addFriend, acceptFR } from "@services/crud-operations/friends";
import { getProfilePicture } from "@services/crud-operations/users";

export default function AddFriend() {
  const [users, setUsers] = useState([]);

  const friends = useContext(FriendsContext);

  const currentUser = auth.currentUser;

  const findUser = async (fName) => {
    const usersCollectionRef = collection(db, "users");

    const capitalizedFName = fName.charAt(0).toUpperCase() + fName.slice(1);

    const q = query(usersCollectionRef, where("fName", "==", capitalizedFName));

    const data = await getDocs(q);

    let usersData = data.docs.map((doc) => ({
      ...doc.data(),
      areFriends: false,
      requestSent: false,
      requestRecieved: false,
    }));

    // prevent own user from showing up
    usersData = usersData.filter((user) => user.id !== currentUser.uid);

    if (usersData.length === 0) {
      setUsers([]);
      return;
    }

    let friendsCopy = [...friends];

    const friendIds = friendsCopy.map((friend) => friend.id);

    usersData = usersData.map((user) => {
      if (friendIds.includes(user.id)) {
        user.areFriends = true;
      }
      if (user.incomingFR.includes(currentUser.uid)) {
        // request already sent
        user.requestSent = true;
      }

      if (user.outgoingFR.includes(currentUser.uid)) {
        // request recieved
        user.requestRecieved = true;
      }
      return user;
    });

    for (let user of usersData) {
      const profilePicture = await getProfilePicture(user.id);
      user.profilePicture = profilePicture;
    }

    setUsers(usersData);
  };

  return (
    <Layout>
      <SearchInput
        title="Find user"
        placeholder="first name"
        onSubmit={(fName) => findUser(fName)}
      />
      <FlatList
        data={users}
        renderItem={({ item }) => {
          if (item.areFriends) {
            return (
              <UserPreview
                fName={item.fName}
                lName={item.lName}
                text="Already friends"
                key={item.id}
                source={item.profilePicture}
              />
            );
          }

          if (item.requestSent) {
            return (
              <UserPreview
                fName={item.fName}
                lName={item.lName}
                text="Friend request sent"
                key={item.id}
                source={item.profilePicture}
              />
            );
          }

          if (item.requestRecieved) {
            return (
              <UserPreview
                fName={item.fName}
                lName={item.lName}
                accept={() => acceptFR(item.id)}
                decline={() => {}}
                key={item.id}
                source={item.profilePicture}
              />
            );
          }

          return (
            <UserPreview
              fName={item.fName}
              lName={item.lName}
              add={() => addFriend(item.id)}
              key={item.id}
              source={item.profilePicture}
            />
          );
        }}
      />
    </Layout>
  );
}
