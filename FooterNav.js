import React from "react";
import { connect } from "react-redux";
import { NativeRouter, Route, Link } from "react-router-native";
import { Button, Container, Footer, FooterTab, Icon, Text } from "native-base";

const NavItem = props => {
  const iconStyle = {
    color: "#FFFFFF"
  };

  // TODO: Figure out if this is necessary now that "Log out has moved"
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
          <NavItem icon="contact" text="Profile" to="/profile" />
        </FooterTab>
      </Footer>
    );
  }
}

const FooterNavContainer = connect(null, null)(FooterNav);

export default FooterNavContainer;
