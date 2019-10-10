import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import Underline from "../Underline";
import Colors from "../../constants/Colors";

export default class SlotTitle extends React.Component {
  render() {
    let { slotData } = this.props;
    return (
      <View>
        <Text style={styles.text}>
          <Text style={styles.title}>Set {this.props.number}</Text>
          <Text> {slotData ? `(${slotData.startTime} - ${slotData.endTime})` : ""}</Text>
        </Text>
        <Underline text={"Set xxx"} margin={styles.text.margin} height={7} fontSize={styles.text.fontSize} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  text: {
    margin: 10,
    fontFamily: "space-mono",
    color: Colors.textColor,
    zIndex: 100,
    fontSize: 15
  },
  underline: {
    height: 5,
    bottom: 13,
    left: 10,
    position: "absolute",
    backgroundColor: Colors.logoYellow,
  }
});