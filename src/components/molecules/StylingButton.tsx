import * as React from "react";
import styled from "styled-components";
import { RichUtils } from 'draft-js';
import { EditorContext } from "../pages/CreateImageArea";

const { useContext } = React;

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
}

const getFontStyle = (font: "BOLD" | "ITALIC"): React.CSSProperties => {
  switch (font) {
    case "ITALIC": return { fontStyle: "italic" }
    case "BOLD": return { fontWeight: "bold" }
  }
}

const StylingButton: React.FC<StylingButtonProps> = ({ label, font }) => {
  const fontStyle = getFontStyle(font);
  const { editorState, setEditorState } = useContext(EditorContext);

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!editorState || !setEditorState) {
      return;
    }
    setEditorState(RichUtils.toggleInlineStyle(editorState, font));
    
    e.preventDefault();
  }

  return (
    <Button style={fontStyle} onMouseDown={handleOnClick}>
      {label}
    </Button>
  );
};

export default StylingButton;
