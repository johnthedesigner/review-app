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

import { postCategory } from "../../actions";
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

export class CreateCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      desc: ""
    };
    this.submitCategory = this.submitCategory.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  submitCategory() {
    let { name, desc } = this.state;
    let { history, session } = this.props;
    let reviewerId = session.userId;
    let category = {
      status: "published",
      name,
      desc,
      reviewerId
    };
    this.props.postCategory(category, session, history);
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
              <Title>New category</Title>
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
                    placeholder="Describe this category"
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
                  onPress={this.submitCategory}
                >
                  <Text>Submit category</Text>
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
    postCategory: (category, session, history) => {
      dispatch(postCategory(category, session, history));
    }
  };
};

const CreateCategoryContainer = connect(mapStateToProps, mapDispatchToProps)(
  CreateCategory
);

export default CreateCategoryContainer;
