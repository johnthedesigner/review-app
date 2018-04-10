import React from "react";
import { TouchableOpacity } from "react-native";
import { Body, Left, Row, Text } from "native-base";
import { Link } from "react-router-native";

import QRThumbnail from "../../components/QRThumbnail";

const Thing = props => {
  let { onPress, thing } = props;

  return (
    <Row>
      <TouchableOpacity onPress={onPress}>
        <QRThumbnail id={thing.id} sourceURI={thing.image} />
      </TouchableOpacity>
      <Body style={{ marginLeft: 20, marginRight: 10 }}>
        <TouchableOpacity onPress={onPress}>
          <Left>
            <Text note>{thing.category.name}</Text>
            <Text>{thing.name}</Text>
            <Text note>{thing.desc}</Text>
          </Left>
        </TouchableOpacity>
      </Body>
    </Row>
  );
};

export default Thing;
