import React from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import Colors from "../constants/Colors";

export default class EventCard extends React.Component {
  render() {
    return (
      <View style={[styles.container, { opacity: this.props.past ? 0.5 : 1 }]}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.content}>
          {this.props.startTime.format("dddd, h:mma")}
          {this.props.endTime !== this.props.startTime ? " - " + this.props.endTime.format("h:mma") : ""} in {this.props.location}
        </Text>
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
    fontSize: 16,
    color: Colors.lightCardTextColor
  }
});