import React from "react";

import { Route } from "react-router-dom";
import CheckEmail from "../Child/CheckEmail";
import RegisterParent from "../Child/AddChild/ParentNotFound/ParentNotFound";
import Start from "../ChooseDaycare";

export default [
  <Route exact path="/" component={Start} />,
  // <Route exact path="/add-guardian" component={AddGuardian} />,
  <Route exact path="/childs/addChild" component={CheckEmail} />,
  <Route exact path="/childs/registerParent" component={RegisterParent} />
];
