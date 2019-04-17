import * as React from "react";
import styled from "styled-components";
import { EditorState, RichUtils } from 'draft-js';

const { useState } = React;

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
  setEditorState?: React.Dispatch<React.SetStateAction<EditorState>>;
}

const getFontStyle = (font: "BOLD" | "ITALIC"): React.CSSProperties => {
  switch (font) {
    case "ITALIC": return { fontStyle: "italic" }
    case "BOLD": return { fontWeight: "bold" }
  }
}

const StylingButton: React.FC<StylingButtonProps> = ({ label, font, editorState, setEditorState }) => {
  const fontStyle = getFontStyle(font);
  const [isActive, setIsActive] = useState(false);

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!editorState || !setEditorState) {
      return;
    }
    setIsActive(prevState => !prevState);
    setEditorState(RichUtils.toggleInlineStyle(editorState, font));
  }

  return (
    <Button style={{...fontStyle, opacity: isActive ? 0.3 : 1 }} onMouseDown={handleOnClick}>
      {label}
    </Button>
  );
};

export default StylingButton;
