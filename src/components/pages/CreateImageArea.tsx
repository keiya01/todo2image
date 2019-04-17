import * as React from "react";
import styled from "styled-components";
import { EditorState, Editor } from "draft-js";
import EditorHeader from "../organisms/EditorHeader";
import "draft-js/dist/Draft.css";

const { useState, useRef } = React;

const Container = styled.div`
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
  const [isShowHeader, setIsShowHeader] = useState(false);
  const editor: React.RefObject<Editor> | null = useRef(null);

  const handleOnChange = (editorState: EditorState) => {
    setEditorState(editorState);
  }

  const handleOnClickFocus = () => {
    if (!editor.current) {
      return;
    }

    setIsShowHeader(true);
    editor.current.focus();
  }

  const currentEditorState = editorState.getCurrentContent();
  let styledEditorClassName = "";
  if(!currentEditorState.hasText()) {
    if(currentEditorState.getBlockMap().first().getType() !== "unstyled") {
      styledEditorClassName = "RichEditor-hidePlaceholder";
    }
  }

  return (
    <Container onClick={handleOnClickFocus}>
      <EditorHeader editorState={editorState} setEditorState={setEditorState} visible={isShowHeader} />
      <div className={styledEditorClassName}>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={handleOnChange}
          textAlignment="center"
          placeholder="TODOを入力"
        />
      </div>
    </Container>
  )
};

export default CreateImageArea;