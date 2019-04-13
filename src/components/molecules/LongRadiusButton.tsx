import * as React from "react";
import styled, {FlattenSimpleInterpolation} from "styled-components";

const Button = styled.button`
  display: inline-block;
  width: 90%;
  max-width: 300px;
  border-radius: 30px;
  padding: 10px 0;
  text-align: center;
  background-color: #07c6a3;
  color: #fff;
  border: none;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 0 10px #aaa;
  ${(props: {css?: FlattenSimpleInterpolation}) => {
    return props.css || ``;
  }}
`;

interface LongRadiusButtonProps {
  text: string;
  onClick?: () => void;
  css?: FlattenSimpleInterpolation;
}

const LongRadiusButton: React.FC<LongRadiusButtonProps> = ({text, onClick, css}) => {

  return (
    <Button onClick={onClick} css={css}>{text}</Button>
  );
}

export default LongRadiusButton;