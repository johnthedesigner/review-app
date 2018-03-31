import React from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import { Redirect } from "react-router-native";
import _ from "lodash";
import {
  Body,
  Col,
  Container,
  Content,
  Grid,
  Header,
  Left,
  Right,
  Text,
  Thumbnail,
  Title
} from "native-base";

import { requestReview } from "../../actions";

// Redirect to login if there is no active session
// TODO: also check for expired token
// TODO: Also include post login redirect
const LoginRedirect = props => {
  if (!props.session || !props.session.id) {
    return <Redirect to="/login" />;
  } else {
    return null;
  }
};

export class Review extends React.Component {
  componentDidMount() {
    this.props.requestReview(this.props.reviewId, this.props.session);
  }

  render() {
    let { review, reviewId, session } = this.props;
    if (review && review.id) {
      return (
        <Container>
          <LoginRedirect session={this.props.session} />
          <Header>
            <Left />
            <Body>
              <Title>Review</Title>
            </Body>
            <Right />
          </Header>
          <Content padder>
            <Grid>
              <Col style={{ width: 70 }}>
                <Thumbnail
                  size={80}
                  source={{ uri: "http://placehold.it/160" }}
                />
              </Col>
              <Col>
                <Body>
                  <Text>@username</Text>
                  <Text note>Lorem ipsum dolor sit amet</Text>
                </Body>
                <Image
                  source={{ uri: "http://placehold.it/400x200" }}
                  style={{ height: 200, width: null, flex: 1 }}
                />
                <Body>
                  <Text note>{review.thing.name}</Text>
                  <Text>{review.title}</Text>
                  <Text note>{review.content}</Text>
                </Body>
              </Col>
            </Grid>
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <Text>Loading...</Text>
        </Container>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let reviewId = ownProps.match.params.reviewId;
  let { reviewsById, session } = state;
  let review = reviewsById ? reviewsById[reviewId] : {};
  return {
    review,
    reviewId,
    session
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestReview: (reviewId, session) => {
      dispatch(requestReview(reviewId, session));
    }
  };
};

const ReviewContainer = connect(mapStateToProps, mapDispatchToProps)(Review);

export default ReviewContainer;
