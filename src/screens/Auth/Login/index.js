import React, { useState } from "react";
import PrimaryButton from "@components/PrimaryButton";
import Layout from "@components/Layout";
import StyledTextInput from "@components/StyledTextInput";
import HeaderAndIcon from "@components/HeaderAndIcon";
import { View, Text } from "react-native";
import styles from "./style";
import ErrorMessage from "@components/ErrorMessage";
import { auth } from "@firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigation }) {
  const [error, setError] = useState({ errorType: "", errorMsg: "" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    console.log("logging in...");
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      if (
        error.code.includes("email") ||
        error.code.includes("user-not-found")
      ) {
        setError({ errorType: "email", errorMsg: "invalid email" });
      }

      if (
        error.code.includes("password") ||
        error.code.includes("internal-error")
      ) {
        setError({ errorType: "password", errorMsg: "invalid password" });
      }
      console.log(error.message);
    });
  };

  return (
    <Layout>
      <HeaderAndIcon icon="comments" title="Login" iconColor="black" />
      <View style={styles.container}>
        <ErrorMessage
          error={error.errorType === "email" ? error.errorMsg : ""}
        />
        <StyledTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="enter email"
          error={error.errorType === "email" ? true : false}
        />
        <ErrorMessage
          error={error.errorType === "password" ? error.errorMsg : ""}
        />
        <StyledTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="enter password"
          error={error.errorType === "password" ? true : false}
        />

        <View style={styles.btnsContainer}>
          <PrimaryButton onPress={login} title="Login" />
          <Text style={styles.text}>Don't have an account?</Text>
          <PrimaryButton
            onPress={() => navigation.navigate("Register")}
            title="Sign up"
          />
        </View>
      </View>
    </Layout>
  );
}
