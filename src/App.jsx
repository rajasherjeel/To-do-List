import React, { useState , useEffect} from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import Note from "./components/Note/Note";
import CreateArea from "./components/CreateArea";
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import "./App.css"
import { createTodo, updateTodo, deleteTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';
import awsExports from './aws-exports';

Amplify.configure(awsExports);


function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const response = await API.graphql(graphqlOperation(listTodos));
      setTodos(response.data.listTodos.items);
    } catch (error) {
      console.error('Error fetching todos', error);
    }
  }

  async function addTodo(title, content) {
    try {
      const todo = {
        input: {
          title: title,
          description: content,
          completed: false  // You can set this to true if necessary
        }
      }
      console.log("todo :: ", todo);
      await API.graphql(graphqlOperation(createTodo, todo));
      fetchTodos();
    } catch (error) {
      console.error('Error creating todo', error);
    }
  }

  async function updateTodoStatus(id, completed) {
    try {
      const todo = {
        input: {
          id: id,
          completed: completed 
        }
      }
      await API.graphql(graphqlOperation(updateTodo, todo));
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo', error);
    }
  }

  async function updateNoteContent(id, title , content) {
    try {
      const todo = {
        input: {
          id, 
          title,
          description: content
        }
      }
      await API.graphql(graphqlOperation(updateTodo, todo ));
      fetchTodos();
    } catch (error) {
      console.error('Error updating note content', error);
    }
  }

  async function deleteTodoItem(id) {
    try {
      const todo = { id };
      await API.graphql(graphqlOperation(deleteTodo, { input: todo }));
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  }
  return (    
    <Authenticator className="mainCont">
    {({ signOut, user }) => (
      <div>
        <Header signOut={signOut} />
        <CreateArea addition={addTodo} />
        {todos.map((todo, index) => (
          <Note
            key={index}
            id={todo.id}
            title={todo.title}
            content={todo.description}
            completed={todo.completed}
            updateStatus={updateTodoStatus}
            updateContent={updateNoteContent}
            delete={deleteTodoItem}
          />
        ))}
        <Footer />
      </div>
    )}
  </Authenticator>
  );
}

export default App;