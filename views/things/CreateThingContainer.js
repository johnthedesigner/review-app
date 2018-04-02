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

import { postThing } from "../../actions";
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
      desc: ""
    };
    this.submitThing = this.submitThing.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  submitThing() {
    let { name, desc } = this.state;
    let { history, session } = this.props;
    let reviewerId = session.userId;
    let thing = {
      status: "published",
      name,
      desc,
      reviewerId
    };
    this.props.postThing(thing, session, history);
  }

  updateField(field, value) {
    let newState = {};
    newState[field] = value;
    this.setState(newState);
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
        <Content>
          <Header>
            <Left>
              <Link to={"/things"}>
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
              <Row style={{ flex: 1 }}>
                <Col>
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
                  disabled={!this.state.name || !this.state.desc}
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
    session: state.session
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postThing: (thing, session, history) => {
      dispatch(postThing(thing, session, history));
    }
  };
};

const CreateThingContainer = connect(mapStateToProps, mapDispatchToProps)(
  CreateThing
);

export default CreateThingContainer;
