import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from "styled-components";
import "../src/index.css";
import LongRadiusButton from "../src/components/molecules/LongRadiusButton";
import StylingButton from '../src/components/molecules/StylingButton';
import ColorButton from '../src/components/molecules/ColorButton';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
  width: 100vw;
  height: 100vh;
`;

storiesOf('Button', module)
  .add('LongRadiusButton', () => (
    <ButtonContainer>
      <LongRadiusButton text="画像を作成する" />
    </ButtonContainer>
  ))
  .add('StylingButton', () => (
      <ButtonContainer>
        <StylingButton label="Bold" font="BOLD" />
        <StylingButton label="Italic" font="ITALIC" />
      </ButtonContainer>
  ))
  .add('ColorButton', () => (
    <ButtonContainer>
      <ColorButton />
    </ButtonContainer>
  ));
