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
import FooterNav from "../../FooterNav";
import Thing from "./Thing";
import LoginRedirect from "../../LoginRedirect";

export class Things extends React.Component {
  componentDidMount() {
    this.props.requestThings(this.props.session);
  }

  render() {
    let { history, things, session } = this.props;

    return (
      <Container>
        <Content>
          <Header>
            <Left />
            <Body>
              <Title>Things</Title>
            </Body>
            <Right>
              <Link to="/things/new">
                <Text>New</Text>
              </Link>
            </Right>
          </Header>
          <LoginRedirect session={session} />
          <List>
            {_.map(this.props.things, thing => {
              return (
                <ListItem key={thing.id}>
                  <Thing
                    thing={thing}
                    onPress={() =>
                      history.push(`/things/${thing.id}/review-this`)
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Content>
        <FooterNav />
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    history: ownProps.history,
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
