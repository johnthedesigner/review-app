import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import { Provider } from "react-redux";
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

import { store } from "./store";
import FeedContainer from "./views/feed/FeedContainer";
import ForgotPasswordContainer from "./views/forgot-password/ForgotPasswordContainer";
import LoginContainer from "./views/login/LoginContainer";
import SignUpContainer from "./views/sign-up/SignUpContainer";
import FooterNav from "./FooterNav";

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
        <NativeRouter>
          <Container>
            <Content>
              <Route exact path="/" component={FeedContainer} />
              <Route exact path="/login" component={LoginContainer} />
              <Route
                exact
                path="/forgot-password"
                component={ForgotPasswordContainer}
              />
              <Route exact path="/sign-up" component={SignUpContainer} />
            </Content>
            <FooterNav />
          </Container>
        </NativeRouter>
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
