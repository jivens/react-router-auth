import React, { useRef, useState } from "react";
import Keyboard from 'react-simple-keyboard';
import ReactDOM from "react-dom";
import 'react-simple-keyboard/build/css/index.css';

export default function SimpleKeyboard() {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();

  const onChange = input => {
    setInput(input);
    console.log("Input changed", input);
  };

  const handleShift = () => {
    const colrc = layout === "default" : [
        "á ä ä́ é ɛ ɛ́ í ι ó ú ə ɔ ụ · ʷ",
        "ɫ ∤ ɬ č ǰ š x̣ ʔ ʕ ‿ † ‡ § √",
        "1 2 3 4 5 6 7 8 9 0 - = {bksp}",
        "q w e r t y u i o p [ ] \\",
        "{lock} a s d f g h j k l ; '",
        "{shift} z x c v b n m , . / {shift}",
        "{space}"
      ] ? "shift" : [
        "á ä ä́ é ɛ ɛ́ í ι ó ú ə ɔ ụ ʷ",
        "ɫ ∤ č ǰ š x̣ ʔ ʕ ‿ · † ‡ § √",
        "! @ # $ % ^ & * ( ) _ + {bksp}",
        "Q W E R T Y U I O P { } |",
        "{lock} A S D F G H J K L : \"",
        "{shift} Z X C V B N M < > ? {shift}",
        "{space}"
      ];
    setLayout(colrc);
  };

  const onKeyPress = button => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = event => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  return (
    <div className="App">
      <input
        value={input}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={onChangeInput}
      />
      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        layoutName={colrc}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<SimpleKeyboard />, rootElement);