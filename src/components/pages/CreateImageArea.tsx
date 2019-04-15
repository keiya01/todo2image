import * as React from "react";
import styled from "styled-components";
import { EditorState, Editor } from "draft-js";

const { useState } = React;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 10px;
  cursor: text;
`;

const CreateImageArea: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleOnChange = (editorState: EditorState) => {
    setEditorState(editorState);
  }

  return (
    <Container>
      <Editor
        editorState={editorState}
        onChange={handleOnChange}
      />
    </Container>
  )
};

export default CreateImageArea;