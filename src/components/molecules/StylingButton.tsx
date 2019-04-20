import * as React from "react";
import { RichUtils } from 'draft-js';
import { EditorContext } from "../pages/CreateImageArea";
import { HeaderButton } from "../atoms/button";

const { useState, useContext } = React;

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
  const [isActive, setIsActive] = useState(false);
  const { editorState, setEditorState } = useContext(EditorContext);

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!editorState || !setEditorState) {
      return;
    }

    const currentInlineStyle = editorState.getCurrentInlineStyle();
    if(currentInlineStyle.has(font)) {
      setIsActive(false);
    }else {
      setIsActive(true);
    }
    
    setEditorState(RichUtils.toggleInlineStyle(editorState, font));
    
    e.preventDefault();
  }

  return (
    <HeaderButton style={{...fontStyle, opacity: isActive ? 0.5 : 1}} onMouseDown={handleOnClick}>
      {label}
    </HeaderButton>
  );
};

export default StylingButton;
