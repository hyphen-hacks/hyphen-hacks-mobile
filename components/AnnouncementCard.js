import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import Colors from "../constants/Colors";

export default class AnnouncementCard extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.content}>{this.props.content}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardColor,
    padding: 10,
    margin: 5,
    borderRadius: 3
  },
  title: {
    fontFamily: "space-mono",
    fontSize: 20
  },
  content: {
    fontFamily: "chivo-light",
    fontSize: 16 ,
    color: Colors.lightCardTextColor
  }
});