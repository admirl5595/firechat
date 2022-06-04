import { ScrollView, Text } from "react-native";
import React from "react";
import PrimaryButton from "@components/PrimaryButton";
import IconButton from "@components/IconButton";
import Card from "@components/Card";
import Layout from "@components/Layout";
import StyledTextInput from "@components/StyledTextInput";
import HeaderAndIcon from "@components/HeaderAndIcon";
import Header from "@components/Header";
import HeaderSmall from "@components/HeaderSmall";
import SearchInput from "@components/SearchInput";
import Thumbnail from "@components/Thumbnail";
import UserPreview from "@components/UserPreview";
import AttributeText from "@components/AttributeText";
import Toggler from "@components/Toggler";

export default function Login() {
  return (
    <Layout>
      <ScrollView>
        <Thumbnail />
        <UserPreview fName="John" lName="Doe" />
        <AttributeText attribute="email" value="admir.norway@gmail.com" />
        <Toggler title="Dark-mode" />
        <HeaderSmall title="smol" />
        <Header title="Header" />
        <HeaderAndIcon icon="gear" iconColor="black" title="HEADER" />
        <PrimaryButton title="press" />
        <IconButton icon="magnifying-glass" />
        <Card />
        <StyledTextInput placeholder="placeholder" />
        <SearchInput title="Find user" placeholder="email" />
      </ScrollView>
    </Layout>
  );
}
