import * as React from "react";
import styled, {keyframes} from "styled-components";
import StylingButton from '../molecules/StylingButton';
import ColorButton from '../molecules/ColorButton';
import AdjustSizeButton from '../molecules/AdjustSizeButton';

const HeaderHeight = 40;

const showHeader = keyframes`
  from {
    opacity: 0.2;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.7);
  height: ${HeaderHeight}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 1px 8px #777;
  animation: ${showHeader} 300ms ease-out;
`;

interface EditorHeaderProps {
  visible: boolean;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({visible}) => {
  console.log(visible)
  return ( 
    <Header style={{display: visible ? 'flex' : 'none'}}>
      <StylingButton label="bold" font="BOLD" />
      <StylingButton label="italic" font="ITALIC" />
      <AdjustSizeButton />
      <ColorButton />
    </Header>
  );
};

export default React.memo(EditorHeader, (prevProps, nextProps) => {
  return prevProps.visible === nextProps.visible;
});