import { NavLink } from "react-router-dom";
interface BreadCrumbProp {
home:{
    name:string;
    route:string;
};
currenPage:string;
}
const BreadCrumb = (props:BreadCrumbProp)=>{
    return <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <NavLink to={props.home.route}>{props.home.name}</NavLink>
        </li>
      <li className="breadcrumb-item active" aria-current="page">{props.currenPage}</li>
    </ol>
  </nav>
}
export default BreadCrumb;