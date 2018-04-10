import React from "react";
import { Link } from "react-router-native";
import { connect } from "react-redux";
import {
  Body,
  Button,
  Col,
  Container,
  Content,
  Grid,
  Header,
  Input,
  Item,
  Label,
  Left,
  Picker,
  Right,
  Row,
  Text,
  Thumbnail,
  Title
} from "native-base";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { ImagePicker, ImageManipulator } from "expo";

import { updateUserData, requestUserData } from "../../actions";
import FooterNav from "../../FooterNav";
import LoginRedirect from "../../LoginRedirect";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      image: null,
      password1: null,
      password2: null
    };
    this.postUserUpdates = this.postUserUpdates.bind(this);
    this.showImagePicker = this.showImagePicker.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  componentDidMount() {
    this.props.requestUserData(this.props.session);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.email) {
      this.setState({
        email: nextProps.user.email,
        image: nextProps.user.image
      });
    }
  }

  postUserUpdates() {
    let { email, image, password1, password2 } = this.state;
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
    this.props.updateUser(user, session, history);
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
              this.props.updateUserData(
                {
                  image: `data:image/jpg;base64,${result.base64}`
                },
                this.props.session
              );
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
    let { session, user } = this.props;
    let { email, image, password1, password2 } = this.state;
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
            <Link to="/profile">
              <Text>Back</Text>
            </Link>
          </Left>
          <Body>
            <Title>Edit Profile</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <LoginRedirect session={session} />
          <Grid>
            <Col style={{ margin: 10 }}>
              <Row style={{ flex: 1 }}>
                <Col style={{ alignItems: "center" }}>
                  <Col
                    style={{
                      alignItems: "center",
                      marginTop: 20,
                      marginBottom: 20
                    }}
                  >
                    <Text style={{ marginBottom: 20 }}>@{user.username}</Text>
                    <Thumbnail
                      large
                      source={{
                        uri: this.state.image || "http://placehold.it/200x200"
                      }}
                    />
                    <Button transparent onPress={this.showImagePicker}>
                      <Text>Choose</Text>
                    </Button>
                  </Col>
                  <Row style={{ marginBottom: 20 }}>
                    <Col>
                      <Label>Email address</Label>
                      <Item floatingLabel>
                        <Input
                          onChange={e => {
                            this.updateField("email", e.nativeEvent.text);
                          }}
                          value={email}
                        />
                      </Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Button block onPress={this.submitThing}>
                  <Text>Update settings</Text>
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

mapStateToProps = (state, ownProps) => {
  return {
    session: state.session,
    user: state.user
  };
};

mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestUserData: session => {
      dispatch(requestUserData(session));
    },
    updateUserData: (user, session) => {
      dispatch(updateUserData(user, session));
    }
  };
};

const EditProfileContainer = connect(mapStateToProps, mapDispatchToProps)(
  EditProfile
);

export default EditProfileContainer;
