import * as React from "react";
import styled, { css } from "styled-components";
import { fadeIn } from "../../common/animation/fadeIn";
import { MainColor } from "../atoms/color";
import LongRadiusButton from "../molecules/LongRadiusButton";
import {isSmartphone} from "../../constants/userAgent";
import * as HTMLToImage from "html-to-image";

const { useState, useRef } = React;

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: ${MainColor};
  box-shadow: 0 2px 5px #aaa;
  border: none;
  font-weight: bold;
  color: #fff;
  font-size: 14px;
  opacity: 0.8;
  animation: ${fadeIn} 200ms ease-in;
  transition: transform 300ms ease-in;
  &:active {
    transform: scale(0.8);
  }
`;

const ImageModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 300ms ease;
`;

const ImageModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85%;
  height: 80%;
  background-color: #fff;
  text-align: center;
  border-radius: 5px;
`;

const SavedImage = styled.img`
  width: ${window.innerWidth * 0.5}px;
  height: ${window.innerHeight * 0.5}px;
  object-fit: cover;
  box-shadow: 0 0 8px #999;
`;

const Description = styled.p`
  font-size: 16px;
  color: #999;
  letter-spacing: 0.05em;
  margin-top: 30px;
`;

interface SaveImageButtonProps {
  toImageElement: HTMLDivElement | null;
}

const SaveImageButton: React.FC<SaveImageButtonProps> = ({ toImageElement }) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const savedImage = useRef("");

  const handleOnSaveImage = () => {
    if (!toImageElement) {
      return;
    }

    HTMLToImage.toPng(toImageElement).then(dataURI => {
      if (isSmartphone) {
        savedImage.current = dataURI;
        setIsVisibleModal(true);
        return;
      }
      const uri = dataURI.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
      window.open(uri);
    });
  }

  const handleOnCloseModal = () => {
    setIsVisibleModal(false);
  }

  if(!toImageElement) {
    return null;
  }

  return (
    <>
      <Button onClick={handleOnSaveImage}>保存</Button>
      {
        isVisibleModal
        &&
        <ImageModalContainer>
          <ImageModal style={{display: isVisibleModal ? "flex" : "none"}}>
            <div>
              <SavedImage src={savedImage.current} />
              <Description>画像を長押すると保存できます</Description>
              <LongRadiusButton text={"閉じる"} onClick={handleOnCloseModal} css={css`margin-top: 30px`} />
            </div>
          </ImageModal>
        </ImageModalContainer>
      }
    </>
  )
};

export default SaveImageButton;