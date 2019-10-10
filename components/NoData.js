import React from "react";
import {
  Text,
  StyleSheet
} from "react-native";
import Colors from "../constants/Colors";

export default class NoData extends React.Component {
  render() {
    return (
      <Text style={[styles.text, { textAlign: this.props.align || "center" }]}>
        {this.props.error ? "Oops! Something went wrong." : "Nothing to display"}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "chivo",
    fontSize: 20,
    textAlign: "center",
    margin: 20,
    color: Colors.textColor
  }
});