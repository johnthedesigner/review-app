import React from "react";
import { NativeRouter, Route, Link } from "react-router-native";
import { Button, Container, Footer, FooterTab, Icon, Text } from "native-base";

const NavItem = props => {
  const iconStyle = {
    color: "#FFFFFF"
  };

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
};

export default class FooterNav extends React.Component {
  render() {
    return (
      <Footer style={{ backgroundColor: "#BB6BD9" }}>
        <FooterTab>
          <NavItem icon="home" text="Home" to="/" />
          <NavItem icon="search" text="Search" to="/search" />
          <NavItem icon="list" text="Things" to="/things" />
        </FooterTab>
      </Footer>
    );
  }
}
