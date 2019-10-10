import React from "react";
import {
  StyleSheet,
  View,
  Dimensions
} from "react-native";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";

export default class Underline extends React.Component {
  render() {
    let { text, margin, height, fontSize } = this.props;
    margin = margin || 0;
    height = height || 5;
    fontSize = fontSize || 20;
    let maxWidth = this.props.button ? Dimensions.get("window").width - 2 * margin - 30 : Dimensions.get("window").width - 2 * margin;
    return (
      <View style={[styles.underline, { width: Layout.underlineFormula(text, fontSize, maxWidth), maxWidth, left: margin, height, bottom: margin + 2 }]} />
    )
  }
}

const styles = StyleSheet.create({
  underline: {
    position: "absolute",
    backgroundColor: Colors.logoYellow,
  }
});