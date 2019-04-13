import * as React from "react";
import { storiesOf } from "@storybook/react";
import HomeTopScreen from '../src/components/pages/HomeTopScreen';
import "../src/index.css";

storiesOf("Screen", module)
  .add("HomeTopScreen", () => <HomeTopScreen/>);