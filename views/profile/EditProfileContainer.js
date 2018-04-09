import React from "react";
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
  Image,
  Item,
  Label,
  Left,
  Picker,
  Right,
  Row,
  Text,
  Title
} from "native-base";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { ImagePicker, ImageManipulator } from "expo";

import { editUser } from "../../actions";
import FooterNav from "../../FooterNav";
import LoginRedirect from "../../LoginRedirect";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { session } = this.props;
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
          <Left />
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

mapStateToProps = (state, ownProps) => {
  return {
    session: state.session
  };
};

mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editUser: user => {
      dispatch(editUser(user));
    }
  };
};

const EditProfileContainer = connect(mapStateToProps, mapDispatchToProps)(
  EditProfile
);

export default EditProfileContainer;
