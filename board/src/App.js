import './App.css';
import Homepage from './components/page/Homepage/Homepage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './Redux/Reduxslice/todoSlice';
import uuid from 'react-uuid';

import Todo from './components/molecules/Todo/todo';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
  if(localStorage.todolists!==undefined){
   const dummydata = [...(JSON.parse(localStorage.getItem("todolists")))]
    dispatch(addTodo(dummydata))
  }
 
  },[])
  return (
    <>
    
      <Homepage/> 
      <Todo/>
  

  
    </>
  );
}

export default App;
