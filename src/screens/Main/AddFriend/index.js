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

export default function AddFriend() {
  const [users, setUsers] = useState([]);

  const friends = useContext(FriendsContext);

  const currentUser = auth.currentUser;

  // TODO: implement proper search functionality
  const findUser = async (fName) => {
    const usersCollectionRef = collection(db, "users");

    const capitalizedFName = fName.charAt(0).toUpperCase() + fName.slice(1);

    const q = query(usersCollectionRef, where("fName", "==", capitalizedFName));

    const data = await getDocs(q);

    // TODO: check if users are already friends and incoming and outgoing FR
    // store as: areFriends: <bool>, requestSent: <bool>, requestRecieved: <bool>
    let usersData = data.docs.map((doc) => ({
      ...doc.data(),
      areFriends: false,
      requestSent: false,
      requestRecieved: false,
    }));

    console.log(usersData);

    if (usersData.length === 0) {
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
              />
            );
          }

          return (
            <UserPreview
              fName={item.fName}
              lName={item.lName}
              add={() => addFriend(item.id)}
              key={item.id}
            />
          );
        }}
      />
    </Layout>
  );
}
