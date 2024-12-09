import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../../components/breadcrumb';
import { CONSTANTS } from '../../../includes/constant';
import StatsCard from '../../../components/statsCard';
import BaseTable from '../../../components/baseTable';
import { PostRequest } from '../../../includes/functions';
import { object } from 'yup';
interface StatsProps {
  totalUsers:number;
  totalSchedule:number;
  totalAmount:number;
  list?:any[];
}
interface TransactionHistoryProps {

}
export const DashboardAnalyticsScreen = () => {
  const[loading,setLoading] = useState<boolean>(true);
  const[rows,setRows] = useState<any[]>([]);
  const[transactions,setTransactions] = useState<TransactionHistoryProps[]>([]);
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
        setTransactions(res.data.list);
      }
    })
  }
  const GetTransactions = ()=>{
    setLoading(true);
    PostRequest("get:partner-get-transactions",{}).then((res)=>{
      if(res.status)
        {
          setRows(res.data.map((a:any,i:number)=>{
            return Object.values(a).filter((a,i)=>i !== 0)
          }));
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
      <BaseTable 
      rows={rows}
      headers={[
        "#",
        "Months",
        "Amount",
        "Year",
        "Date"
      ]}
      />
    </div>
  )
}

export default DashboardAnalyticsScreen;