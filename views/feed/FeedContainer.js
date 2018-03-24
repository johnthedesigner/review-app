import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-native";
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

import { requestFeed } from "../../actions";

// Redirect to login if there is no active session
// TODO: also check for expired token
const LoginRedirect = props => {
  if (!props.session || !props.session.id) {
    return <Redirect to="/login" />;
  } else {
    return null;
  }
};

export class Feed extends React.Component {
  componentDidMount() {
    this.props.requestFeed(this.props.session);
  }

  render() {
    let { session } = this.props;

    return (
      <Container>
        <Content>
          <Header>
            <Left />
            <Body>
              <Title>Feed</Title>
            </Body>
            <Right />
          </Header>
          <LoginRedirect session={session} />
          <List>
            {_.map(this.props.feed, item => {
              console.log(item.thing);
              return (
                <ListItem key={item.id}>
                  <Thumbnail
                    square
                    size={80}
                    source={{ uri: "http://placehold.it/80/80" }}
                  />
                  <Body>
                    <Text note>{item.thing.name}</Text>
                    <Text>{item.title}</Text>
                    <Text note>{item.content}</Text>
                  </Body>
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
    feed: state.feed,
    session: state.session
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestFeed: session => {
      dispatch(requestFeed(session));
    }
  };
};

const FeedContainer = connect(mapStateToProps, mapDispatchToProps)(Feed);

export default FeedContainer;
