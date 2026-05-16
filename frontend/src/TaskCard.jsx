import React,{useState} from "react";

export default function TaskCard({note,onUpdate,onDelete}){

const [editing,setEditing]=useState(false);
const [edited,setEdited]=useState({...note});

const save=()=>{
onUpdate(edited);
setEditing(false);
};

const dragStart=e=>{
e.dataTransfer.setData("taskId",note.id);
};

const isOverdue=()=>{
if(!note.deadline) return false;
return new Date(note.deadline)<new Date();
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

<select
className="edit-input"
value={edited.priority}
onChange={e=>setEdited({...edited,priority:e.target.value})}
>
<option value="high">High</option>
<option value="medium">Medium</option>
<option value="low">Low</option>
</select>

<input
type="date"
className="edit-input"
value={edited.deadline||""}
onChange={e=>setEdited({...edited,deadline:e.target.value})}
/>

<textarea
className="edit-input"
placeholder="Notes"
value={edited.notes||""}
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

<div
className="task-card"
draggable
onDragStart={dragStart}
>

<h4 className="task-title">
{note.title}
</h4>

<p className="task-description">
{note.description}
</p>

<div className={`priority priority-${note.priority}`}>
{note.priority}
</div>

{note.deadline &&(

<div className={`task-meta ${isOverdue()?"deadline-overdue":""}`}>
Deadline: {note.deadline}
</div>

)}

{note.notes &&(
<div className="task-meta">
Notes: {note.notes}
</div>
)}

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
