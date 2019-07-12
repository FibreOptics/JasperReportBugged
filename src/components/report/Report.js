import React from "react";
import Container from "@material-ui/core/Container";

const Report = props => {
  const { name } = props;
  return <Container>Report {name}</Container>;
};

export default Report;
