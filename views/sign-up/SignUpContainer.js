import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-native";
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Right,
  Text,
  Title
} from "native-base";

import { trySignUp } from "../../actions";

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: ""
    };
    this.submitSignUp = this.submitSignUp.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }

  updateEmail(value) {
    this.setState({ email: value });
  }

  updatePassword(value) {
    this.setState({ password: value });
  }

  updateUsername(value) {
    this.setState({ username: value });
  }

  submitSignUp() {
    let credentials = {
      email: this.state.email.toLowerCase(),
      username: this.state.username.toLowerCase(),
      password: this.state.password
    };
    this.props.trySignUp(credentials, this.props.history);
  }

  render() {
    let { email, password, username } = this.state;

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Sign up</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autocapitalize={false}
                autocorrect={false}
                autofocus={true}
                email
                value={email}
                onChangeText={this.updateEmail}
              />
            </Item>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                autocapitalize={false}
                autocorrect={false}
                autofocus={true}
                value={username}
                onChangeText={this.updateUsername}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry
                value={password}
                onChangeText={this.updatePassword}
              />
            </Item>
            <Button block style={{ margin: 10 }} onPress={this.submitSignUp}>
              <Text>Sign up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // session: state.session,
    // user: state.user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    trySignUp: (credentials, history) => {
      dispatch(trySignUp(credentials, history));
    }
  };
};

const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUpContainer;
