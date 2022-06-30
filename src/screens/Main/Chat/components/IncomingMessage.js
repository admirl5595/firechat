import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import Thumbnail from "@components/Thumbnail";
import { getChatImage } from "@services/crud-operations/users";

import IconButton from "@components/IconButton";

export default function IncomingMessage({ message, source, chatId }) {
  const date = message.date;
  const author = message.author;

  const yyyy = date.getFullYear();
  const dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const mm =
    date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;

  const dateString = dd + "." + mm + "." + yyyy;

  const [image, setImage] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    async function GetImage() {
      const imageId = message.imageId;

      const imageUri = await getChatImage(chatId, imageId);

      setImage(imageUri);
    }

    if (message.imageId) {
      GetImage();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        style={styles.modalContainer}
      >
        <View style={styles.modalContainer}>
          <Image style={styles.imageLarge} source={{ uri: image }} />
          <IconButton
            backgroundColor="rgba(0,0,0,0.8)"
            onPress={() => setModalVisible(!modalVisible)}
            icon="xmark"
          />
        </View>
      </Modal>
      <View style={styles.messageContainer}>
        <Text>{author}</Text>
        {image ? (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image style={styles.image} source={{ uri: image }} />
          </TouchableOpacity>
        ) : null}

        {message.body && <Text style={styles.text}>{message.body}</Text>}
        <Text style={styles.dateText}>{dateString}</Text>
      </View>
      <Thumbnail source={source} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
  },
  text: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    fontSize: 16,
  },
  messageContainer: {
    width: "60%",
    marginLeft: "10%",
    marginBottom: "-5%",
  },
  dateText: {
    alignSelf: "flex-end",
    color: "rgba(0,0,0,0.5)",
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 5,
    borderRadius: 10,
  },
  imageLarge: {
    width: 300,
    height: 300,
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,.9)",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
