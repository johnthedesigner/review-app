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
  Picker,
  Radio,
  Right,
  Row,
  Text,
  Thumbnail,
  Title
} from "native-base";

import { postThing, requestCategories } from "../../actions";
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

export class CreateThing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      desc: "",
      categoryId: null
    };
    this.submitThing = this.submitThing.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  componentDidMount() {
    this.props.requestCategories(this.props.session);
  }

  submitThing() {
    let { name, desc, categoryId } = this.state;
    let { history, session } = this.props;
    let reviewerId = session.userId;
    let thing = {
      status: "published",
      name,
      desc,
      reviewerId,
      categoryId
    };
    this.props.postThing(thing, session, history);
  }

  updateField(field, value) {
    let newState = {};
    newState[field] = value;
    this.setState(newState);
  }

  render() {
    let { categories, session } = this.props;
    console.log(categories.length);
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
              <Link to={"/things"}>
                <Text>Back</Text>
              </Link>
            </Left>
            <Body>
              <Title>New thing</Title>
            </Body>
            <Right />
          </Header>
          <LoginRedirect session={session} />
          <Grid>
            <Col style={{ margin: 10 }}>
              <Row style={{ flex: 1 }}>
                <Col>
                  <Picker
                    mode="dropdown"
                    placeholder="Select a category"
                    note={false}
                    selectedValue={this.state.categoryId}
                    onValueChange={value => {
                      this.updateField("categoryId", value);
                    }}
                    disabled={categories.length == 0}
                  >
                    {_.map(categories, category => {
                      return (
                        <Item
                          key={category.id}
                          label={category.name}
                          value={category.id}
                        />
                      );
                    })}
                  </Picker>
                  <Row>
                    <Link to="/things/new-category">
                      <Text>New category</Text>
                    </Link>
                  </Row>
                  <AutoGrowingTextInput
                    style={textBoxStyles}
                    placeholder="Name it"
                    minHeight={100}
                    onChange={e => {
                      this.updateField("name", e.nativeEvent.text);
                    }}
                    value={this.state.name}
                  />
                  <AutoGrowingTextInput
                    style={textBoxStyles}
                    placeholder="Describe this thing"
                    minHeight={100}
                    onChange={e => {
                      this.updateField("desc", e.nativeEvent.text);
                    }}
                    value={this.state.desc}
                  />
                </Col>
              </Row>
              <Row>
                <Button
                  block
                  disabled={
                    !this.state.name ||
                    !this.state.desc ||
                    !this.state.categoryId
                  }
                  onPress={this.submitThing}
                >
                  <Text>Submit thing</Text>
                </Button>
              </Row>
            </Col>
          </Grid>
        </Content>
        <FooterNav />
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: _.orderBy(
      _.map(state.categoriesList, categoryId => {
        return state.categoriesById[categoryId];
      }),
      "name",
      "asc"
    ),
    session: state.session
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postThing: (thing, session, history) => {
      dispatch(postThing(thing, session, history));
    },
    requestCategories: session => {
      dispatch(requestCategories(session));
    }
  };
};

const CreateThingContainer = connect(mapStateToProps, mapDispatchToProps)(
  CreateThing
);

export default CreateThingContainer;
