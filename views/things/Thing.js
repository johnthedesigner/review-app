import React from "react";
import { Body, Left, Row, Text } from "native-base";
import { Link } from "react-router-native";

import QRThumbnail from "../../components/QRThumbnail";

const Thing = props => {
  let { thing } = props;

  return (
    <Row>
      <QRThumbnail id={thing.id} sourceURI={thing.image} />
      <Body style={{ marginLeft: 20, marginRight: 10 }}>
        <Left>
          <Text note>{thing.category.name}</Text>
          <Text>{thing.name}</Text>
          <Text note>{thing.desc}</Text>
        </Left>
      </Body>
    </Row>
  );
};

export default Thing;
