import {
  AppLoading, Notifications
} from "expo";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppNavigator from "./navigation/AppNavigator";
import Colors from "./constants/Colors";
import {registerForPushNotifications} from "./firebase/Notifications";

export default class App extends React.Component {
  state = {
    loading: true
  };

  async loadResourcesAsync() {
    await Promise.all([
      Font.loadAsync({
        ...Ionicons.font,
        "chivo": require("./assets/fonts/Chivo-Regular.ttf"),
        "chivo-light": require("./assets/fonts/Chivo-Light.ttf"),
        "space-mono": require("./assets/fonts/SpaceMono-Bold.ttf")
      }),
    ]);
  }

  handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
  }

  render() {
    if (this.state.loading && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={() => this.setState({ loading: false })}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.tabBar,
  },
});
