interface BaseTableProps {
filterList?:any[];
headers?:string[];
onSearch?:(data:string)=>void;
rows?:any[];
nextPage?:boolean;
previousPage?:boolean;
}
const BaseTable = (props:BaseTableProps)=>{
    return <div 
    className="card p-3"
    >
<div className="row">
    <div className="col-6"></div>
    <div className="col-6 d-flex justify-content-end gap-2">
  <input
  className="form-control"
  placeholder="Search..."
  />  
 <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Filter
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item" href="#">Action</a></li>
    <li><a className="dropdown-item" href="#">Another action</a></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
</div>
</div>
<table className="table">
  <thead>
    <tr >
    {props.headers?.map((a,i)=><th scope="col" key={i}>{a}</th>)}
    </tr>
  </thead>
  <tbody>
   {props.rows?.map((a,i)=>{
    return <tr key={i}>
      <th scope="row">{i+1}</th>
      {a.map((a:string,i:number)=><td key={i}>{a}</td>)}
    </tr>})}
  </tbody>
</table>
<div className="d-flex justify-content-end">
<nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</div>
    </div>
}
export default BaseTable;