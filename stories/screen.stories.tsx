import * as React from "react";
import { storiesOf } from "@storybook/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeTopScreen from '../src/components/pages/HomeTopScreen';
import "../src/index.css";

storiesOf("Screen", module)
  .add("HomeTopScreen", () => <Router><Route component={HomeTopScreen} /></Router>);