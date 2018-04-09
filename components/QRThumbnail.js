// Renders a set of radio buttons for selecting star rating
// Requires a few props: onPress, value
import React from "react";
import { Thumbnail } from "native-base";
import QRCode from "react-native-qrcode";

const QRThumbnail = props => {
  // Supply a star rating value from state and an optional onPress
  let { id, size, sourceURI } = props;

  if (sourceURI) {
    return <Thumbnail square source={{ uri: sourceURI }} large />;
  } else {
    return (
      <QRCode value={id} size={size || 80} bgColor="purple" fgColor="white" />
    );
  }
};

export default QRThumbnail;
