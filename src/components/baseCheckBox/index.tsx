import React,{useEffect, useState} from "react";
interface BaseCheckBoxProps {
    title:string;
    value:boolean;
    onValueChange:(value:boolean)=>void;
}

const BaseCheckBox = (props:BaseCheckBoxProps)=>{
    const [value,setValue] = useState<boolean>(false);
    useEffect(()=>{
        setValue(props.value);
    },[props.value])
    return <div className="form-check">
    <input 
    onChange={({target})=>{
        setValue(!value);
        props.onValueChange(!value)
    }}
    className="form-check-input" type="checkbox" value={props.value?1:0} checked={value} />
    <label className="form-check-label" htmlFor="flexCheckChecked">
      {props.title}
    </label>
  </div>
}
export default BaseCheckBox;