import { CSSProperties } from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
interface BaseButtonProps {
children:JSX.Element | any;
loading?:boolean;
onClick?:()=>void;
style?:CSSProperties | undefined;
right?:boolean;
type?:"submit" | "button"
}
interface LightYellowButtonProps {
    children:JSX.Element | any;
    to:string;
    style?:CSSProperties | undefined
    }
export const BaseButton = (props:BaseButtonProps)=>{
    return <button 
    type={props.type}
    onClick={props.onClick}
    className="base-button"
    style={props.style}
    >
 {props.loading?<div className="spinner-border spinner-border-sm" role="status">
</div>:props.children}
    </button>
}
export const WhiteButton = (props:BaseButtonProps)=>{
    return <button 
    disabled={props.loading}
    onClick={props.onClick}
    className={"base-button-white"}
    style={{...props.style}}
    >
 {props.loading?<div className="spinner-border spinner-border-sm" role="status">
</div>:props.children}
    </button>
}

export const LightYellowButton = (props:LightYellowButtonProps)=>{
    return <NavLink 
    to={props.to}
    className="light-yellow-button btn"
    >
    {props.children}
    </NavLink>
}