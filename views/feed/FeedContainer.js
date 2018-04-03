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

// Redirect to login if there is no active session
// TODO: also check for expired token
const LoginRedirect = props => {
  if (!props.session || !props.session.id) {
    return <Redirect to="/login" />;
  } else {
    return null;
  }
};

const FiveStars = props => {
  // TODO: figure out what's going wrong when I move this into its own module
  // Supply a star rating value from state and an optional onPress
  let { value } = props;

  // Make clickable stars that highlight when active
  const Star = props => {
    let color = value >= props.starNumber ? "#F2C94C" : "#DDDDDD";
    return <Icon name="ios-star" style={{ color }} />;
  };

  return (
    <Row>
      <Star starNumber={1} />
      <Star starNumber={2} />
      <Star starNumber={3} />
      <Star starNumber={4} />
      <Star starNumber={5} />
    </Row>
  );
};

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
              if (item.thing && item.reviewer) {
                console.log(item.reviewer);
                return (
                  <ListItem key={item.id}>
                    <Grid>
                      <Col style={{ width: 70 }}>
                        <Thumbnail
                          size={80}
                          source={{ uri: "http://placehold.it/80/80" }}
                        />
                      </Col>
                      <Col>
                        <Body>
                          <Text>@{item.reviewer.username}</Text>
                          <Text note>{item.thing.name}</Text>
                          <FiveStars
                            value={item.rating}
                            style={{ margin: 10 }}
                          />
                          <Link to={`/reviews/${item.id}`}>
                            <Text>{item.content}</Text>
                          </Link>
                          <Text note>{moment(item.createdDate).fromNow()}</Text>
                        </Body>
                      </Col>
                    </Grid>
                  </ListItem>
                );
              } else {
                // TODO: Fix the back end to fix required fields
                return (
                  <ListItem key={item.id}>
                    <Grid>
                      <Row>
                        <Text key={item.id}>Missing thingId or reviewerId</Text>
                      </Row>
                    </Grid>
                  </ListItem>
                );
              }
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
