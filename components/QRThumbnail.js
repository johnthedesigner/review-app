// Renders a set of radio buttons for selecting star rating
// Requires a few props: onPress, value
import React from "react";
import { Thumbnail } from "native-base";
import QRCode from "react-native-qrcode";

const QRThumbnail = props => {
  // Supply a star rating value from state and an optional onPress
  let { id, source } = props;

  if (source) {
    return <Thumbnail source size={80} />;
  } else {
    return <QRCode value={id} size={80} bgColor="purple" fgColor="white" />;
  }
};

export default QRThumbnail;
