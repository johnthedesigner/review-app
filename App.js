import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Icon,
  Left,
  Right,
  Title
} from "native-base";

import { persistor, store } from "./store";
import FeedContainer from "./views/feed/FeedContainer";
import LoginContainer from "./views/login/LoginContainer";
import ReviewContainer from "./views/review/ReviewContainer";
import SignUpContainer from "./views/sign-up/SignUpContainer";
import ThingsContainer from "./views/things/ThingsContainer";
import ReviewThisContainer from "./views/things/ReviewThisContainer";
import CreateThingContainer from "./views/things/CreateThingContainer";
import CreateCategoryContainer from "./views/things/CreateCategoryContainer";

export default class App extends React.Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NativeRouter>
            <Container>
              <Content>
                <Route exact path="/" component={FeedContainer} />
                <Route exact path="/login" component={LoginContainer} />
                <Route exact path="/sign-up" component={SignUpContainer} />
                <Route exact path="/things" component={ThingsContainer} />
                <Route
                  exact
                  path="/things/:thingId/review-this"
                  component={ReviewThisContainer}
                />
                <Route
                  exact
                  path="/reviews/:reviewId"
                  component={ReviewContainer}
                />
                <Route
                  exact
                  path="/things/new"
                  component={CreateThingContainer}
                />
                <Route
                  exact
                  path="/things/new-category"
                  component={CreateCategoryContainer}
                />
              </Content>
            </Container>
          </NativeRouter>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
