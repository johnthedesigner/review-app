import React from "react";
import { connect } from "react-redux";
import { NativeRouter, Route, Link } from "react-router-native";
import { Button, Container, Footer, FooterTab, Icon, Text } from "native-base";

import { logOut } from "./actions";

const NavItem = props => {
  const iconStyle = {
    color: "#FFFFFF"
  };

  if (props.to) {
    return (
      <Button vertical>
        <Link to={props.to}>
          <Icon name={props.icon} style={iconStyle} />
        </Link>
        <Link to={props.to}>
          <Text style={iconStyle}>{props.text}</Text>
        </Link>
      </Button>
    );
  } else if (props.onPress) {
    return (
      <Button vertical>
        <Icon name={props.icon} style={iconStyle} onPress={props.onPress} />
        <Text style={iconStyle} onPress={props.onPress}>
          {props.text}
        </Text>
      </Button>
    );
  } else {
    return null;
  }
};

class FooterNav extends React.Component {
  render() {
    const logOut = () => console.log("Log out");
    return (
      <Footer style={{ backgroundColor: "#BB6BD9" }}>
        <FooterTab>
          <NavItem icon="home" text="Home" to="/" />
          <NavItem icon="list" text="Things" to="/things" />
          <NavItem
            icon="close-circle"
            text="Log out"
            onPress={this.props.logOut}
          />
          <NavItem icon="contact" text="Profile" to="/profile" />
        </FooterTab>
      </Footer>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logOut: () => {
      dispatch(logOut());
    }
  };
};

const FooterNavContainer = connect(null, mapDispatchToProps)(FooterNav);

export default FooterNavContainer;
