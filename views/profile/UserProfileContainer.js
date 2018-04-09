import React from "react";
import { connect } from "react-redux";
import {
  Body,
  Button,
  Column,
  Container,
  Content,
  Grid,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Row,
  Tab,
  Tabs,
  Text,
  Thumbnail,
  Title
} from "native-base";
import { Link } from "react-router-native";

import { requestMyReviews, requestUserData } from "../../actions";
import FooterNav from "../../FooterNav";

const LoginRedirect = props => {
  if (!props.session || !props.session.id) {
    return <Redirect to="/login" />;
  } else {
    return null;
  }
};

class UserProfile extends React.Component {
  componentDidMount() {
    this.props.requestMyReviews(this.props.session);
    this.props.requestUserData(this.props.session);
  }

  render() {
    let { history, myReviews, session, user } = this.props;
    console.log(session);

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right>
            <Link to="/profile/edit">
              <Text>Edit</Text>
            </Link>
          </Right>
        </Header>
        <Content>
          <LoginRedirect session={session} />
          <Grid alignItems="center">
            <Row style={{ margin: 20 }}>
              <Thumbnail
                large
                source={{ uri: "http://placehold.it/400x400" }}
              />
            </Row>
            <Row>
              <Text>@{user.username}</Text>
            </Row>
            <Row>
              <Button
                bordered
                iconLeft
                small
                style={{ margin: 10 }}
                onPress={() => {
                  history.push("/profile/edit");
                }}
              >
                <Icon name="settings" />
                <Text>Edit Profile</Text>
              </Button>
            </Row>
            <Row>
              <Tabs>
                <Tab heading="Reviews">
                  <List>
                    {_.map(myReviews, review => {
                      return (
                        <ListItem key={review.id}>
                          <Text>{review.content}</Text>
                        </ListItem>
                      );
                    })}
                  </List>
                </Tab>
                <Tab heading="Activity" />
              </Tabs>
            </Row>
          </Grid>
        </Content>
        <FooterNav />
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    myReviews: _.orderBy(
      _.map(state.myReviews, reviewId => {
        return state.reviewsById[reviewId];
      }),
      "createdDate",
      "desc"
    ),
    session: state.session,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestMyReviews: session => {
      dispatch(requestMyReviews(session));
    },
    requestUserData: session => {
      dispatch(requestUserData(session));
    }
  };
};

const UserProfileContainer = connect(mapStateToProps, mapDispatchToProps)(
  UserProfile
);

export default UserProfileContainer;
