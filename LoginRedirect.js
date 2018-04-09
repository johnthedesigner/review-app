import React from "react";
import { Redirect } from "react-router-native";

// TODO: also check for expired token
const LoginRedirect = props => {
  if (!props.session || !props.session.id) {
    return <Redirect to="/login" />;
  } else {
    return null;
  }
};

export default LoginRedirect;
