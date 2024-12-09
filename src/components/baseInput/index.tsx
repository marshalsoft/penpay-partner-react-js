import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import './style.css';
import { EyeClose, EyeOpen } from '../../assets/icons/eye';
import { ValidateEmail } from '../../includes/functions';
import { BlockIcon } from '../../assets/icons/closeIcon';
import { FieldChangePayload } from '../../includes/types';
interface BaseInputProps {
    arrayList?:boolean;
    filterValue?:(d:any)=>void;
    error?:any;
    id?:string;
    label?:string;
    disabled?:boolean;
    placeholder?:string;
    name:string;
    required?:boolean;
    value:any;
    type:"text"|"email"|"number"|"mobile"|"password";
    min?:number;
    max?:number;
    pattern?:string;
    onValueChange:(payload: FieldChangePayload) => void | null;
    options?:{value:string;name:string;}[];
}
export default function BaseInput(props:BaseInputProps) {
 const [toggleEye,setToggleEye] = useState(false);
var stringList:string[] = [];
function handleChange(e: ChangeEvent<HTMLInputElement>) {
    props.onValueChange({
    field: e.target.name,
    value: e.target.value,
  });
}
if(typeof props.value === "string")
{
  String(props.value).split(",").map((a,i)=>{
  if(ValidateEmail(a))
  {
    stringList.push(a)
  }
  return a;
})
}
 return (<div className="mb-3">
  {props?.label && <label htmlFor={props.name} className="form-label" style={{position:"relative"}}><small ><b>{props?.label}</b></small>{props.required?<span className='error' style={{position:"absolute",right:-10,top:-8,fontSize:20}}>*</span>:""}</label>}
 <div className={`${props.arrayList?"form-control":"input-wrapper"}`}>
  {props.arrayList && <div className='emailContainer'>
    {stringList.map((a:string,i:number,self:string[])=>{
      return <span className='emailItem' key={i} >{a} <button type="button" onClick={()=>{
        if(props.filterValue)
        {
        props.filterValue(self.filter((b,o)=>i !== o))
        }
      }} className="btn-close btn-close-b" ></button>
      </span>
      
    })}
    </div>}
  <input 
  type={props.type === "password"?toggleEye?"text":"password":props.type}
   className={props.arrayList?"noborder":"form-control"} 
   required={props.required}
   id={props.id} 
   name={props.name} 
   maxLength={props.max}
   minLength={props.min}
   value={props.value}
   disabled={props.disabled}
   placeholder={props.placeholder}
   onChange={handleChange}
   pattern={props.pattern}
   onInvalid={e => (e.target as HTMLInputElement).setCustomValidity(`${props.name} is required.`)}
   onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
  />
   {props.disabled?<span className='input-icon'>
    <BlockIcon size={20}/>
   </span>:props.type === "password" && <span
   onClick={()=>setToggleEye(!toggleEye)} className='input-icon'>
    {!toggleEye?<EyeOpen />:<EyeClose />}
   </span>}
</div>
{props?.error?<div className='error' >{props.error}</div>:null}
</div>
  )
}