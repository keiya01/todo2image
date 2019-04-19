import * as React from "react";
import styled from "styled-components";
import { EditorState, Editor } from "draft-js";
import EditorHeader from "../organisms/EditorHeader";
import { CustomStyleColor } from "../molecules/ColorButton";
import "draft-js/dist/Draft.css";

const { useState, useRef, useReducer } = React;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 10px;
  cursor: text;
`;

interface State {
  isShowHeader: boolean;
  textColor: string;
}

const initialState = {
  isShowHeader: false,
  textColor: "",
}

interface Action {
  type: string;
  isShowHeader?: boolean;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "TOGGLE_HEADER": {
      return {
        ...state,
        isShowHeader: action.isShowHeader || false,
      }
    }
    default:
      return state
  }
}

interface EditorContextProps {
  editorState?: EditorState;
  setEditorState?: React.Dispatch<React.SetStateAction<EditorState>>;
}

export const EditorContext = React.createContext<EditorContextProps>({});

export const CustomStyleMap = {
  ...CustomStyleColor,
};

const CreateImageArea: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [state, dispatch] = useReducer(reducer, initialState);
  const editor: React.RefObject<Editor> | null = useRef(null);
  const { isShowHeader } = state;

  const handleOnChange = (editorState: EditorState) => {
    setEditorState(editorState);
  }

  const handleOnClickFocus = () => {
    if (!editor.current) {
      return;
    }

    dispatch({ type: "TOGGLE_HEADER", isShowHeader: true });
    editor.current.focus();
  }

  const currentEditorState = editorState.getCurrentContent();
  let styledEditorClassName = "";
  if (!currentEditorState.hasText()) {
    if (currentEditorState.getBlockMap().first().getType() !== "unstyled") {
      styledEditorClassName = "RichEditor-hidePlaceholder";
    }
  }

  const editorContextProps = {
    editorState,
    setEditorState,
  }

  return (
    <EditorContext.Provider value={editorContextProps}>
      <Container onClick={handleOnClickFocus}>
        <EditorHeader visible={isShowHeader} />
        <div className={styledEditorClassName}>
          <Editor
            ref={editor}
            customStyleMap={CustomStyleMap}
            editorState={editorState}
            onChange={handleOnChange}
            textAlignment="center"
            placeholder="TODOを入力"
          />
        </div>
      </Container>
    </EditorContext.Provider>
  )
};

export default CreateImageArea;