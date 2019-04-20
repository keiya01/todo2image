import * as React from "react";
import styled, { keyframes } from "styled-components";
import StylingButton from '../molecules/StylingButton';
import ColorButton from '../molecules/ColorButton';
import AdjustSizeButton from '../molecules/AdjustSizeButton';

const HeaderHeight = 40;

const SlideIn = keyframes`
  from {
    transform: translateY(-${HeaderHeight}px);
  }
  to {
    transform: translateY(0px);
  }
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.7);
  height: ${HeaderHeight}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  animation: ${SlideIn} 300ms ease-in;
  box-shadow: 0 1px 8px #777;
`;

interface EditorHeaderProps {
  visible: boolean;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ visible }) => {
  return (
    <Header style={{ display: visible ? "flex" : "none" }}>
      <StylingButton label="bold" font="BOLD" />
      <StylingButton label="italic" font="ITALIC" />
      <AdjustSizeButton/>
      <ColorButton />
    </Header>
  );
};

export default EditorHeader;