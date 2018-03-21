import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Form,
  Icon,
  Input,
  Item,
  Label,
  Text
} from "native-base";

import { tryLogin } from "../../actions";
export class Login extends React.Component {
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

  updatePassword(value) {
    this.setState({ password: value });
  }

  updateUsername(value) {
    this.setState({ username: value });
  }

  submitCredentials() {
    this.props.tryLogin(this.state);
  }

  render() {
    let { password, username } = this.state;
    let { user } = this.props;

    let loggedInAs = user ? `Logged in as: ${user.username}` : "not logged in";

    return (
      <Container>
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
          <Button block style={{ margin: 10 }} onPress={this.submitCredentials}>
            <Text>Log in</Text>
          </Button>
          <Button
            block
            transparent
            style={{ margin: 10 }}
            onPress={this.submitCredentials}
          >
            <Text>Forgot password</Text>
          </Button>
        </Form>
        <Text style={{ textAlign: "center" }}>Logged in as: {loggedInAs}</Text>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    session: state.session,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    tryLogin: credentials => {
      dispatch(tryLogin(credentials));
    }
  };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
