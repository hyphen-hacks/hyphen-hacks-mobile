import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import Colors from "../constants/Colors";

import TabBarIcon from "../components/TabBarIcon";
import AnnouncementScreen from "../screens/AnnouncementScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import WorkshopsScreen from "../screens/WorkshopsScreen";
import MapScreen from "../screens/MapScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {},
});

const AnnouncementStack = createStackNavigator(
  {
    Announcements: AnnouncementScreen,
  },
  config
);

AnnouncementStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={"md-alert"}
    />
  )
};

AnnouncementStack.path = "";

const ScheduleStack = createStackNavigator(
  {
    Schedule: ScheduleScreen,
  },
  config
);

ScheduleStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-calendar"} />
  ),
  header: null
};

ScheduleStack.path = "";

const WorkshopsStack = createStackNavigator(
  {
    Workshops: WorkshopsScreen,
  },
  config
);

WorkshopsStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-hammer"} />
  ),
};

WorkshopsStack.path = "";

const MapStack = createStackNavigator(
  {
    Map: MapScreen,
  },
  config
);

MapStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-map"} />
  ),
};

MapStack.path = "";

const tabNavigator = createBottomTabNavigator(
  {
    AnnouncementStack,
    ScheduleStack,
    WorkshopsStack,
    MapStack
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: Colors.tabBar,
        borderTopColor: "transparent"
      }
    }
  }
);

tabNavigator.path = "";

export default tabNavigator;
