import * as React from "react";
import styled, { css } from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { MainColor } from "../atoms/color";
import { textStyle } from "../atoms/text";
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
  width: 100%;
  height: 100%;
  background-color: ${MainColor};
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

const DescriptionContainer = styled.ul`
  max-width: 300px;
  margin: 50px auto;
`;

const Description = styled.li`
  font-size: 15px;
  color: #555;
  text-align: left;
  margin-left: -10px;
  margin-bottom: 10px;
  ${textStyle}
`;

const HomeTopScreen: React.FC<RouteComponentProps> = ({ history }) => {
  const handleOnClick = () => {
    history.push("create");
  };

  return (
    <Container>
      <Wrapper>
        <Contents>
          <Title>TODO2IMAGE</Title>
          <DescriptionContainer>
            <Description>ホーム画面用の画像を生成するアプリ</Description>
            <Description>Todoやメモを簡単に画像へ変換することができる</Description>
            <Description>画面サイズに合わせて画像を生成する</Description>
          </DescriptionContainer>
          <LongRadiusButton
            text="画像を作成する"
            css={css`margin: 0 auto;`}
            onClick={handleOnClick}
          />
        </Contents>
      </Wrapper>
    </Container>
  );
};

export default HomeTopScreen;
