import React,{useState,useEffect} from "react";
import Header from "./Header";
import Column from "./Column";
import "./App.css";

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

const moveTask=(taskId,newColumn)=>{

setNotes(prev =>
prev.map(n =>
n.id===taskId ? {...n,type:newColumn} : n
)
);

};

const addTask=()=>{

const newTask={
id:Date.now(),
title:"New Task",
description:"",
deadline:"",
notes:"",
priority:"medium",
type:"todo"
};

setNotes(prev=>[...prev,newTask]);

};

const filtered=notes
.filter(n =>
n.title.toLowerCase().includes(filter.toLowerCase())
)
.sort((a,b)=>{

if(sortBy==="priority"){
const order={high:3,medium:2,low:1};
return order[b.priority]-order[a.priority];
}

if(sortBy==="title"){
return a.title.localeCompare(b.title);
}

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

{columns.map(col => (

<Column
key={col.id}
name={col.name}
colEn={col.id}
notes={filtered}
setNotes={setNotes}
moveTask={moveTask}
/>

))}

</main>

<button
className="global-add-btn"
onClick={addTask}
>
+ Add New Task
</button>

</div>

);

}

export default App;
