import React,{useState,useEffect} from "react";
import Header from "./Header";
import Column from "./Column";
import "./app.css";

function App(){

const [filter,setFilter]=useState("");
const [sortBy,setSortBy]=useState("");

const columns=[
{id:"todo",name:"To Do"},
{id:"inProgress",name:"In Progress"},
{id:"done",name:"Done"}
];

const [notes,setNotes]=useState(()=>{

const saved=localStorage.getItem("notes");
return saved?JSON.parse(saved):[];

});

useEffect(()=>{
localStorage.setItem("notes",JSON.stringify(notes));
},[notes]);

const handleMoveNote=(noteId,targetCol)=>{

setNotes(prev=>
prev.map(n=>
n.id===noteId?{...n,type:targetCol}:n
)
);

};

const filtered=notes
.filter(n=>
n.title.toLowerCase().includes(filter.toLowerCase())
)
.sort((a,b)=>{

if(sortBy==="title")
return a.title.localeCompare(b.title);

return 0;

});

return(

<div>

<Header
filter={filter}
setFilter={setFilter}
sortBy={sortBy}
setSortBy={setSortBy}
/>

<main className="board">

{columns.map(col=>(

<Column
key={col.id}
name={col.name}
colEn={col.id}
notes={filtered}
setNotes={setNotes}
columns={columns}
handleMoveNote={handleMoveNote}
/>

))}

</main>

</div>

);

}

export default App;
