import React, { useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import { Grid, Header, Segment, Message, Input } from 'semantic-ui-react';
import { useAuth } from "../context/auth";
import { intersectionWith, isEqual } from 'lodash';
import { getRootsQuery, getAnonRootsQuery, getAffixesQuery, getAnonAffixesQuery } from '../queries/queries'
import "react-simple-keyboard/build/css/index.css";
import { filterReshape } from "../utils/reshapers"
import RootTable from "./RootTable"

//import { useAuth } from "../context/auth";
//import { broadCastSuccess } from '../utils/messages';

function Search(props) {
    const { client, user } = useAuth();
    const [input, setInput] = useState('');
    const [layout, setLayout] = useState('default');
    const keyboard = useRef();
  
    const globalFilters =  { 
        "roots": { 
            "filters": [],
            "globalFilterVariables": ["english", "salish"]
        },
        "affixes": { 
          "filters": [],
          "globalFilterVariables": ["english", "nicodemus"]
      }  
    }
   
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
  
    async function getAffixes(limit, offset, sortBy, filters) {
      console.log(limit, offset, sortBy, filters)
      let res = {}
      if(user && intersectionWith(["manager", "update"], user.roles, isEqual).length >= 1) { 
        res = await client.query({
          query: getAffixesQuery,
          variables: { 
            limit: limit,
            offset: offset,
            affix_order: sortBy,
            where: filters,
           }
        })
      }
      else {
        res = await client.query({
          query: getAnonAffixesQuery,
          variables: { 
            limit: limit,
            offset: offset,
            affix_order: sortBy,
            where: filters,
          }
        })
      }
      console.log('the affixes res.data are ', res.data)
      return res
    } 
    
    async function getRoots(limit, offset, sortBy, filters) {
      console.log(limit, offset, sortBy, filters)
      let res = {}
      if(user && intersectionWith(["manager", "update"], user.roles, isEqual).length >= 1) { 
        res = await client.query({
          query: getRootsQuery,
          variables: { 
            limit: limit,
            offset: offset,
            root_order: sortBy,
            where: filters,
           }
        })
      }
      else {
        res = await client.query({
          query: getAnonRootsQuery,
          variables: { 
            limit: limit,
            offset: offset,
            root_order: sortBy,
            where: filters,
          }
        })
      }
      console.log('the roots res.data are ', res.data)
      return res
    }  

    async function getSearchResults(globalFilter, globalFilters) {
      let res = {}
      await Promise.all(Object.keys(globalFilters).map(async (item) => {
        let controlledSort = []
        let controlledFilter = filterReshape(globalFilters[item]["filters"], globalFilter, globalFilters[item]["globalFilterVariables"]) 
        if (item === "affixes") {
          let result = await getAffixes(10, 0, controlledSort, controlledFilter)
          res[item] = result.data.affixes
        } else if (item === "roots") {
          let result = await getRoots(10, 0, controlledSort, controlledFilter)
          res[item] = result.data.roots
        }
      }))
      return res
    }

    // await Promise.all(files.map(async (file) => {
    //   const contents = await fs.readFile(file, 'utf8')
    //   console.log(contents)
    // }));

    const globalFilterReshape = (globalFilter, globalFilters) => {
        let res = {}
        const controlledSort = [] 
        let controlledFilter = {}  
        Object.keys(globalFilters).forEach((item) => {
          controlledFilter = filterReshape(globalFilters[item]["filters"], globalFilter, globalFilters[item]["globalFilterVariables"]) 
          if (item === "affixes") {
            getAffixes(10, 0, controlledSort, controlledFilter)
            .then((data) => {
              res[item] = data
            })
            .catch((error) => {
              console.log(error)
            })
          } else if (item === "roots") {
            getRoots(10, 0, controlledSort, controlledFilter)
            .then((data) => {
              res[item] = data
            })
            .catch((error) => {
              console.log(error)
            })
          }
        })
        return res
      }
  



  return (
    <Grid relaxed columns={1} textAlign='center'  verticalAlign='top'>
      <Grid.Column>
        <Grid.Row>
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
                            onClick: async (event,data)=>{
                              console.log(JSON.stringify(await getSearchResults(input, globalFilters)));
                            }
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
        <Grid.Row>
            <RootTable/>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  )
}

export default Search