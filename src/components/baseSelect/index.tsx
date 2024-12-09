import { useEffect, useState } from "react";
import { ItemProps } from "../../includes/types";

 interface BaseSelectProps {
    list:ItemProps[];
    onValueChange:(data:ItemProps)=>void;
    placeholder?:string;
    required?:boolean;
 }
 const BaseSelect = (props:BaseSelectProps)=>{
const [selected,setSelected] = useState<string | null>("");
const [list,setList] = useState<ItemProps[]>([]);
useEffect(()=>{
    if(selected !== "" && props.placeholder)
    {
    setList(list.filter((a,i)=>a.name !== props.placeholder));
    }else{
    setList(list.filter((a,i)=>a.name !== "Select an option"));
    }
},[selected])
useEffect(()=>{
setList([{
    value: "",
    name: `${props.placeholder ? props.placeholder : "Select an option"}`,
    id: ""
    },...props.list])
},[props.list])
return <select 
required={props.required}
onChange={({target})=>{
     setSelected(target.value)
     const found = list.find((a,i)=>a.value === target.value)
     if(found)
    {
     props.onValueChange(found)
    }
}}
className="form-select" aria-label="Select an option">
{list.map((a,i)=><option 
selected={selected === a.value} key={i} value={a.value} >{a.name}</option>)}
</select>
}
export default BaseSelect;