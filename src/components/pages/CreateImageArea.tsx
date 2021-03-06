import * as React from "react";
import styled from "styled-components";
import { EditorState, Editor, ContentBlock } from "draft-js";
import EditorHeader from "../organisms/EditorHeader";
import { CustomStyleColor } from "../molecules/ColorButton";
import "draft-js/dist/Draft.css";
import SaveImageButton from '../molecules/SaveImageButton';

const { useState, useRef, useReducer } = React;

const Container = styled.div`
  width: 100%;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 10px;
  background-color: #fff;
  cursor: text;
`;

interface VisibleModals {
  colorModal: boolean;
  sizeModal: boolean;
}

interface State {
  textColor: string;
  visibleModals: VisibleModals;
}

const initialState = {
  textColor: "",
  visibleModals: {
    colorModal: false,
    sizeModal: false,
  }
}

interface Action {
  type: string;
  visible?: boolean;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "TOGGLE_COLOR_MODAL": {
      return {
        ...state,
        visibleModals: {
          sizeModal: false,
          colorModal: action.visible || false,
        }
      }
    }
    case "TOGGLE_SIZE_MODAL": {
      return {
        ...state,
        visibleModals: {
          colorModal: false,
          sizeModal: action.visible || false,
        }
      }
    }
    default:
      return state
  }
}

interface ToggleModalFunc {
  type: "TOGGLE_COLOR_MODAL" | "TOGGLE_SIZE_MODAL";
  visible: boolean;
}

interface EditorContextProps {
  editorState?: EditorState;
  setEditorState?: React.Dispatch<React.SetStateAction<EditorState>>;
  visibleModals?: VisibleModals;
  handleOnToggleModal?: (action: ToggleModalFunc) => void;
}

export const EditorContext = React.createContext<EditorContextProps>({});

const CustomStyleMap = {
  ...CustomStyleColor,
};

const CreateImageArea: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [state, dispatch] = useReducer(reducer, initialState);
  const editor: React.RefObject<Editor> | null = useRef(null);
  const editorImage: React.RefObject<HTMLDivElement> | null = useRef(null);
  const { visibleModals } = state;

  const handleOnChange = (nextEditorState: EditorState) => {
    const currentInlineStyle = editorState.getCurrentInlineStyle();

    const length = nextEditorState.getCurrentContent().getBlockMap().reduce((totalLength: number, block: ContentBlock) => {
      return totalLength + block.getLength();
    }, 0);

    // Headerで変更したstyleがnextEditorStateに反映されていないためoverrideする
    setEditorState(EditorState.setInlineStyleOverride(nextEditorState, currentInlineStyle));
  }

  const handleOnFocus = () => {
    if (!editor.current) {
      return;
    }

    editor.current.focus();
  }

  const handleOnToggleModal = (action: ToggleModalFunc) => {
    dispatch(action);
  }

  const editorContextProps = {
    editorState,
    setEditorState,
    visibleModals,
    handleOnToggleModal
  }

  return (
    <EditorContext.Provider value={editorContextProps}>
      <EditorHeader />
      <Container onClick={handleOnFocus} ref={editorImage}>
        <div>
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
      <SaveImageButton toImageElement={editorImage.current} />
    </EditorContext.Provider>
  )
};

export default CreateImageArea;