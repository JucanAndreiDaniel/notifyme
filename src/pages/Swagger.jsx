import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

import pathString from "../PathString";
import Header from "../sections/Header";

export default function Swagger() {
  return (
    <>
      <Header />
      <SwaggerUI url={pathString + "/static/API/NotifyMe.yaml"} />
    </>
  );
}
