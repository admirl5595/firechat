import React, { useState } from "react";
import PrimaryButton from "@components/PrimaryButton";
import Layout from "@components/Layout";
import StyledTextInput from "@components/StyledTextInput";
import HeaderAndIcon from "@components/HeaderAndIcon";
import { View, Text } from "react-native";
import styles from "./style";
import ErrorMessage from "@components/ErrorMessage";
import { db, auth } from "@firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

import {
  verifyFName,
  verifyLName,
} from "@services/data-verification/user-data";

export default function Register({ navigation }) {
  const [error, setError] = useState({ errorType: "", errorMsg: "" });

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const register = () => {
    setError({ errorType: "", errorMsg: "" });

    if (!verifyFName(fName)) {
      setError({ errorType: "fName", errorMsg: "invalid first name" });
      return;
    }

    if (!verifyLName(lName)) {
      setError({ errorType: "lName", errorMsg: "invalid last name" });
      return;
    }

    if (email.length < 1) {
      setError({ errorType: "email", errorMsg: "enter email" });
      return;
    }

    if (password !== passwordConfirm) {
      setError({
        errorType: "password-confirm",
        errorMsg: "passwords don't match",
      });
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        // add user document to firebase
        const userDoc = {
          fName: fName,
          lName: lName,
          email: email,
          friends: [],
          chats: [],
          incomingFR: [],
          outgoingFR: [],
        };

        const docRef = await addDoc(collection(db, "users"), userDoc);

        console.log(docRef.id);
      })
      .catch((error) => {
        console.log(error.code);

        if (
          error.code.includes("missing-email") ||
          error.code.includes("invalid-email")
        ) {
          setError({ errorType: "email", errorMsg: "invalid email" });
        }

        if (error.code.includes("weak-password")) {
          setError({ errorType: "password", errorMsg: "weak password" });
        }
      });
  };

  return (
    <Layout scroll={true}>
      <HeaderAndIcon icon="comments" title="Sign up" iconColor="black" />
      <View style={styles.container}>
        {error.errorType === "fName" ? (
          <ErrorMessage error={error.errorMsg} />
        ) : null}

        <StyledTextInput
          value={fName}
          onChangeText={setFName}
          placeholder="first name"
          error={error.errorType === "fName" ? true : false}
        />
        {error.errorType === "lName" ? (
          <ErrorMessage error={error.errorMsg} />
        ) : null}
        <StyledTextInput
          value={lName}
          onChangeText={setLName}
          placeholder="last name"
          error={error.errorType === "lName" ? true : false}
        />

        {error.errorType === "email" ? (
          <ErrorMessage error={error.errorMsg} />
        ) : null}
        <StyledTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="email"
          error={error.errorType === "email" ? true : false}
        />

        {error.errorType === "password" ? (
          <ErrorMessage error={error.errorMsg} />
        ) : null}
        <StyledTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="enter password"
          error={error.errorType === "password" ? true : false}
        />

        {error.errorType === "password-confirm" ? (
          <ErrorMessage error={error.errorMsg} />
        ) : null}
        <StyledTextInput
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          placeholder="confirm password"
          error={error.errorType === "password-confirm" ? true : false}
        />

        <View style={styles.btnsContainer}>
          <PrimaryButton onPress={register} title="Sign up" />
          <Text style={styles.text}>Already have an account?</Text>
          <PrimaryButton
            onPress={() => navigation.navigate("Login")}
            title="Login"
          />
        </View>
      </View>
    </Layout>
  );
}
