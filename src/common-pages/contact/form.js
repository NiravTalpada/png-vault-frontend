import React, {useContext} from "react";
import { AppContext } from "./contact";
import { Input } from "@mui/material";

function Form() {
    const {setText} = useContext(AppContext);
    return(
        <div>
            <h2>useContext Example :</h2>
            Write a text : <Input onChange={(event) => {
                setText(event.target.value)
            }} />
        </div>
    )
    
}

export default Form;