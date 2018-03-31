// Renders a set of radio buttons for selecting star rating
// Requires a few props: onChange, value
import { Item, Radio } from "react-native";

const FiveStars = props => {
  const isRadioChecked = (radioValue, value) => {
    return radioValue === value ? true : false;
  };
  return (
    <Item>
      <Radio checked={isRadioChecked(1, props.value)} />
      <Radio checked={isRadioChecked(2, props.value)} />
      <Radio checked={isRadioChecked(3, props.value)} />
      <Radio checked={isRadioChecked(4, props.value)} />
      <Radio checked={isRadioChecked(5, props.value)} />
    </Item>
  );
};

export default FiveStars;
