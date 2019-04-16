import * as React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";
import { clickCircleAnimation } from "../../common/animation/clickCircle";

const { useRef } = React;

const ButtonHeight = 45;
const ButtonWidth = 300;
const Button = styled.div`
  position: relative;
  display: inline-block;
  width: ${ButtonWidth}px;
  height: ${ButtonHeight}px;
  border-radius: 30px;
  padding: 10px 0;
  text-align: center;
  background-color: #07c6a3;
  color: #fff;
  border: none;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 0 10px #aaa;
  cursor: pointer;
  ${(props: { css?: FlattenSimpleInterpolation }) => {
    return props.css || ``;
  }}
`;

const ClickAnimation = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 30px;
`;

interface LongRadiusButtonProps {
  text: string;
  onClick?: () => void;
  css?: FlattenSimpleInterpolation;
}

const LongRadiusButton: React.FC<LongRadiusButtonProps> = ({ text, onClick, css }) => {
  const clickAnimation: React.RefObject<HTMLCanvasElement> | null = useRef(null);

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { pageX, pageY } = event;
    clickCircleAnimation(clickAnimation.current, { x: pageX, y: pageY });
    setTimeout(() => {
      onClick && onClick();
    }, 100);
  }

  return (
    <Button onClick={handleOnClick} css={css}>
      <ClickAnimation
        ref={clickAnimation}
        width={ButtonWidth}
        height={ButtonHeight}
      />
      {text}
    </Button>
  );
}

export default LongRadiusButton;