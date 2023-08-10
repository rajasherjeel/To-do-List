import React, { useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import "./Note.css"

function Note(props) {
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(props.content);
  const [title, settitle] = useState(props.title);
  const [content, setcontent] = useState(props.content)
  const [completed , setcompleted ] = useState(props.completed)

  function handleClick(event) {
    event.preventDefault();
    props.delete(props.id);
  }

  function handleEditClick() {
    setEditMode(true);
  }

  function handleSaveClick() {
    props.updateContent(props.id , title, content)
    setEditMode(false);
  }

  const completeHandler= ()=>{
      props.updateStatus(props.id, !completed);
      setcompleted(!completed)
  }

  return (
    <div className="note">
      {editMode ? (
        <div className="create-note">
        <input className="editInput"  value={title} onChange={(event) => settitle(event.target.value)} />
        <textarea
         className="editInput"
          value={content}
          onChange={(event) => setcontent(event.target.value)}
        />
        </div>
      ) : (
        <>
        <h1>{title}</h1>
        <p>{content}</p>
        </>
      )}
      <div>
        <div style={{display:"flex" ,gap:"10px"}}>
        <h5>Completed  </h5>
        <input
          type="checkbox"
          checked={completed}
          onChange={completeHandler}
        />
        </div>
        {editMode ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <>
            <button onClick={handleClick}><DeleteForeverIcon /></button>
            <button onClick={handleEditClick}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Note;
