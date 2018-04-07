// Renders a set of radio buttons for selecting star rating
// Requires a few props: onPress, value
import React from "react";
import { Thumbnail } from "native-base";
import QRCode from "react-native-qrcode";

const QRThumbnail = props => {
  console.log(props);
  // Supply a star rating value from state and an optional onPress
  let { id, sourceURI } = props;

  if (sourceURI) {
    return <Thumbnail source={{ uri: sourceURI }} large />;
  } else {
    return <QRCode value={id} size={80} bgColor="purple" fgColor="white" />;
  }
};

export default QRThumbnail;
