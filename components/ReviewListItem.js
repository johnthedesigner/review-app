import React from "react";
import { Body, Col, Icon, Grid, Row, Text, Thumbnail } from "native-base";
import { Link } from "react-router-native";
import moment from "moment";

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

const ReviewListItem = props => {
  let { review } = props;

  return (
    <Grid>
      <Col style={{ width: 70 }}>
        <Thumbnail size={80} source={{ uri: "http://placehold.it/80/80" }} />
      </Col>
      <Col>
        <Body>
          <Text>@{review.reviewer.username}</Text>
          <Text note>{review.thing.name}</Text>
          <FiveStars value={review.rating} style={{ margin: 10 }} />
          <Link to={`/reviews/${review.id}`}>
            <Text>{review.content}</Text>
          </Link>
          <Text note>{moment(review.createdDate).fromNow()}</Text>
        </Body>
      </Col>
    </Grid>
  );
};

export default ReviewListItem;
