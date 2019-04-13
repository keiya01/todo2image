import * as React from 'react';
import { storiesOf } from '@storybook/react';
import "../src/index.css";
import LongRadiusButton from "../src/components/molecules/LongRadiusButton";


storiesOf('Button', module)
  .add('LongRadiusButton', () => <LongRadiusButton text="画像を作成する"/> );
