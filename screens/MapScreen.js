import React from "react";
import {
  Image,
  Dimensions,
  View,
  StyleSheet
} from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import map from "../assets/images/map.png";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import { Notifications } from "expo";

export default class MapScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    height: 0
  };

  componentDidMount() {
    this.notificationSubscription = Notifications.addListener(() => this.props.navigation.navigate("Announcements"));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} onLayout={(event) => this.setState({ height: event.nativeEvent.layout.height })}>
          <Header title={"Map"} />
        </View>
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height - this.state.height}
          imageWidth={Dimensions.get('window').width}
          imageHeight={Dimensions.get('window').width / 1738 * 1500}
        >
          <Image style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width / 1738 * 1500 }} source={map} />
        </ImageZoom>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: "flex-end",
    flexDirection: "row"
  },
  header: {
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: 1000
  }
});