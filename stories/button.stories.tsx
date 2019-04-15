import * as React from 'react';
import { storiesOf } from '@storybook/react';
import "../src/index.css";
import LongRadiusButton from "../src/components/molecules/LongRadiusButton";
import StylingButton from '../src/components/molecules/StylingButton';


storiesOf('Button', module)
  .add('LongRadiusButton', () => <LongRadiusButton text="画像を作成する" />)
  .add('StylingButton', () => {
    return (
      <div style={{backgroundColor: "#aaa"}}>
        <StylingButton label="Bold" font="BOLD" />
        <StylingButton label="Italic" font="ITALIC" />
      </div>
    )
  });
