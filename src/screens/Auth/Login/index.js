import React, { useState } from "react";
import PrimaryButton from "@components/PrimaryButton";
import Layout from "@components/Layout";
import StyledTextInput from "@components/StyledTextInput";
import HeaderAndIcon from "@components/HeaderAndIcon";
import { View, Text } from "react-native";
import styles from "./style";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Layout>
      <HeaderAndIcon icon="comments" title="Login" iconColor="black" />

      <View style={styles.container}>
        <StyledTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="enter email"
        />
        <StyledTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="enter password"
        />

        <View style={styles.btnsContainer}>
          <PrimaryButton title="Login" />
          <Text style={styles.text}>Don't have an account?</Text>
          <PrimaryButton title="Sign up" />
        </View>
      </View>
    </Layout>
  );
}
