import * as React from "react";
import styled from "styled-components";
import StylingButton from '../molecules/StylingButton';
import ColorButton from '../molecules/ColorButton';
import AdjustSizeButton from '../molecules/AdjustSizeButton';

const checkPWA = () => {
  const isSmartphone = navigator.userAgent.toLowerCase().match(/iphone | android | ipad/) !== null;
  const isPWA = matchMedia("(display-mode: standalone)").matches;

  return isSmartphone && isPWA;
}

const isSmartphone = checkPWA();

const Header = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.7);
  height: ${isSmartphone ? 60 : 40}px;
  padding-top: ${isSmartphone ? 20 : 0}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 1px 8px #777;
`;

const EditorHeader: React.FC = () => {
  return (
    <Header>
      <StylingButton label="bold" font="BOLD" />
      <StylingButton label="italic" font="ITALIC" />
      <AdjustSizeButton />
      <ColorButton />
    </Header>
  );
};

export default React.memo(EditorHeader, () => true);