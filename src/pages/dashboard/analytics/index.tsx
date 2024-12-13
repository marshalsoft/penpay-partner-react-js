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
  const[comment,setComment] = useState<string>("");
  const[search,setSearch] = useState<string>("");
  const[loading,setLoading] = useState<boolean>(true);
  const[selectedTransactions,setSelectedTransactions] = useState<TransactionHistoryProps | null>(null);
  const[transactions,setTransactions] = useState<TransactionHistoryProps[]>([]);
  const[commentList,setAllComments] = useState<CommentProps[]>([]);
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
  const GetComments = ()=>{
    PostRequest("get:partner-get-comments",{}).then((res)=>{
      if(res.status)
        {
          setAllComments(res.data);
        }
    })
  }
  useEffect(()=>{
    GetStatics();
    GetComments();
    GetTransactions();
  },[])
  const handleComment = (e:FormEvent)=>{
    e.preventDefault();
    setLoading(true);
    PostRequest("partner-post-comment",{
      comment:comment,
      scheduleId:selectedTransactions?.id
    },true).then((res)=>{
      setLoading(false);
      setComment("");
    })
  }
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
        className='btn btn-success'>View</button>
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
      <div>
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
        <label >Comment</label>
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
    </BaseModal>:null}
    </div>
  )
}

export default DashboardAnalyticsScreen;