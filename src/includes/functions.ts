/* eslint-disable no-useless-escape */
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { toast} from 'react-toastify';
import { CONSTANTS } from './constant';
import axios,{ AxiosRequestConfig, AxiosResponse} from 'axios';
import { TransactionHistoryProps } from "../pages/dashboard/analytics";
import { EmployeesProp } from "./types";
export interface APIResponse {
    status:boolean;
    data?:any;
    message:string;
    statusCode?:string;
}
export const PostRequest = (uri:string,data:any,success?:boolean,center?:boolean,fileType:"json"|"upload" = "json")=>{
  return new Promise<APIResponse>((resolve)=>{
  const formdata = new FormData();
  Object.keys(data).forEach((ob,i)=>{
   formdata.append(ob,data[ob])
 })
 var getMethod = "post";
  if(String(uri).includes(":"))
  {
    getMethod = String(uri).split(":")[0];
    uri = String(uri).split(":")[1];
  }
 const token = localStorage.getItem(CONSTANTS.Routes.Login);
  const RequestHeaders:any = {
  "Content-Type":fileType === "json"?"application/json":"multipart/form-data",
  "Accept":"application/json",
  "Access-Control-Allow-Origin":"*",
   "Authorization":`Bearer ${token}`
  }
  const options:AxiosRequestConfig = {
    headers:RequestHeaders,
    method:String(getMethod).toLowerCase(),
    url:`${CONSTANTS.BaseURL}${uri}`,
}
if(String(getMethod).toLowerCase() !== "get") {
  options["data"] = fileType === "json"?data:formdata;
}
console.log("RequestHeaders:",
options)
axios(options).then(({data}:AxiosResponse)=>{
  // alert(JSON.stringify(data));
if(data.status)
  {
  if(success)
  {
  toast.success(data.message, {
      position: center?toast.POSITION.TOP_CENTER:toast.POSITION.TOP_RIGHT
    });
  }
  try {
      if(data.data.accessToken)
      {
        localStorage.setItem(CONSTANTS.Routes.Login,data.data.accessToken);
      }  

  } catch (error) {
      
  }
  resolve(data)
  }else{
  toast.error(data.message, {
    position: center?toast.POSITION.TOP_CENTER:toast.POSITION.TOP_RIGHT
   });  
  //  if(data.message.includes("malformed"))
  //  {
  //   localStorage.clear()
  //   window.location.href = "./";
  //  }
   resolve(data)
  }
  }).catch((error)=>{
    console.log("error.response.data:",error);  
if(success )
{
  toast.error(error?.response?.data?error?.response?.data.message:error.message, {
      position:center?toast.POSITION.TOP_CENTER:toast.POSITION.TOP_RIGHT
     });
}
  resolve({
      status:false,
      message:error.message,
      data:{}
  }) 
})
})
}

export const ValidateEmail = (value:string)=>{
    const valid = value.match(
        /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    return valid;
}
export function RemoveSpecialCharaters(d: string) {
  d = String(d).trim();
  return d.replace(/[-+,&\/\\#()$~%.;'":*?<>{}@ ]/g, '');
}
export function ReturnAllNumbers(d: string) {
  d = String(d).trim();
  return d.replace(/[-+,&\/\\#()$~%.;'":*?<>{}A-Z a-z]/g, '');
}
export function ReturnUsername(d: string) {
  d = String(d).trim();
  return d.replace(/[-+,&\/\\#()$~%.;'":*?<>{} 0-9]/g, '');
}
export function ReturnAccountUsername(d: string) {
  d = String(d).trim();
  return d.replace(/[-+,&\/\\#()$~%.;'":*?<>{} ]/g, '');
}
export function ReturnAllNumbersWithComma(d: string) {
  d = String(d).trim();
  return d.replace(/[-+&\/\\#()$~%.;'":*?<>{}A-Z a-z]/g, '');
}
export function ReturnMobile(d: string) {
  d = String(d).trim();
  d = String(d[0]) === '0' ? d.replace('0', '') : d;
  return d.replace(/[-+,&\/\\#()$~%.;'":*?<>{}A-Z a-z]/g, '');
}
export function ReturnAllLetter(d: string) {
  d = String(d).trim();
  return d.replace(/[-+,&\/\\#()$~%.;'":*?<>{} 0-9]/g, '');
}
export function ReturnComma(str: string) {
  if (str === '' || str === ' ' || `${str[0]}` === "0") {
    return "";
  }
  if (str === '.') {
    return String(str).replace('.', '0');
  }
  
  str = String(str).replace(/[^0-9.]/g, '');
  var getDot = String(str).split('.');
  var firstPart = getDot[0];
  if (firstPart.length >= 4) {
    firstPart = firstPart.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (getDot.length >= 2) {
    return firstPart + '.' + getDot[1];
  }
  if (String(firstPart) === '.00') {
    return '';
  }
  return firstPart;
}
  

export const ExportXSLSFile = (list:EmployeesProp[],fileName:string = "excelfile")=>{
    const fileExtension = ".xlsx"
    const filetype = "application/vnd.openxmlformats-officedocumnet.spreadsheetml.sheet;charset-UTF-8";
    const ws = XLSX.utils.json_to_sheet(list);
    const wb = {Sheets:{data:ws},SheetNames:["data"]};
    const excelBuffer =XLSX.write(wb,{bookType:"xlsx",type:"array"});
    const data = new Blob([excelBuffer],{type:filetype});
    return FileSaver.saveAs(data,fileName+fileExtension)
}