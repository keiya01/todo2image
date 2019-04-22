import * as React from "react";
import {storiesOf} from "@storybook/react";
import EditorHeader from "../src/components/organisms/EditorHeader";

const handleOnClick = () => {}

storiesOf("Header", module)
.add("EditorHeader", () => <EditorHeader onClick={handleOnClick}/>);