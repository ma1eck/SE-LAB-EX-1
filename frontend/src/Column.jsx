import React from "react";
import TaskCard from "./TaskCard";

export default function Column({name,colEn,notes,setNotes,moveTask}){

const colNotes=notes.filter(n=>n.type===colEn);

const deleteNote=id=>{
setNotes(prev=>prev.filter(n=>n.id!==id));
};

const updateNote=updated=>{
setNotes(prev=>
prev.map(n=>n.id===updated.id?updated:n)
);
};

const allowDrop=e=>e.preventDefault();

const drop=e=>{
const taskId=e.dataTransfer.getData("taskId");
moveTask(Number(taskId),colEn);
};

return(

<div
className="column"
onDragOver={allowDrop}
onDrop={drop}
>

<div className="column-header">
<h3>{name}</h3>
<span>{colNotes.length}</span>
</div>

{colNotes.map(note=>(

<TaskCard
key={note.id}
note={note}
onDelete={deleteNote}
onUpdate={updateNote}
/>

))}

</div>

);

}
