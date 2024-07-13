import React, {useContext} from "react";
import { AppContext } from "./contact";

function View() {
    const {text} = useContext(AppContext);
    return(
        <div>
            <h3>Output Text : {text}</h3>
        </div>
    )
    
}

export default View;