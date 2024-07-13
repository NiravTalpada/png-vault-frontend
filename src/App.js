import './App.css';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Routers from './routers';
import Header from './common/header/header';
import Footers from './common/footer/footer';
import ImageCatagoryContext from './context/imageCatagory';


export default function App() {
  const [searchText, setSearchText] = useState('');
  return (
    <ImageCatagoryContext.Provider value={{searchText,setSearchText}}>
      <Router>
        <Header></Header>
        <Routers></Routers>
        {/* <Footers></Footers> */}
      </Router>
      
    </ImageCatagoryContext.Provider>
  );
}