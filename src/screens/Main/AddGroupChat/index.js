import { View, Text } from "react-native";
import React, { useState } from "react";
import Layout from "@components/Layout";
import HeaderSmall from "@components/HeaderSmall";
import StyledTextInput from "@components/StyledTextInput";
import SearchInput from "@components/SearchInput";

export default function AddGroupChat({ navigation }) {
  const [name, setName] = useState("");

  const [userData, setUserData] = useState([1]);

  const submit = (fName) => {
    console.log(fName);
  };

  return (
    <Layout>
      <View style={{ marginLeft: 10, marginTop: 10 }}>
        <HeaderSmall title="Chat name" value={name} onChangeText={setName} />
      </View>
      <StyledTextInput placeholder="chat name" />
      <SearchInput
        title="Add users"
        placeholder="first name"
        onSubmit={(value) => submit(value)}
      />
      {userData.length ? <Text>data</Text> : <Text>nulll</Text>}
    </Layout>
  );
}
