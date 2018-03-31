import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-native";
import _ from "lodash";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
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
  Radio,
  Right,
  Row,
  Text,
  Thumbnail,
  Title
} from "native-base";

import { postReview, requestThing } from "../../actions";

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
  let { onPress, value } = props;

  // Make clickable stars that highlight when active
  const Star = props => {
    let onStarPress = () => onPress(props.starNumber);
    let color = value >= props.starNumber ? "#F2C94C" : "#DDDDDD";
    return <Icon name="ios-star" style={{ color }} onPress={onStarPress} />;
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

export class ReviewThis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "TEMP", // TODO: Make sure title isn't required or eliminate
      content: "",
      rating: null
    };
    this.submitReview = this.submitReview.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  submitReview() {
    let { title, content, rating } = this.state;
    let { history, session } = this.props;
    let thingId = this.props.thing.id;
    let reviewerId = session.userId;
    let review = {
      title,
      content,
      rating,
      thingId,
      reviewerId
    };
    this.props.postReview(review, session, history);
  }

  updateField(field, value) {
    let newState = {};
    newState[field] = value;
    this.setState(newState);
  }

  componentDidMount() {
    this.props.requestThing(this.props.thing.id, this.props.session);
  }

  render() {
    let { thing, session } = this.props;
    let bodyForDisplay = "Lorem ipsum dolor sit amet.";
    let textBoxStyles = {
      backgroundColor: "#FFFFFF",
      marginTop: 5,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 20
    };

    return (
      <Container>
        <Content>
          <Header>
            <Left>
              <Link to={`/things/${thing.id}`}>
                <Text>Back</Text>
              </Link>
            </Left>
            <Body>
              <Title>Write a review</Title>
            </Body>
            <Right />
          </Header>
          <LoginRedirect session={session} />
          <Grid>
            <Col style={{ margin: 10 }}>
              <Row
                style={{
                  borderBottomColor: "#DDDDDD",
                  borderStyle: "solid",
                  borderBottomWidth: 1,
                  marginBottom: 10
                }}
              >
                <Thumbnail
                  square
                  size={80}
                  source={{ uri: "http://placehold.it/80/80" }}
                />
                <Body>
                  <Left>
                    <Text>{thing.name}</Text>
                    <Text note>{thing.desc}</Text>
                  </Left>
                </Body>
              </Row>
              <Row style={{ flex: 1 }}>
                <Col>
                  <FiveStars
                    value={this.state.rating}
                    onPress={value => {
                      this.updateField("rating", value);
                    }}
                  />
                  <AutoGrowingTextInput
                    style={textBoxStyles}
                    placeholder="Type your review here"
                    minHeight={100}
                    onChange={e => {
                      this.updateField("content", e.nativeEvent.text);
                    }}
                    value={this.state.content}
                  />
                </Col>
              </Row>
              <Row>
                <Button
                  block
                  disabled={!this.state.content || !this.state.rating}
                  onPress={this.submitReview}
                >
                  <Text>Submit review</Text>
                </Button>
              </Row>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    thing: state.thingsById
      ? state.thingsById[ownProps.match.params.thingId]
      : {},
    session: state.session
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postReview: (review, session, history) => {
      dispatch(postReview(review, session, history));
    },
    requestThing: (thingId, session) => {
      dispatch(requestThing(thingId, session));
    }
  };
};

const ReviewThisContainer = connect(mapStateToProps, mapDispatchToProps)(
  ReviewThis
);

export default ReviewThisContainer;
