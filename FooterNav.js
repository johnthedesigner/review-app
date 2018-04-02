import React from "react";
import { NativeRouter, Route, Link } from "react-router-native";
import { Button, Container, Footer, FooterTab, Icon, Text } from "native-base";

const NavItem = props => {
  return (
    <Button vertical>
      <Link to={props.to}>
        <Icon name={props.icon} />
      </Link>
      <Link to={props.to}>
        <Text>{props.text}</Text>
      </Link>
    </Button>
  );
};
export default class FooterNav extends React.Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <NavItem icon="home" text="Home" to="/" />
          <NavItem icon="search" text="Search" to="/search" />
          <NavItem icon="list" text="Things" to="/things" />
        </FooterTab>
      </Footer>
    );
  }
}
