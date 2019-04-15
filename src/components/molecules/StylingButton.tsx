import * as React from "react";
import styled from "styled-components";
import { EditorState, RichUtils } from 'draft-js';

const Button = styled.button`
  font-size: 16px;
  color: #fff;
  letter-spacing: 0.05em;
  background-color: transparent;
  border: none;
`;

interface StylingButtonProps {
  label: string;
  font: "BOLD" | "ITALIC";
  editorState?: EditorState;
  setEditorState?: (editorState?: EditorState) => void;
}

const getFontStyle = (font: "BOLD" | "ITALIC"): React.CSSProperties => {
  switch (font) {
    case "ITALIC": return { fontStyle: "italic" }
    case "BOLD": return { fontWeight: "bold" }
  }
}

const StylingButton: React.FC<StylingButtonProps> = ({ label, font, editorState, setEditorState}) => {
  const fontStyle = getFontStyle(font);

  const handleOnClick = () => {
    if(!editorState || !setEditorState) {
      return;
    }
    setEditorState(RichUtils.toggleInlineStyle(editorState, font));
  }
  
  return (
    <Button style={fontStyle} onClick={handleOnClick}>
      {label}
    </Button>
  );
};

export default StylingButton;
