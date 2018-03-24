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

import { tryLogin } from "../../actions";

const LoginRedirect = props => {
  if (props.session && props.session.id) {
    return <Redirect to="/" />;
  } else {
    return null;
  }
};

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
    let { session, user } = this.props;

    let loggedInAs = user ? `Logged in as: ${user.username}` : "not logged in";

    return (
      <Container>
        <LoginRedirect session={session} />
        <Header>
          <Left />
          <Body>
            <Title>Login</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
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
            <Button
              block
              style={{ margin: 10 }}
              onPress={this.submitCredentials}
            >
              <Text>Log in</Text>
            </Button>
          </Form>
          <Link to="/forgot-password">
            <Button block transparent style={{ margin: 10 }}>
              <Text>Forgot password</Text>
            </Button>
          </Link>
          <Link to="/register">
            <Button block transparent style={{ margin: 10 }}>
              <Text>Sign up</Text>
            </Button>
          </Link>
        </Content>
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
