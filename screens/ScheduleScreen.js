import React from 'react';
import {
  FlatList,
  StyleSheet,
  View
} from 'react-native';
import getEvents from "../firebase/Schedule";
import EventCard from "../components/EventCard";
import moment from "moment";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import NoData from "../components/NoData";
import { Notifications } from "expo";

export default class ScheduleScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  flatListRef = null;

  state = {
    events: [],
    refreshing: false,
    error: false,
    previousEvents: 0
  };

  handleEvents = () => {
    let events = [];
    let i = 0;
    let previousEvents = 0;
    let now = moment();

    this.setState({ refreshing: true });
    getEvents().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let event = doc.data();
        event.startTime = moment(event.startTime);
        event.endTime = event.endTime ? moment(event.endTime) : event.startTime;
        event.past = event.endTime - now < 0;
        if (event.past) {
          previousEvents++;
        }
        event.key = i.toString();
        events.push(event);
        i++;
      });
      events.sort((a, b) => {
        if (a.startTime > b.startTime) return 1;
        if (a.startTime < b.startTime) return -1;
        return 0;
      });
      this.setState({ events, refreshing: false, previousEvents });
    }).catch(() => this.setState({ refreshing: false, error: true }));
  };

  scrollToCurrent = () => {
    if (this.state.previousEvents > 0 && this.flatListRef) {
      this.flatListRef.scrollToIndex({ animated: true, index: this.state.previousEvents })
    }
  };

  componentDidMount() {
    this.handleEvents();
    this.notificationSubscription = Notifications.addListener(() => this.props.navigation.navigate("Announcements"));
  }

  componentDidUpdate() {
    setTimeout(this.scrollToCurrent, 500);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={"Schedule"} />
        <FlatList
          ref={(ref) => { this.flatListRef = ref }}
          contentContainerStyle={styles.contentContainer}
          refreshing={this.state.refreshing}
          onRefresh={this.handleEvents}
          data={this.state.events}
          ListEmptyComponent={() => <NoData error={this.state.error} />}
          renderItem={({ item }) => <EventCard {...item} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  contentContainer: {
    padding: 10
  }
});
