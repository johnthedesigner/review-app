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

import { requestCategories } from "../../actions";

// Redirect to login if there is no active session
// TODO: also check for expired token
const LoginRedirect = props => {
  if (!props.session || !props.session.id) {
    return <Redirect to="/login" />;
  } else {
    return null;
  }
};

export class Categories extends React.Component {
  componentDidMount() {
    this.props.requestCategories(this.props.session);
  }

  render() {
    let { categories, session } = this.props;
    console.log(categories);

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
            {_.map(this.props.categories, category => {
              return (
                <ListItem key={category.id}>
                  <Thumbnail
                    square
                    size={80}
                    source={{ uri: "http://placehold.it/80/80" }}
                  />
                  <Body>
                    <Text>{category.name}</Text>
                    <Text note>{category.desc}</Text>
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
    categories: state.categories,
    session: state.session
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestCategories: session => {
      dispatch(requestCategories(session));
    }
  };
};

const CategoriesContainer = connect(mapStateToProps, mapDispatchToProps)(
  Categories
);

export default CategoriesContainer;
