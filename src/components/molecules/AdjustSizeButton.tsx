import * as React from "react";
import styled from "styled-components";
import { RichUtils } from "draft-js";
import { EditorContext } from "../pages/CreateImageArea";
import { HeaderButton } from "../atoms/button";
import { fadeIn } from "../../common/animation/fadeIn";

const { useState, useContext } = React;

const ButtonContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const SizeSelect = styled.div`
  position: absolute;
  top: 35px;
  left: -42px;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around; 
  text-align: center;
  width: 130px;
  height: 150px;
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 1px 2px 5px #aaa;
  animation: ${fadeIn} 200ms ease-in;
`;

const SizeSelectItem = styled.p`
  display: inline-block;
  font-size: 16px;
  color: #555;
  letter-spacing: 0.05em;
  font-weight: bold;
`;

const AdjustSizeButton: React.FC = () => {
  const { editorState, setEditorState, visibleModals, handleOnToggleModal } = useContext(EditorContext);
  const [activeBlockType, setActiveBlockType] = useState("");

  const handleOnToggleSizeModal = () => {
    if (!visibleModals || !handleOnToggleModal) {
      return;
    }

    handleOnToggleModal({ type: "TOGGLE_SIZE_MODAL", visible: !visibleModals.sizeModal });
  }

  const handleOnChangeFontSize = (blockType: string) => (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    if (!editorState || !setEditorState) {
      return;
    }

    if (activeBlockType !== "" && activeBlockType === blockType) {
      setActiveBlockType("");
    } else {
      setActiveBlockType(blockType);
    }
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));

    e.preventDefault();
  }

  const sizeStyles = {
    "header-one": "large",
    "header-two": "mediam",
    "header-three": "small",
  }

  return (
    <ButtonContainer onClick={handleOnToggleSizeModal}>
      <HeaderButton
        style={{ opacity: activeBlockType !== "" ? 0.5 : 1 }}
      >
        size
      </HeaderButton>
      <SizeSelect
        style={{ display: visibleModals && visibleModals.sizeModal ? "flex" : "none" }}
      >
        {Object.keys(sizeStyles).map(blockType => (
          <SizeSelectItem
            key={blockType}
            style={{ opacity: activeBlockType === blockType ? 0.5 : 1 }}
            onMouseDown={handleOnChangeFontSize(blockType)}
          >
            {sizeStyles[blockType]}
          </SizeSelectItem>
        ))}
      </SizeSelect>
    </ButtonContainer >
  )
}

export default AdjustSizeButton;
