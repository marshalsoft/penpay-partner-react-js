import LogoImage  from "../assets/images/logo.png";
export const Logo = (props:{size?:any})=>{
    return <img 
    src={LogoImage}
    className="logo"
    style={{width:props.size?props.size:"200px"}}
    />
    
}