import * as React from "react";
import styled from "styled-components";
import { fadeIn } from "../../common/animation/fadeIn";
import {MainColor} from "../atoms/color";
import * as HTMLToImage from "html-to-image";

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: ${MainColor};
  box-shadow: 0 2px 5px #aaa;
  border: none;
  font-weight: bold;
  color: #fff;
  font-size: 15px;
  opacity: 0.8;
  animation: ${fadeIn} 200ms ease-in;
`;

interface SaveImageButtonProps {
  toImageElement: HTMLDivElement | null;
}

const SaveImageButton: React.FC<SaveImageButtonProps> = ({toImageElement}) => {

  const handleOnSaveImage = () => {
    if(!toImageElement) {
      return;
    }
    HTMLToImage.toPng(toImageElement).then(dataURI => {
      const uri = dataURI.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
      window.open(uri);
    });
  }

  return (
    <Button onClick={handleOnSaveImage}>保存</Button>
  )
};

export default SaveImageButton;