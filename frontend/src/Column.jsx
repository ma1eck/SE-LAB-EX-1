import React from "react";
import TaskCard from "./TaskCard";

export default function Column({name,colEn,notes,setNotes,columns,handleMoveNote}){

const colNotes=notes.filter(n=>n.type===colEn);

const addTask=()=>{

const newTask={
id:Date.now(),
title:"New Task",
description:"",
deadline:"",
notes:"",
type:colEn
};

setNotes(prev=>[...prev,newTask]);

};

const deleteNote=id=>{
setNotes(prev=>prev.filter(n=>n.id!==id));
};

const updateNote=updated=>{
setNotes(prev=>
prev.map(n=>n.id===updated.id?updated:n)
);
};

return(

<div className="column">

<div className="column-header">
<h3>{name}</h3>
<span>{colNotes.length}</span>
</div>

<button
className="add-task-btn"
onClick={addTask}
>
+ Add Task
</button>

{colNotes.map(note=>(

<TaskCard
key={note.id}
note={note}
onDelete={deleteNote}
onUpdate={updateNote}
onMove={handleMoveNote}
columns={columns}
/>

))}

</div>

);

}
