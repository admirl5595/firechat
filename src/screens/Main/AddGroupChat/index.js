import { View, Text, FlatList } from "react-native";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import Layout from "@components/Layout";
import HeaderSmall from "@components/HeaderSmall";
import StyledTextInput from "@components/StyledTextInput";
import SearchInput from "@components/SearchInput";
import UserPreview from "@components/UserPreview";
import AddedUserPreview from "./components/AddedUserPreview";
import PrimaryButton from "@components/PrimaryButton";

import { db, auth } from "@firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getProfilePicture } from "@services/crud-operations/users";

export default function AddGroupChat({ navigation }) {
  const [name, setName] = useState("");

  const [users, setUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);

  const addedUserIds = [...addedUsers].map((user) => user.id);

  const currentUser = auth.currentUser;

  const findUser = async (fName) => {
    const usersCollectionRef = collection(db, "users");

    const capitalizedFName = fName.charAt(0).toUpperCase() + fName.slice(1);

    const q = query(usersCollectionRef, where("fName", "==", capitalizedFName));

    const data = await getDocs(q);

    let usersData = data.docs.map((doc) => ({
      ...doc.data(),
    }));

    // prevent own user from showing up
    usersData = usersData.filter((user) => user.id !== currentUser.uid);

    if (usersData.length === 0) {
      setUsers([]);
      return;
    }

    for (let user of usersData) {
      const profilePicture = await getProfilePicture(user.id);
      user.profilePicture = profilePicture;
    }

    setUsers(usersData);
  };

  const addGroupChat = () => {
    console.log("len: " + addedUsers.length);
    console.log(name);
  };

  return (
    <Layout>
      <View style={{ marginLeft: 10, marginTop: 10 }}>
        <HeaderSmall title="Chat name" />
      </View>
      <StyledTextInput
        value={name}
        onChangeText={setName}
        placeholder="chat name"
      />
      <View>
        <FlatList
          horizontal={true}
          data={addedUsers}
          renderItem={({ item }) => (
            <AddedUserPreview
              remove={(_user) =>
                setAddedUsers((prev) => prev.filter((user) => user !== _user))
              }
              userData={item}
            />
          )}
        />
      </View>
      <SearchInput
        title="Add users"
        placeholder="first name"
        onSubmit={(fName) => findUser(fName)}
      />
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserPreview
            source={item.profilePicture}
            fName={item.fName}
            lName={item.lName}
            onPress={() => {
              if (addedUsers.includes(item)) {
                setAddedUsers((prev) => prev.filter((user) => user !== item));
              } else {
                setAddedUsers((prev) => [...prev, item]);
              }
            }}
          >
            <Checkbox
              value={addedUserIds.includes(item.id)}
              onValueChange={() => {
                if (addedUsers.includes(item)) {
                  setAddedUsers((prev) => prev.filter((user) => user !== item));
                } else {
                  setAddedUsers((prev) => [...prev, item]);
                }
              }}
            />
          </UserPreview>
        )}
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <PrimaryButton title="Add group chat" onPress={addGroupChat} />
      </View>
    </Layout>
  );
}
