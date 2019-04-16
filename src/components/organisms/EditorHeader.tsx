import * as React from "react";
import styled from "styled-components";

const Header = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  height: 40px;
`;

const EditorHeader: React.FC = () => {
  return (
    <Header>
      Header
    </Header>
  );
};

export default EditorHeader;