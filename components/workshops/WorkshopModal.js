import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"
import Colors from "../../constants/Colors";
import Underline from "../Underline";

class WorkshopTemplate extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <TouchableOpacity style={styles.closeButton} onPress={this.props.onRequestClose}>
            <Ionicons name={"md-close-circle"} size={46} color={Colors.textColor} />
          </TouchableOpacity>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <View style={styles.paragraphSection}>
          <View>
            <Underline text={"Location"} margin={styles.sectionHeader.margin || 0} height={7} fontSize={styles.sectionHeader.fontSize} />
            <Text style={styles.sectionHeader}>Location</Text>
          </View>
          <Text style={styles.paragraph}>{this.props.location}</Text>
        </View>
        <View style={styles.paragraphSection}>
          <View>
            <Underline text={"Leader(s)"} margin={styles.sectionHeader.margin || 0} height={7} fontSize={styles.sectionHeader.fontSize} />
            <Text style={styles.sectionHeader}>Leader(s)</Text>
          </View>
          <Text style={styles.paragraph}>{this.props.leader}</Text>
        </View>
        <View style={styles.paragraphSection}>
          <View>
            <Underline text={"Description"} margin={styles.sectionHeader.margin || 0} height={7} fontSize={styles.sectionHeader.fontSize} />
            <Text style={styles.sectionHeader}>Description</Text>
          </View>
          <Text style={styles.paragraph}>{this.props.summary}</Text>
        </View>
      </ScrollView>
    );
  }
}

const WorkshopModal = (props) => (
  <Modal
    isOpen
    onRequestClose={props.onRequestClose}
    animationType={"slide"}
    transparent={false}
  >
    <WorkshopTemplate {...props} />
  </Modal>
);

export default WorkshopModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 15,
    backgroundColor: Colors.backgroundColor
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    paddingHorizontal: 30,
    fontFamily: "space-mono",
    color: Colors.textColor
  },
  sectionHeader: {
    fontFamily: "space-mono",
    fontSize: 20,
    paddingTop: 10,
    color: Colors.textColor
  },
  paragraph: {
    fontFamily: "chivo",
    paddingTop: 10,
    fontSize: 20,
    color: Colors.textColor
  },
  paragraphSection: {
    marginTop: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginLeft: 15,
    width: 55,
    height: 55,
  }
});