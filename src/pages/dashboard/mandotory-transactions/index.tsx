import React, { useEffect, useState } from 'react'
import { ExportXSLSFile, PostRequest } from '../../../includes/functions';
import { DownloadIcon, EmployeesProp, ListOfComments, StatsProps, TransactionHistoryProps } from '../micro';
import BreadCrumb from '../../../components/breadcrumb';
import moment from 'moment';
import BaseModal from '../../../components/baseModal';
import { BaseButton } from '../../../components/buttons';
import { BasePagination } from '../../../components/basePagination';

const MandatoryPensionsTransactionsScreen = () => {
  const[page,setPage] = useState<number>(1);
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
    PostRequest(`get:partner-get-mandatory-transactions`,{}).then((res)=>{
      setLoading(false);
      if(res.status)
        {
          setTransactions(res.data.list);
        }
    })
  }
  
  const GetSearch = (query:string)=>{
    setLoading(true);
    PostRequest(`get:partner-get-mandatory-transaction-by-word?query=${query}`,{}).then((res)=>{
      setLoading(false);
      if(res.status)
        {
          setTransactions(res.data.list);
        }else{
          setTransactions([]);
        }
    })
  }
const handleDownload = ()=>{
setDownloading(true);
const all:any[] = [];
transactions.forEach((ob:any,index:number)=>{
  all.push({
    Id:index+1,
    FullName:ob.fullName,
    MonthOfContribution:ob.monthOfContribution,
    YearOfContribution:ob.yearOfContribution,
    Amount:`N${ob.amount}`,
    EmployerCode:ob.employerCode,
    TransactionRef:ob.refNo,
    CreatedAt:ob.createdAt,
  });
})
  ExportXSLSFile(all,`penpay-mandatory-pensions-${moment().format("DD-MM-YYYY")}`)
  setTimeout(()=>{
  setDownloading(false);
},500)
}
 
  useEffect(()=>{
    // GetStatics();
    GetTransactions();
  },[])
 
  return (
    <div className='p-3'>
      <BreadCrumb 
      home={{name:"Dashboard",route:"/dashboard"}}
      currenPage='Micro Pensions'
      />
      {/* <div className='row mb-3' >
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
      </div> */}
      <h4>Mandatory Pensions</h4>
     <div 
    className="card p-3"
    >
   <div className='row' >
  <div className="col-8 ">
  <input
  className="form-control"
  placeholder="Search..."
  value={search}
  onChange={({target})=>{
    setSearch(target.value)
    GetSearch(target.value)
  }}
  /> 
  </div>
  <div className="d-flex justify-content-end align-items-center col-4">
   {transactions.length !== 0 &&<button 
        onClick={handleDownload}
        style={{width:280}}
        className='btn btn-outline-success d-flex gap-2'>
          <DownloadIcon color='green' /> <span>Download Excel file</span>
   </button>}
</div>
</div>
{transactions.length !== 0?<div >
  <BasePagination 
  onNext={(page)=>{}}
  onPrevious={(page)=>{}}
  />
<table className="table">
  <thead>
    <tr >
    {[
        "#",
        "FullName",
        "Amount",
        "employerCode",
        "Month/Year",
        "Ref. No.",
        "Date",
      ].map((a,i)=><th scope="col" key={i}>{a}</th>)}

    </tr>
  </thead>
  <tbody>
  {transactions.map((a:TransactionHistoryProps,i:number)=><tr key={i}>
      <th >{i+1}</th>
      <td >{a.fullName}</td>
      <td >N{a.amount}</td>
      <td >{a.employerCode}</td>
      <td >{a.monthOfContribution}/{a.yearOfContribution}</td>
      <td >{a.refNo}</td>
      <td >{moment(a.createdAt).format("Do MMM, YYYY")}</td>
      <td >
        {/* <button 
        onClick={()=>{
          setSelectedTransactions(a);
        }}
        className='btn btn-success'>Comments</button> */}
      </td>
      {/* <td >
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
      </td> */}
    </tr>
    
    )}
  </tbody>
</table>
<BasePagination 
  onNext={(page)=>{}}
  onPrevious={(page)=>{}}
  />
</div>
:<div >
  <div style={{height:400}} className='d-flex justify-content-center align-items-center card mt-3'>

  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-database-icon lucide-database"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
  <div >No data found!</div>
  </div>
  </div>}

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

export default MandatoryPensionsTransactionsScreen;