import * as React from "react";
import styled, { css, keyframes } from "styled-components";
import { EditorState } from 'draft-js';

const { useState } = React;

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

const showModal = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
  animation: ${showModal} 200ms ease-in;
`;

const Colors = [
  "#ff0000",
  "#fc7100",
  "#00fc08",
  "#0025fc",
  "#fc00d6",
  "#ff3f86",
  "#000000",
  "#999999",
  "#dddddd",
];

interface ColorButtonProps {
  editorState?: EditorState;
  setEditorState?: (editor?: EditorState) => void;
}

const ColorButton: React.FC<ColorButtonProps> = () => {
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [visible, setVisible] = useState(false);

  const handleShowModal = () => {
    setVisible(prevState => !prevState);
  }

  const handleChangeColor = (color: string) => () => {
    setSelectedColor(color);
  }

  return (
    <ColorBoxContainer onClick={handleShowModal} style={{ backgroundColor: selectedColor }}>
      <ColorModal style={{ display: visible ? "flex" : "none" }}>
        {Colors.map(color => (
          <ColorBox onClick={handleChangeColor(color)} style={{ backgroundColor: color, margin: "0 10px" }} />
        ))}
      </ColorModal>
    </ColorBoxContainer>
  );
}

export default ColorButton;
