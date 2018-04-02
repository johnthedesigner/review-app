import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-native";
import _ from "lodash";
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
            <Title>Feed</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <LoginRedirect session={session} />
          <List>
            {_.map(this.props.feed, item => {
              if (item.thing) {
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
                          <Text note>{item.thing.name}</Text>
                          <Link to={`/reviews/${item.id}`}>
                            <Text>{item.title}</Text>
                          </Link>
                          <Text note>{item.content}</Text>
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
                        <Text key={item.id}>No thingId</Text>
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
      "created"
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
