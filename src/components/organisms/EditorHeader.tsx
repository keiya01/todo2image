import * as React from "react";
import styled from "styled-components";
import StylingButton from '../molecules/StylingButton';
import { Editor, EditorState } from 'draft-js';
import ColorButton from '../molecules/ColorButton';

const Header = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

interface EditorHeaderProps {
  editorState?: EditorState;
  setEditorState?: (editor?: EditorState) => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({editorState, setEditorState}) => {
  return (
    <Header>
      <StylingButton label="bold" font="BOLD" editorState={editorState} setEditorState={setEditorState} />
      <StylingButton label="italic" font="ITALIC" editorState={editorState} setEditorState={setEditorState} />
      <ColorButton editorState={editorState} setEditorState={setEditorState} />
    </Header>
  );
};

export default EditorHeader;