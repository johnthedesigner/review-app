import React from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-native";
import _ from "lodash";
import cloudinary from "cloudinary-core";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { ImagePicker, ImageManipulator } from "expo";
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
import LoginRedirect from "../../LoginRedirect";

export class CreateThing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      desc: "",
      categoryId: null,
      image: null
    };
    this.submitThing = this.submitThing.bind(this);
    this.showImagePicker = this.showImagePicker.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  componentDidMount() {
    this.props.requestCategories(this.props.session);
  }

  submitThing() {
    let { categoryId, desc, image, name } = this.state;
    let { history, session } = this.props;
    let reviewerId = session.userId;
    let thing = {
      categoryId,
      desc,
      image,
      name,
      reviewerId,
      status: "published"
    };
    this.props.postThing(thing, session, history);
  }

  updateField(field, value) {
    let newState = {};
    newState[field] = value;
    this.setState(newState);
  }

  showImagePicker(e) {
    ImagePicker.launchImageLibraryAsync({
      quality: 0.9,
      base64: true
    })
      .then(result => {
        if (!result.cancelled) {
          ImageManipulator.manipulate(
            result.uri,
            [{ resize: { width: 400, height: 400 } }],
            { base64: true, compress: 0.7, format: "jpeg" }
          )
            .then(result => {
              this.setState({
                image: `data:image/jpg;base64,${result.base64}`
              });
            })
            .catch(error => {
              console.log("ImageManipulator error: ", error);
            });
        }
      })
      .catch(error => {
        console.log("ImagePicker error: ", error);
      });
  }

  render() {
    let { categories, session } = this.props;
    let textBoxStyles = {
      backgroundColor: "#FFFFFF",
      marginTop: 5,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 20
    };

    return (
      <Container>
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
        <Content>
          <Grid>
            <Col style={{ margin: 10 }}>
              <Row style={{ flex: 1 }}>
                <Col>
                  <Label>Select a thumbnail image</Label>
                  <Row style={{ marginBottom: 20 }}>
                    <Image
                      style={{ width: 80, height: 80 }}
                      source={{
                        uri: this.state.image || "http://placehold.it/50x50"
                      }}
                    />
                    <Button transparent onPress={this.showImagePicker}>
                      <Text>Choose</Text>
                    </Button>
                  </Row>
                  <Row style={{ marginBottom: 20 }}>
                    <Col>
                      <Label>Select a category</Label>
                      <Picker
                        renderHeader={backAction => (
                          <Header>
                            <Left>
                              <Button transparent onPress={backAction}>
                                <Icon name="arrow-back" />
                              </Button>
                            </Left>
                            <Body style={{ flex: 3 }}>
                              <Title>Select a category</Title>
                            </Body>
                            <Right>
                              <Link to="/things/new-category">
                                <Text>New</Text>
                              </Link>
                            </Right>
                          </Header>
                        )}
                        mode="dropdown"
                        placeholder="Make a selection"
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
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: 20 }}>
                    <Col>
                      <Label>Name</Label>
                      <Item floatingLabel>
                        <Input
                          placeholder="Name it"
                          onChange={e => {
                            this.updateField("name", e.nativeEvent.text);
                          }}
                          value={this.state.name}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: 20 }}>
                    <Col>
                      <Label>Description</Label>
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
