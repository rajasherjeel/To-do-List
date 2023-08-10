import React from "react";
import "./Header.css"
import HighlightIcon from '@mui/icons-material/Highlight';

function Header({ signOut }) {
   return (<header className="headerCont">
      <h1><HighlightIcon /> Todo List</h1>
      <button className="btn" onClick={signOut}>Sign out</button>
   </header>
   );
}

export default Header;