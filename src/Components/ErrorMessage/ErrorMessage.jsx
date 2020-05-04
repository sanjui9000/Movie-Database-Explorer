import React from "react";

import "./ErrorMessage.scss";

const ErrorMessage = ({ message }) => {
  return <h3 className="error">{message}</h3>;
};

export default ErrorMessage;
