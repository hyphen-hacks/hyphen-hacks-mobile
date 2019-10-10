import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import WorkshopModal from "./WorkshopModal";
import Colors from "../../constants/Colors";

export default class WorkshopCard extends React.Component {
  modal = () => <WorkshopModal {...this.props.data} onRequestClose={this.props.onRequestClose} />;

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.props.showModal(this.modal)}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode={"tail"}>{this.props.title}</Text>
        <Text style={styles.content} numberOfLines={1} ellipsizeMode={"tail"}>Led by {this.props.data.leader}</Text>
      </TouchableOpacity>
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