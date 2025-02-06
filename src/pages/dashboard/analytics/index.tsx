import React, { FormEvent, useEffect, useState } from 'react'
import BreadCrumb from '../../../components/breadcrumb';
import { CONSTANTS, Currency } from '../../../includes/constant';
import StatsCard from '../../../components/statsCard';
import BaseTable from '../../../components/baseTable';
import { ExportXSLSFile, PostRequest } from '../../../includes/functions';
import { object } from 'yup';
import moment from 'moment';
import BaseModal from '../../../components/baseModal';
import { BaseButton } from '../../../components/buttons';
interface StatsProps {
  totalUsers?:number;
  totalSchedule?:number;
  totalAmount?:number;
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
export interface TransactionHistoryProps {
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
  const[downloading,setDownloading] = useState<boolean>(false);
  
  const[search,setSearch] = useState<string>("");
  const[selectedTransactions,setSelectedTransactions] = useState<TransactionHistoryProps | null>(null);
  const[selectedTransactionList,setSelectedTransactionList] = useState<TransactionHistoryProps[]>([]);
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
const handleDownload = ()=>{
  setDownloading(true);
  const all:EmployeesProp[] = [];
selectedTransactionList.forEach((ob)=>{
ob.employees?.forEach((emp)=>{
  all.push(emp);
})
})
  ExportXSLSFile(all,`selected-Schedule`)
  setTimeout(()=>{
  setDownloading(false);
},500)
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
    setSelectedTransactionList([])
  }}
  /> 
   {selectedTransactionList.length !== 0 &&<button 
        onClick={handleDownload}
        className='btn btn-outline-success d-flex gap-2'>
          <DownloadIcon color='green' /> <span>Download({selectedTransactionList.length})</span>
        </button>}
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
        "Action",
        "",
      ].map((a,i)=><th scope="col" key={i}>{a}</th>)}

    </tr>
  </thead>
  <tbody>
  {transactions.filter((a,i)=>String(a.monthOfContribution).toLocaleUpperCase()?.includes(String(search).toLocaleUpperCase()) || String(a.yearOfContribution).toLocaleUpperCase()?.includes(String(search).toLocaleUpperCase()) || String(a.amount).toLocaleUpperCase()?.includes(String(search).toLocaleUpperCase())).map((a:TransactionHistoryProps,i:number)=><tr key={i}>
      <th >{i+1}</th>
      <td >{a.monthOfContribution}</td>
      <td >{Currency.symbol}{a.amount}</td>
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
      <td >
      <input 
                className="form-check-input" type="checkbox" 
                value="" 
                onChange={({target})=>{
                  const selectedList = selectedTransactionList.find((b,i)=>b.id === a.id)
                  if(selectedList)
                  {
                    setSelectedTransactionList(selectedTransactionList.filter((b,i)=>b.id !== a.id))
                  }else{
                    setSelectedTransactionList([...selectedTransactionList,a]);
                  }
                }}
                id={`${i}`} />
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
       <BaseButton 
       onClick={handleDownload}
       loading={downloading}
       style={{float:"right"}}
       >
        <div className='d-flex alignt-items-center gap-2'>
        <DownloadIcon /><span >Download</span></div>
       </BaseButton>
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
      // GetComments();
      setList(list.filter((a,i)=>a.id !== id))

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

export const DownloadIcon = ({color}:{color?:string})=>{
  return <svg width="20px" 
  height="20px" 
  viewBox="0 0 24 24" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg" stroke={color?color:"#ffffff"}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z" fill={color?color:"#ffffff"}></path> <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" fill={color?color:"#ffffff"}></path> </g></svg>
}