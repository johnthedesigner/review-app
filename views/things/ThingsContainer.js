import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-native";
import _ from "lodash";
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
  List,
  ListItem,
  Right,
  Text,
  Thumbnail,
  Title
} from "native-base";

import { requestThings } from "../../actions";

// Redirect to login if there is no active session
// TODO: also check for expired token
const LoginRedirect = props => {
  if (!props.session || !props.session.id) {
    return <Redirect to="/login" />;
  } else {
    return null;
  }
};

export class Things extends React.Component {
  componentDidMount() {
    this.props.requestThings(this.props.session);
  }

  render() {
    let { things, session } = this.props;

    return (
      <Container>
        <Content>
          <Header>
            <Left />
            <Body>
              <Title>Things</Title>
            </Body>
            <Right>
              <Link to="/">
                <Text>New</Text>
              </Link>
            </Right>
          </Header>
          <LoginRedirect session={session} />
          <List>
            {_.map(this.props.things, thing => {
              return (
                <ListItem key={thing.id}>
                  <Thumbnail
                    square
                    size={80}
                    source={{ uri: "http://placehold.it/80/80" }}
                  />
                  <Body>
                    <Text>{thing.name}</Text>
                    <Text note>{thing.desc}</Text>
                  </Body>
                  <Link to={`/things/${thing.id}/review-this`}>
                    <Text>Review this</Text>
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    things: _.map(state.thingsList, thingId => {
      return state.thingsById[thingId];
    }),
    session: state.session
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestThings: session => {
      dispatch(requestThings(session));
    }
  };
};

const ThingsContainer = connect(mapStateToProps, mapDispatchToProps)(Things);

export default ThingsContainer;
