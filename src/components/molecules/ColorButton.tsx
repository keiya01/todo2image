import * as React from "react";
import styled, { css, keyframes } from "styled-components";
import { EditorState, RichUtils, Modifier } from 'draft-js';
import { EditorContext } from "../pages/CreateImageArea";
import { fadeIn } from "../../common/animation/fadeIn";

const { useState, useContext } = React;

const ColorBoxStyle = css`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;

const ColorBoxContainer = styled.div`
  ${ColorBoxStyle}
  position: relative;
`;

const ColorBox = styled.div`
  ${ColorBoxStyle}
  box-shadow: 0 0 5px #aaa;
`;

const ColorModal = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  position: absolute;
  top: 40px;
  right: -20px;
  width: 160px;
  height: 210px;
  background-color: #fff;
  box-shadow: 1px 2px 5px #aaa;
  padding: 10px 5px;
  animation: ${fadeIn} 200ms ease-in;
`;

export const CustomStyleColor = {
  COLOR1: {
    color: "#ff0000"
  },
  COLOR2: {
    color: "#fc7100"
  },
  COLOR3: {
    color: "#00fc08"
  },
  COLOR4: {
    color: "#0025fc"
  },
  COLOR5: {
    color: "#fc00d6"
  },
  COLOR6: {
    color: "#ff3f86"
  },
  COLOR7: {
    color: "#000000"
  },
  COLOR8: {
    color: "#999999"
  },
  COLOR9: {
    color: "#dddddd"
  },
}

interface ColorButtonProps {
  editorState?: EditorState;
  setEditorState?: React.Dispatch<React.SetStateAction<EditorState>>;
}

const ColorButton: React.FC<ColorButtonProps> = () => {
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const { editorState, setEditorState, visibleModals, handleOnToggleModal } = useContext(EditorContext);

  const handleShowModal = () => {
    if (!visibleModals || !handleOnToggleModal) {
      return
    }

    handleOnToggleModal({ type: "TOGGLE_COLOR_MODAL", visible: !visibleModals.colorModal });
  }

  const handleChangeColor = (colorKey: string) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!editorState || !setEditorState) {
      return;
    }

    const selection = editorState.getSelection();

    const nextContentState = Object.keys(CustomStyleColor).reduce((contentState, color) => {
      return Modifier.removeInlineStyle(contentState, selection, color);
    }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      "change-inline-style"
    );

    const currentInlineStyle = editorState.getCurrentInlineStyle();

    if (!currentInlineStyle.has(colorKey)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, colorKey);
    }

    setSelectedColor(CustomStyleColor[colorKey].color);

    setEditorState(nextEditorState);

    e.preventDefault();
  }

  return (
    <ColorBoxContainer onClick={handleShowModal} style={{ backgroundColor: selectedColor }}>
      <ColorModal
        style={{ display: visibleModals && visibleModals.colorModal ? "flex" : "none" }}
      >
        {Object.keys(CustomStyleColor).map(colorKey => (
          <ColorBox
            key={colorKey}
            onMouseDown={handleChangeColor(colorKey)}
            style={{ backgroundColor: CustomStyleColor[colorKey].color, margin: "0 10px" }}
          />
        ))}
      </ColorModal>
    </ColorBoxContainer>
  );
}

export default ColorButton;
