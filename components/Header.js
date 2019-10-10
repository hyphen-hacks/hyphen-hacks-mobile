import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text
} from "react-native";
import Underline from "./Underline";
import Colors from "../constants/Colors";

export default class Header extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.header}>
        <Text
          style={[styles.headerText, { marginRight: this.props.button ? styles.headerText.margin + 30 : styles.headerText.margin}]}
          numberOfLines={1}
          ellipsizeMode={"tail"}
        >
          {this.props.title}
        </Text>
        <Underline text={this.props.title} button={this.props.button} margin={styles.headerText.margin} height={10} fontSize={styles.headerText.fontSize} />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: Colors.tabBar,
  },
  headerText: {
    fontSize: 30,
    margin: 20,
    fontFamily: "space-mono",
    color: Colors.textColor,
    zIndex: 100
  }
});