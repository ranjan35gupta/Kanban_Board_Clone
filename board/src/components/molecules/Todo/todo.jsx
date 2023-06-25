import React, { useState } from "react";
import uuid from 'react-uuid'
import {RxCross2} from 'react-icons/rx';
import { Dialog,DialogContent } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import styles from "./todo.module.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {BiPencil, BiSolidPencil, BiUser} from 'react-icons/bi'

import { useDispatch,useSelector } from "react-redux";
import { addTitle,addTodo,addBeforeCartTitle,addCartItems,pushCartContent } from "../../../Redux/Reduxslice/todoSlice";
import {DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd'


const Todo = () => {
  const [open,setOpen] = useState(false)
  const [showDialog,setShowDialog] =  useState(false)
  // useEffect(()=>{
 
  // },[title])
  
  
  const dispatch = useDispatch();
  const values = useSelector(state=>state.newState)
  const {title,todo,beforeCartTitle} = values
  const [todo1,setTodo1]=useState(todo)
  const [showList, setShowList] = useState(false);
  const [addlist,setAddList]=useState('')
  const [titleName1,setTitleName1]=useState('')
  const [characters,setCharacters]=useState(todo)
  
  const [isClicked, setIsClicked] = useState(true);

  const handleAddList = () => {
    setIsClicked(false);
    
    
  };
  


  const handleCard = () => {
    if(localStorage.todolists===undefined){
      localStorage.setItem("todolists",JSON.stringify([{id:uuid(),cartName:beforeCartTitle,cartItems:[]}]))
      
     dispatch(addTodo(JSON.parse(localStorage.getItem("todolists"))))
    
    }
    else{
    const data1 = [...(JSON.parse(localStorage.getItem("todolists"))),{id:uuid(),cartName:beforeCartTitle,cartItems:[]}]
    localStorage.setItem("todolists",JSON.stringify(data1))
   
    
    dispatch(addTodo(JSON.parse(localStorage.getItem("todolists"))))
    
     const ran = JSON.parse(localStorage.todolists)
     
  }
    
    
    setIsClicked(true)
   
  }
  console.log(todo,"this is the todo list after rendering")
  
  function handleranjan(e){
    // dispatch(addTitle({element:e.target.value,cartId:id}))
    setTitleName1(e.target.value)

    

  }
  function handleTitle(e,id){
    e.preventDefault()
    dispatch(addTitle({element:titleName1,cartId:id}))
    
    // setTitleName1(titleName)

  }
  function addCartList(e,cartItemId){
    e.preventDefault()
    
    dispatch(addCartItems({cartItemId:cartItemId,lists:addlist}))
    setShowList(true);
  }

function handleDragEnd(result){
  console.log(result)
  if(!result.destination)return
  const {destination,source}=result
   if(source.droppableId=="main_container"){
    console.log("hl")
   }
  if(source.droppableId!==destination.droppableId){
    const todos = [...todo]
    let ar=[]
    for(let i=0;i<todos.length;i++){
      if(todos[i].cartName==source.droppableId){
        ar.push(i)
      }
    }
    const [x] = ar
     let ar1=[]
    for(let i=0;i<todos.length;i++){
      if(todos[i].cartName==destination.droppableId){
        ar1.push(i)
      }
    }
    
    const [y] = ar1
    const items = Array.from(todo[x].cartItems)
    const items1 = Array.from(todo[y].cartItems)
     const [reorderedItem]= items.splice(source.index,1)
    dispatch(pushCartContent({item:items,id:source.droppableId}))
    items1.splice(result.destination.index,0,reorderedItem)
   dispatch(pushCartContent({item:items1,id:destination.droppableId}))
   }
   else{
    const todos = [...todo]
    let ar=[]
    for(let i=0;i<todos.length;i++){
      if(todos[i].cartName==source.droppableId){
        ar.push(i)
      }
    }
    const [x] = ar
     let ar1=[]
    for(let i=0;i<todos.length;i++){
      if(todos[i].cartName==destination.droppableId){
        ar1.push(i)
      }
    }
    
    const [y] = ar1
    const items = Array.from(todo[x].cartItems)
    // const items1 = Array.from(todo[y].cartItems)
     const [reorderedItem]= items.splice(source.index,1)
     
    items.splice(result.destination.index,0,reorderedItem)
   dispatch(pushCartContent({item:items,id:destination.droppableId}))

   }
 
 
 

}
function handleOnDragEnd1(result){
  if(!result.destination) return
  const {source,destination}=result
  if(source.droppableId==destination.draggableId){
    console.log("hdl")
  }
  
 
 
    
}


function handleClick() {
  setOpen(true)
  setShowDialog(!showDialog)
}
const handleDelete = (index) => {
  const newList  = [...todo];
  newList.splice(index,1);
  dispatch(addTodo(newList))
  setOpen(false)
}
  
  return (
    
      
    <div className={styles.container}   >
     
    <div>
      {isClicked ? (
        <div className={styles.add_list}>
          <button onClick={handleAddList} className={styles.add_list_btn}>
           + Add a List
          </button>
        </div>
      ) : (
        <div className={styles.add_list_field} >
          <input className={styles.text_field}
           placeholder="Enter list title..."
            onChange={(e) => {
              dispatch(addBeforeCartTitle(e.target.value));
            }}
          />
          <button className={styles.list_btn} onClick={handleCard}>Add Card</button>
          <div className={styles.cross}>
          <RxCross2 />
           </div> 
        </div>
      )}
      </div>
      
      <div >

      <DragDropContext  onDragEnd={(result)=>handleDragEnd(result)}  >
     
        <div className={styles.container1}  >
       
          
      
          <div className={styles.todo_container_list} >
          {todo.map((item,index) => {
            return (
              
               <div  >
          

               <Droppable  droppableId={item.cartName}>
                {(provided)=>(
              <div className={styles.wraperContainer} {...provided.droppableProps} ref={provided.innerRef}  >
                
                <div className={styles.todoContainer} >
                  <div className={styles.titles}>
                  <form className={styles.forms} onSubmit={(e)=>handleTitle(e,item.id)}>
                    <div className={styles.horizontalIcons}>
                  <input type="text" className={styles.input1}   defaultValue={item.cartName} onChange={handleranjan} />
                 <MoreHorizIcon  onClick={handleClick} />
               <div>{showDialog ?  <Dialog 
                
                hideBackdrop open={open} onClose= {() =>  setOpen(false)}>
                  <DialogContent >
                  <DeleteOutlineIcon onClick={() => handleDelete(index)}/>
                  </DialogContent>
                 </Dialog> : <>
                 </>}</div>
                 </div>
                  </form>
                  </div>
                  
                   
                  <div  className={styles.cartitem}   >
                  {item.cartItems.map((ele,index)=>{
                    return(
                        <Draggable draggableId={ele.listItemId} key={ele.listItemId} index={index}>
                          {(provided)=>(
                          <div  className={styles.divElement} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                      <div className={styles.element} >{ele.nameOfCardItem}  </div>
                      <BiPencil className={styles.pencil}/>
                      </div>
                      )}
                      </Draggable>
                    )
                  })}
                  
                  </div>
                 
                  
                  <form onSubmit={(e)=>addCartList(e,item.id)} className={styles.form2} >
                  <input className={styles.input2} type="text" onChange={(e)=>setAddList(e.target.value)} />
                  </form>
                 
                 <button className={styles.addbtn} onClick={(e)=>addCartList(e,item.id)}>cart</button>
                 <div className={styles.cross1}>
          <RxCross2 />

           </div> 
                 
                </div>
                

                {provided.placeholder}
              </div>
              
              )}
              </Droppable>
              
              </div>
             
              
            )
            
          })}
        
          </div> 
         
         
          
          
        </div>
        
        </DragDropContext>
        
        </div>
       
    </div>
   
   
  );
};

export default Todo;
// defaultValue={title}
{/* <List/> */}



     
        {/* <DragDropContext >
          <Droppable droppableId="outer_container">{...provided.droppableProps} ref={provided.innerRef} 
            {(provided)=>( */}
            // )}
            // </Droppable>
            // </DragDropContext>
            // {provided.placeholder}
            // <Draggable draggableId={item.cartName} key={item.cartName} index={index}>
            // {(provided)=>(
              // )}
          //  </Draggable>
          //