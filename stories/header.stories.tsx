import * as React from "react";
import {storiesOf} from "@storybook/react";
import EditorHeader from "../src/components/organisms/EditorHeader";

storiesOf("Header", module)
.add("EditorHeader", () => <EditorHeader visible={true}/>);