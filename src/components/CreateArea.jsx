import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { Hidden } from "@mui/material";

function CreateArea(props){
   const  [text,setText]=useState({title:"", content:""})
   const [checked, setChecked] = useState(false);


   function handleChange(event){
    const {name, value}=event.target;
        setText(prevText=>
          {  return (
                   {...prevText,
                     [name]:value}
        )}
        )
        }
   
function handleClick(event){
    event.preventDefault();
    props.addition(text);
    setText({title:"",content:""})
}
function handleAnimation(){
setChecked(true);
}
    return (
        <div>
          <form className="create-note" >
            <input value={text.title} onChange={handleChange} name="title" placeholder="Title" 
                style={{display: checked? "block" : "none" }}
            />
            <textarea value={text.content} 
            onChange={handleChange} 
            name="content" 
            placeholder="Take a note..." 
            rows={checked?"3":"1"} 
            onClick={handleAnimation} />
            <Zoom in={checked}><Fab onClick={handleClick}><AddIcon /></Fab></Zoom>
          </form>
        </div>
      );

}

export default CreateArea;
