import React,{ createContext, useEffect, useLayoutEffect, useReducer, useRef, useState} from "react";
import './contact.css';
import 'react-toastify/dist/ReactToastify.css';
import Form from './form';
import View from './view';

export const AppContext = createContext(null);

function Contact() {
  const [text, setText] = useState("");

  const inputRef = useRef(null);
  const clickhere = () => {
    inputRef.current.value = '';
    console.log('useRef' , inputRef.current.value)
  }

  const reducer = (state, action) =>{
    switch(action.type){
      case "INCREMENT":
        return { count : state.count + 1, showText : state.showText}
      case "toggleShowText":
        return { count : state.count, showText : !state.showText}
      default :
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, { count : 0 , showText : true})


  useLayoutEffect(() => {
    console.log(inputRef.current.value);
  }, []);

  useEffect(() => {
    inputRef.current.value = 'useEffect Value'
  },[])
  return(
    <div className="main">
      <AppContext.Provider value={{text, setText}}>
        <Form></Form>
        <View></View>
      </AppContext.Provider>

      <div>
        <h2>useRef Example :</h2>
        <input type="text" placeholder="Text Here" ref={inputRef} />
        <button type="button" onClick={clickhere}>Change Now</button>
      </div>

      <div>
        <h2>useReducer Example :</h2>
        <p>useReducer merge to 2 states manage</p>
        <h3>{state.count}</h3>
        <button type="button" onClick={() => {
          dispatch({type : 'INCREMENT'})
          dispatch({type : 'toggleShowText'})
        }}>Change Now</button>

        {state.showText && <p>This is a normal text</p>}
      </div>

      <div>
        <h2>useLayoutEffect Example : </h2>
        <p>useLayoutEffect is called before rendering the HTML page.</p>
        <p>useEffect is called after the HTML page has been rendered.</p>

        <input ref={inputRef} value="useLayoutEffect Value" style={{fontSize:'13px'}} />
      </div>


    </div>
  );
}

export default Contact
