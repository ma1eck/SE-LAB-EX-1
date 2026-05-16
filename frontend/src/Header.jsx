import React,{useState,useEffect} from "react";

export default function Header({filter,setFilter,sortBy,setSortBy}){

const [open,setOpen]=useState(false);
const [theme,setTheme]=useState("dark");

const [tempFilter,setTempFilter]=useState(filter);
const [tempSort,setTempSort]=useState(sortBy);

useEffect(()=>{
const current=document.body.getAttribute("data-theme") || "dark";
setTheme(current);
},[]);

const toggleTheme=()=>{

const newTheme=theme==="light"?"dark":"light";

document.body.setAttribute("data-theme",newTheme);

setTheme(newTheme);
};

const applySearch=()=>{
setFilter(tempFilter);
setSortBy(tempSort);
setOpen(false);
};

return(

<header>

<button className="themeToggleBtn" onClick={toggleTheme}>
{theme==="light" ? "🌙" : "☀️"}
</button>

<h1 className="header-title">
Kanban Board
</h1>

<div className="search-container">

<span
className="search-icon"
onClick={()=>setOpen(!open)}
>
🔍
</span>

{open &&(

<div className="search-dropdown">

<input
placeholder="Search tasks"
value={tempFilter}
onChange={e=>setTempFilter(e.target.value)}
/>

<select
value={tempSort}
onChange={e=>setTempSort(e.target.value)}
>
<option value="">Sort none</option>
<option value="title">Title</option>
</select>

<button
className="ok-btn"
onClick={applySearch}
>
OK
</button>

</div>

)}

</div>

</header>

);
}
