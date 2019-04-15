import * as React from "react";
import styled, { css } from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { MainColor } from "../atoms/color";
import LongRadiusButton from "../molecules/LongRadiusButton";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${window.innerWidth - 30}px;
  height: ${window.innerHeight - 30}px;
  background-color: ${MainColor};
  box-shadow: 0 0 10px #aaa;
`;

const Contents = styled.div`
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 30px;
  color: #fff;
  letter-spacing: 0.1em;
`;

const HomeTopScreen: React.FC<RouteComponentProps> = ({history}) => {
  const handleOnClick = () => {
    history.push("create");
  };

  return (
    <Container>
      <Wrapper>
        <Contents>
          <Title>My Wallpaper</Title>
          <LongRadiusButton
            text="画像を作成する"
            css={css`margin: 0 auto; margin-top: 200px;`}
            onClick={handleOnClick}
          />
        </Contents>
      </Wrapper>
    </Container>
  );
};

export default HomeTopScreen;
