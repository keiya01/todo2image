import * as React from "react";
import styled, { css, keyframes } from "styled-components";
import { fadeIn } from "../../common/animation/fadeIn";
import { MainColor } from "../atoms/color";
import LongRadiusButton from "../molecules/LongRadiusButton";
import * as HTMLToImage from "html-to-image";

const { useState, useRef } = React;

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  height: 55px;
  width: 55px;
  border-radius: 50%;
  background-color: ${MainColor};
  box-shadow: 0 2px 5px #aaa;
  border: none;
  font-weight: bold;
  color: #fff;
  font-size: 14px;
  opacity: 0.8;
  animation: ${fadeIn} 200ms ease-in;
`;

const scaleAnimation = keyframes`
  0% {
    transform: translateY(-100%);
  }
  30% {
    transform: translateY(5%);
  }
  60% {
    transform: translateY(0%);
  }
  80% {
    transform: translateY(1%);
  }
  100% {
    transform: translateY(0);
  }
`;

const ImageModalContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
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
  animation: ${scaleAnimation} 500ms ease-out;
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
      const userAgent = navigator.userAgent.toLowerCase();
      const isSmartphone = userAgent.match(/iphone|ipad|android/);
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