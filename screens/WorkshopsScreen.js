import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions
} from "react-native";
import WorkshopCard from "../components/workshops/WorkshopCard";
import getWorkshops, { getSlotTimes } from "../firebase/Workshops";
import { ModalProvider, ModalConsumer } from '../components/workshops/modals/ModalContext';
import ModalRoot from '../components/workshops/modals/ModalRoot';
import Header from "../components/Header";
import Colors from "../constants/Colors";
import SlotTitle from "../components/workshops/SlotTitle";
import moment from "moment";
import NoData from "../components/NoData";
import Layout from "../constants/Layout";
import { Notifications } from "expo";

export default class WorkshopsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    workshops: [],
    refreshing: false,
    slots: {},
    error: false
  };

  handleWorkshops = () => {
    this.setState({ refreshing: true });
    getWorkshops().then((querySelector) => {
      let workshops = [];
      let i = 0;
      querySelector.forEach((doc) => {
        let data = doc.data();
        while (data.slot > workshops.length - 1) {
          i = 0;
          workshops.push({ slotNumber: workshops.length, slots: [], key: workshops.length.toString() });
        }
        data.key = i.toString();
        workshops[data.slot].slots.push(data);
        i++
      });
      console.log(Dimensions.get("window").width);
      getSlotTimes().then((querySelector) => {
        let slots = {};
        querySelector.forEach((doc) => {
          let data = doc.data();
          data.startTime = moment(data.startTime).format(Layout.isSmallDevice ? "ddd, h:mma" : "dddd, h:mma");
          data.endTime = moment(data.endTime).format("h:mma");
          slots[doc.id] = data;
        });
        this.setState({ workshops, refreshing: false, slots })
      }).catch(() => this.setState({ refreshing: false, error: true }));
    }).catch(() => this.setState({ refreshing: false, error: true }));
  };

  componentDidMount() {
    this.handleWorkshops();
    this.notificationSubscription = Notifications.addListener(() => this.props.navigation.navigate("Announcements"));
  }

  render() {
    return (
      <ModalProvider>
        <ModalRoot />
        <ModalConsumer>
          {({ showModal, hideModal }) => (
            <View style={styles.container}>
              <Header title={"Workshops"} />
              <FlatList
                contentContainerStyle={styles.contentContainer}
                refreshing={this.state.refreshing}
                onRefresh={this.handleWorkshops}
                data={this.state.workshops}
                ListEmptyComponent={() => <NoData error={this.state.error} />}
                renderItem={({ item }) => (
                  <View>
                    <SlotTitle number={item.slotNumber} slotData={this.state.slots[item.slotNumber]} />
                    <FlatList
                      scrollable={false}
                      data={item.slots}
                      ListEmptyComponent={() => <NoData error={this.state.error} align={"left"} />}
                      renderItem={({ item }) => (
                        <WorkshopCard
                          showModal={showModal}
                          data={item}
                          title={item.title}
                          onRequestClose={hideModal}
                        />
                      )}
                    />
                  </View>
                )}
              />
            </View>
          )}
        </ModalConsumer>
      </ModalProvider>
    )
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  contentContainer: {
    padding: 10
  }
});
