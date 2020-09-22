import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import Keyboard from "react-simple-keyboard";
import { Grid, Header, Segment, Message, Input, Button, Icon } from 'semantic-ui-react';
import "react-simple-keyboard/build/css/index.css";

//import { useAuth } from "../context/auth";
//import { broadCastSuccess } from '../utils/messages';

function Search(props) {
    const [input, setInput] = useState('');
    const [layout, setLayout] = useState('default');
    const keyboard = useRef();
  
    
    const onChange = input => {
      setInput(input);
      console.log("Input changed", input);
    };
  
    const handleShift = () => {
      const newLayoutName = layout === "default" ? "shift" : "default";
      setLayout(newLayoutName);
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
    <Grid relaxed columns={1} textAlign='center'  verticalAlign='top'>
      <Grid.Column>
        <Grid.Row padded>
            <Header as='h2'  textAlign='center'>
                Search the COLRC
            </Header>
            <Message>Use this page to search across these resources :: list the resources that the search looks at.</Message>
        </Grid.Row>
        <Grid.Row>
          <Segment>
            <Segment.Inline>
                <div id="App">
                    <Input 
                        id="search"
                        value={input}
                        size='large' 
                        fluid 
                        action={{
                            color: 'blue',
                            labelPosition: 'right',
                            icon: 'search',
                            content: 'find it!',
                        }} 
                        placeholder='Search the COLRC...'
                        onChange={onChangeInput}
                    />
                    <Keyboard
                        keyboardRef={r => (keyboard.current = r)}
                        layoutName={layout}
                        layout={ {
                        'default' : [
                            "á ä ä́ é ɛ ɛ́ í ι ó ú ə ɔ ụ · ʷ",
                            "ɫ ∤ ɬ č ǰ š x̣ ʔ ʕ ‿ † ‡ § √",
                            "ʀ ᴇ c̕ l̕ m̕ n̕ p̕ q̕ r̕ ṛ ʀ̕ s̕ t̕ w̕ y̕",
                            "1 2 3 4 5 6 7 8 9 0 - = {bksp}",
                            "q w e r t y u i o p [ ] \\",
                            "{lock} a s d f g h j k l ; '",
                            "{shift} z x c v b n m , . / {shift}",
                            "{space}"
                            ],
                        'shift' : [
                            "Á Ä Ä́ É ɛ ɛ́ Í ι Ó Ú ə ɔ Ụ · ʷ",
                            "ɫ Ł Č J̌ Š X̣ ʔ ʕ ‿ · † ‡ § √",
                            "ʀ ᴇ c̕ l̕ m̕ n̕ p̕ q̕ r̕ ṛ ʀ̕ s̕ t̕ w̕ y̕",
                            "! @ # $ % ^ & * ( ) _ + {bksp}",
                            "Q W E R T Y U I O P { } |",
                            "{lock} A S D F G H J K L : \"",
                            "{shift} Z X C V B N M < > ? {shift}",
                            "{space}"
                            ] 
                        } }
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                    />
                </div>
            </Segment.Inline>
          </Segment>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  )
}

export default Search