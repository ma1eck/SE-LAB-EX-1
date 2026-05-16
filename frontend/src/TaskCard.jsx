import React,{useState} from "react";

export default function TaskCard({note,onUpdate,onDelete,onMove,columns}){

const [editing,setEditing]=useState(false);
const [edited,setEdited]=useState({...note});

const index=columns.findIndex(c=>c.id===note.type);

const moveLeft=()=>{
if(index>0)
onMove(note.id,columns[index-1].id);
};

const moveRight=()=>{
if(index<columns.length-1)
onMove(note.id,columns[index+1].id);
};

const save=()=>{
onUpdate(edited);
setEditing(false);
};

if(editing){

return(

<div className="task-card">

<input
className="edit-input"
value={edited.title}
onChange={e=>setEdited({...edited,title:e.target.value})}
/>

<textarea
className="edit-input"
value={edited.description}
onChange={e=>setEdited({...edited,description:e.target.value})}
/>

<input
type="date"
className="edit-input"
value={edited.deadline||""}
onChange={e=>setEdited({...edited,deadline:e.target.value})}
/>

<textarea
className="edit-input"
value={edited.notes||""}
placeholder="Notes"
onChange={e=>setEdited({...edited,notes:e.target.value})}
/>

<div className="card-actions">

<button className="icon-btn" onClick={save}>
Save
</button>

<button
className="icon-btn"
onClick={()=>setEditing(false)}
>
Cancel
</button>

</div>

</div>

);
}

return(

<div className="task-card">

<h4 className="task-title">
{note.title}
</h4>

<p className="task-description">
{note.description}
</p>

{note.deadline &&
<div className="task-meta">
Deadline: {note.deadline}
</div>
}

{note.notes &&
<div className="task-meta">
Notes: {note.notes}
</div>
}

<div className="move-arrows">

<button
className="arrow-btn"
onClick={moveLeft}
disabled={index===0}
>
←
</button>

<button
className="arrow-btn"
onClick={moveRight}
disabled={index===columns.length-1}
>
→
</button>

</div>

<div className="card-actions">

<button
className="icon-btn"
onClick={()=>setEditing(true)}
>
Edit
</button>

<button
className="icon-btn"
onClick={()=>onDelete(note.id)}
>
Delete
</button>

</div>

</div>

);

}
