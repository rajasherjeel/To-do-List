import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App(){
  const  [articles,setArticle]=useState([])
  function addItem(article){
    setArticle([...articles,article])
  }
  function deleteItems(id) {
    setArticle((prevValue)=>prevValue.filter((item,index)=>{return index!==id}))
  }
    return(
      <div>
        <Header />
        <CreateArea addition={addItem} />
        {articles.map((article,index)=><Note key={index} id={index} title={article.title} content={article.content} delete={deleteItems} />)}
        <Footer />
      </div>
    );
}

export default App;