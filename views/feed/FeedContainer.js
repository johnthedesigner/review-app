import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-native";
import _ from "lodash";
import moment from "moment";
import {
  Body,
  Button,
  Col,
  Container,
  Content,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  List,
  ListItem,
  Right,
  Row,
  Text,
  Thumbnail,
  Title
} from "native-base";

import { requestFeed } from "../../actions";
import FooterNav from "../../FooterNav";
import LoginRedirect from "../../LoginRedirect";
import ReviewListItem from "../../components/ReviewListItem";

export class Feed extends React.Component {
  componentDidMount() {
    this.props.requestFeed(this.props.session);
  }

  render() {
    // console.log(this.props.feed);
    let { session } = this.props;

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <LoginRedirect session={session} />
          <List>
            {_.map(this.props.feed, item => {
              return (
                <ListItem key={item.id}>
                  <ReviewListItem review={item} />
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
    feed: _.orderBy(
      _.map(state.feed, reviewId => {
        return state.reviewsById[reviewId];
      }),
      "createdDate",
      "desc"
    ),
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
