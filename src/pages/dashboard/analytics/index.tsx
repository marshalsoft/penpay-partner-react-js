import React, { FormEvent, useEffect, useState } from 'react'
import BreadCrumb from '../../../components/breadcrumb';
import { CONSTANTS } from '../../../includes/constant';
import StatsCard from '../../../components/statsCard';
import BaseTable from '../../../components/baseTable';
import { PostRequest } from '../../../includes/functions';
import { object } from 'yup';
import moment from 'moment';
import BaseModal from '../../../components/baseModal';
import { BaseButton } from '../../../components/buttons';
interface StatsProps {
  totalUsers:number;
  totalSchedule:number;
  totalAmount:number;
  list?:any[];
}
interface EmployeesProp {
  staffId?:string;
  rsaPin?:string;
  name?:string;
  employeeContribution?:string;
  employerContribution?:string;
  employeeVoluntaryContribution?:string;
  employerVoluntaryContribution?:string;
  providerCode?:string;
  providerName?:string;
}
interface TransactionHistoryProps {
  id?:string;
  monthOfContribution?:string;
  amount?:string;
  yearOfContribution?:string;
  createdAt?:string;
  employees?:EmployeesProp[];
}
interface CommentProps {
  id:string;
  content:string;
  createdAt:string;
}
export const DashboardAnalyticsScreen = () => {
  const[loading,setLoading] = useState<boolean>(true);
  const[search,setSearch] = useState<string>("");
  const[selectedTransactions,setSelectedTransactions] = useState<TransactionHistoryProps | null>(null);
  const[transactions,setTransactions] = useState<TransactionHistoryProps[]>([]);
  const[selectedSection,setSelectedSection] = useState<"comment"|"details">("details");
  const[stats,setStats] = useState<StatsProps>({
    totalUsers:0,
    totalSchedule:0,
    totalAmount:0,
    list:[]
  });

  const GetStatics = ()=>{
    setLoading(true);
    PostRequest("get:partner-get-statistic",{}).then((res)=>{
      if(res.status)
      {
        setStats(res.data);
      }
    })
  }
  const GetTransactions = ()=>{
    setLoading(true);
    PostRequest("get:partner-get-transactions",{}).then((res)=>{
      setLoading(false);
      if(res.status)
        {
          setTransactions(res.data);
        }
    })
  }

 
  useEffect(()=>{
    GetStatics();
    GetTransactions();
  },[])
 
  return (
    <div className='p-3'>
      <BreadCrumb 
      home={{name:"Dashboard",route:"/dashboard"}}
      currenPage='Analytics'
      />
      <div className='row mb-3' >
      <div className='col-4' >
        <StatsCard 
        iconType='users'
        title='Total beneficiaries'
        total={String(stats.totalUsers)}
        />
        </div>  
        <div className='col-4' >
        <StatsCard 
        iconType='transaction'
         title='Total schedule'
        total={String(stats.totalSchedule)}
        />
        </div> 
        <div className='col-4' >
        <StatsCard 
        iconType='income'
         title='Total Amount'
        total={String(stats.totalAmount)}
        />
        </div> 
      </div>
     <div 
    className="card p-3"
    >
<div className="row">
    <div className="col-6"></div>
    <div className="col-6 d-flex justify-content-end gap-2">
  <input
  className="form-control"
  placeholder="Search..."
  value={search}
  onChange={({target})=>{
    setSearch(target.value)
  }}
  />  
 {/* <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Filter
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item" href="#">Action</a></li>
    <li><a className="dropdown-item" href="#">Another action</a></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div> */}
</div>
</div>
<table className="table">
  <thead>
    <tr >
    {[
        "#",
        "Months",
        "Amount",
        "Year",
        "nomber of beneficiares",
        "Date",
        "Action"
      ].map((a,i)=><th scope="col" key={i}>{a}</th>)}

    </tr>
  </thead>
  <tbody>
  {transactions.filter((a,i)=>String(a.monthOfContribution).toLocaleUpperCase()?.includes(String(search).toLocaleUpperCase()) || String(a.yearOfContribution).toLocaleUpperCase()?.includes(String(search).toLocaleUpperCase()) || String(a.amount).toLocaleUpperCase()?.includes(String(search).toLocaleUpperCase())).map((a:TransactionHistoryProps,i:number)=><tr key={i}>
      <th >{i+1}</th>
      <td >{a.monthOfContribution}</td>
      <td >{a.amount}</td>
      <td >{a.yearOfContribution}</td>
      <td >{a.employees?.length}</td>
      <td >{moment(a.createdAt).format("Do,MMM YYYY")}</td>
      <td >
        <button 
        onClick={()=>{
          setSelectedTransactions(a);
        }}
        className='btn btn-success'>Details / Comments</button>
      </td>
    </tr>
    )}
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
    {selectedTransactions !== null?<BaseModal 
    onClose={()=>setSelectedTransactions(null)}
    title="Schedule Details"
    >
  <ul className="nav nav-tabs">
  <li
  onClick={()=>setSelectedSection("details")}
  className="nav-item btn mb-0">
    <div 
    className={`nav-link ${selectedSection === "details"?"active":""}`} aria-current="page" >Details</div>
  </li>
  <li
  onClick={()=>setSelectedSection("comment")}
  className="nav-item btn mb-0">
    <div
     className={`nav-link ${selectedSection === "comment"?"active":""}`} >Comments</div>
  </li>
</ul>
     {selectedSection === "details"?<div
     style={{maxHeight:300,overflow:"scroll"}}
     >
        <table className='table table-responsive'>
          <thead >
          <tr >
            <th scope="col">#</th>
            <th scope="col">RSA Number</th>
            <th scope="col">Total Amount</th>
            </tr>
          </thead>
          <tbody >
          {selectedTransactions?.employees?.map((a:EmployeesProp,i:number)=><tr key={i}>
            <td >{i+1}</td>
            <td >{a.rsaPin}</td>
            <td >NGN{parseFloat(String(a.employeeContribution))+parseFloat(String(a.employeeVoluntaryContribution))+parseFloat(String(a.employerContribution))+parseFloat(String(a.employerVoluntaryContribution))}</td>
            </tr>)}
          </tbody>
        </table>
       
      </div>:<div >
      <ListOfComments 
      id={selectedTransactions.id!}
      onclose={()=>setSelectedTransactions(null)}
      />
      
      </div>}
    </BaseModal>:null}
    </div>
  )
}
interface CommentProps {
  id:string;
  comment:string;
  scheduleId:string;
  email:string;
  read:string;
  createdAt:string;
}
export default DashboardAnalyticsScreen;
const ListOfComments = ({id,onclose}:{id:string;onclose:()=>void})=>{
const [list,setList] = useState<CommentProps[]>([]);
const[loading,setLoading] = useState<boolean>(false);
const[comment,setComment] = useState<string>("");
const[selectedId,setSelectedId] = useState<string>("");

const GetComments = ()=>{
  PostRequest("get:partner-get-comments",{}).then((res)=>{
    if(res.status)
    {
      try {
        const found = Object.keys(res.data.list);
        if(found.includes(id))
        {
        setList(res.data.list[id]);
        }
      } catch (error) {
        
      }
    }
  })
}
const handleComment = (e:FormEvent)=>{
  e.preventDefault();
  setLoading(true);
  PostRequest("partner-post-comment",{
    comment:comment,
    scheduleId:id
  },true).then((res)=>{
    setLoading(false);
    if(res.status)
    {
      setComment("");
      GetComments();
    }
  })
}
const handleDelete = (id:string)=>{
  setSelectedId(id);
  PostRequest("partner-delete-comment",{
    id:id
  },true).then((res)=>{
    setSelectedId("");
    if(res.status)
    {
      GetComments();
    }
  })
}
useEffect(()=>{
  GetComments();
},[])
return <div className='my-3'>
<label ><b>Comments</b></label>
{list.length === 0?<div className='alert alert-danger' >
  No comment found.
</div>:null}
<ul className="m-0 p-0 gap-2" style={{maxHeight:300,overflow:"scroll"}}>
{list.map((a,i)=><li key={i} className="card p-3 mb-2">
  <div 
  >
  <div 
  >
    {a.comment}
    </div>
    <button 
    onClick={()=>handleDelete(a.id)}
    className='btn p-0 m-0'
    style={{position:"absolute",top:10,right:10}}
    >
    {selectedId === id?<BaseLoader />:<TrashIcon />}
    </button>
  </div>
  <div className='d-flex justify-content-start align-items-start'>
    <small className='fw-bold'>{moment(a.createdAt).format("Do, MMM YYYY")}</small>
  </div>
  </li>)}
</ul>
<label ><b>Comment</b></label>
        <form 
        onSubmit={handleComment}
        >
        <textarea 
        className='form-control'
        required
        rows={4}
        onChange={({target})=>{
          setComment(target.value)
        }}
        value={comment}
        ></textarea>
        <BaseButton 
        type='submit'
        style={{float:"right",marginTop:10}}
        loading={loading} 
        >
          Send</BaseButton>
        </form>
</div>
}
const TrashIcon = ()=>{
  return <svg 
  width={24} 
  height={24}
  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
}
const BaseLoader = ()=>{
  return <div className="spinner-border text-success" role="status">
</div>
}