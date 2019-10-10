import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import {
  registerForPushNotifications,
  getPreviousNotifications
} from "../firebase/Notifications";
import AnnouncementCard from "../components/AnnouncementCard";
import Header from "../components/Header";
import Colors from "../constants/Colors";
import NoData from "../components/NoData";
import { Ionicons } from "@expo/vector-icons";
import { Notifications } from "expo";

export default class AnnouncementScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    announcements: [],
    refreshing: false,
    error: false
  };

  handlePreviousAnnouncements = () => {
    this.setState({ refreshing: true });
    getPreviousNotifications().then((querySnapshot) => {
      let announcementArr = [];
      let i = 0;
      querySnapshot.forEach((doc) => {
        let announcement = doc.data();
        announcement.key = i.toString();
        announcementArr.push(announcement);
        i++
      });
      this.setState({ announcements: announcementArr, refreshing: false });
    }).catch(() => this.setState({ refreshing: false, error: true }));
  };

  handleHelpPress() {
    WebBrowser.openBrowserAsync(
      "https://hyphen-hacks2019.slack.com"
    );
  }

  componentDidMount() {
    registerForPushNotifications();
    this.notificationSubscription = Notifications.addListener(this.handlePreviousAnnouncements);
    this.handlePreviousAnnouncements();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header title={"Announcements"} button />
          <TouchableOpacity style={styles.helpIcon} onPress={this.handleHelpPress}>
            <Ionicons name={"md-help-circle-outline"} color={Colors.textColor} size={30} />
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={styles.flatList}
          refreshing={this.state.refreshing}
          onRefresh={this.handlePreviousAnnouncements}
          data={this.state.announcements}
          ListEmptyComponent={() => <NoData error={this.state.error} />}
          renderItem={({ item }) => <AnnouncementCard title={item.title} content={item.content} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  flatList: {
    padding: 10
  },
  header: {
    width: "100%"
  },
  helpIcon: {
    position: "absolute",
    right: 20,
    bottom: 20
  }
});
