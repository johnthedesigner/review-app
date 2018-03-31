// Renders a set of radio buttons for selecting star rating
// Requires a few props: onPress, value
import React from "react";
import { Icon, Row } from "react-native";

const FiveStars = props => {
  // Supply a star rating value from state and an optional onPress
  let { onPress, value } = props;

  // Make clickable stars that highlight when active
  const Star = props => {
    let onStarPress = () => onPress(props.starNumber);
    let color = value >= props.starNumber ? "#F2C94C" : "#DDDDDD";
    return <Icon name="ios-star" style={{ color }} onPress={onStarPress} />;
  };

  return (
    <Row>
      <Star starNumber={1} />
      <Star starNumber={2} />
      <Star starNumber={3} />
      <Star starNumber={4} />
      <Star starNumber={5} />
    </Row>
  );
};

export default FiveStars;
