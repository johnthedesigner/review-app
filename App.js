import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Right,
  Title
} from "native-base";

import { store } from "./store";
import { tryLogin } from "./actions";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.submitCredentials = this.submitCredentials.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
  }

  updatePassword(value) {
    this.setState({ password: value });
  }

  updateUsername(value) {
    this.setState({ username: value });
  }

  submitCredentials() {
    store.dispatch(tryLogin(this.state));
  }

  render() {
    let { password, username } = this.state;
    // console.log(this.state);

    let appState = store.getState();
    let loggedInAs = appState.user ? appState.user.username : "";

    return (
      <Provider store={store}>
        <Container>
          <Header>
            <Left />
            <Body>
              <Title>Header</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input value={username} onChangeText={this.updateUsername} />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input
                  secureTextEntry
                  value={password}
                  onChangeText={this.updatePassword}
                />
              </Item>
              <Button
                block
                style={{ margin: 10 }}
                onPress={this.submitCredentials}
              >
                <Text>Submit</Text>
              </Button>
            </Form>
            <Text>Logged in as: {loggedInAs}</Text>
          </Content>
          <Footer>
            <FooterTab>
              <Button vertical>
                <Icon name="apps" />
                <Text>Apps</Text>
              </Button>
              <Button vertical>
                <Icon name="camera" />
                <Text>Camera</Text>
              </Button>
              <Button vertical active>
                <Icon active name="navigate" />
                <Text>Navigate</Text>
              </Button>
              <Button vertical>
                <Icon name="person" />
                <Text>Contact</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
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
