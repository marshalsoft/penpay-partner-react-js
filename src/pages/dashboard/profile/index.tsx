import React, { FormEvent, useEffect, useState } from 'react'
import BreadCrumb from '../../../components/breadcrumb';
import StatsCard, { UserIcon } from '../../../components/statsCard';
import { PostRequest } from '../../../includes/functions';
import moment from 'moment';
import BaseModal from '../../../components/baseModal';
import { BaseButton } from '../../../components/buttons';
import { UserProps } from '../../../includes/types';
import BaseInput from '../../../components/baseInput';
export interface FormDataProp {
    email?: string;
    phoneNumber?: string;
    secondaryPhoneNumber?: string;
    postalAddress?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    accountType?: string;
    createdAt?: string;
    homeAddress?: string;
    id?: string;
    rsaNumber?: string;
    authEmailNotification?: number;
    authPushNotification?: number;
    authSMSNotification?: number;
    transEmailNotification?: number;
    transPushNotification?: number;
    transSMSNotification?: number;
    newsEmailNotification?: number;
    newsPushNotification?: number;
    newsSMSNotification?: number;
    providerName?:string;
    currentPasword?:string;
    newPassword?:string;
}
export const DashboardProfileScreen = () => {
  const[loading,setLoading] = useState<boolean>(true);
  const[user,setUserData] = useState<FormDataProp>({
    firstName:"",
    lastName:"",
    email:"",
    phoneNumber:"",
    postalAddress: "",
    secondaryPhoneNumber: "",
    rsaNumber: "",
    providerName:""
  });
 
  const GetProfile = ()=>{
    setLoading(true);
    PostRequest("get:user-details",{}).then((res)=>{
        if(res.status)
      {
        setUserData(res.data);
      }
    })
  }
 
  useEffect(()=>{
    GetProfile();
  },[])
 const HandleProfileUpdate = (e:FormEvent)=>{
    e.preventDefault()
    setLoading(true);
    PostRequest("post:user-update_user_details",{
        phoneNumber:user.phoneNumber
    }).then((res)=>{
        if(res.status)
      {
        setUserData(res.data);
      }
    })
 }
  return (
    <div className='p-3'>
      <BreadCrumb 
      home={{name:"Dashboard",route:"/dashboard"}}
      currenPage='Profile'
      />
     
     <div 
    className=" p-3"
    >
<div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col-10">
                    <div className="d-flex">
                            <div className="gap-2">
                                <div className="text-center">
    <div className="feature-icon bg-success bg-gradient">
     <UserIcon
     size={30}
     />
     </div>
                                </div>
                                <div className="text-center">
                                    {/* <button
                                        type="submit"
                                        // onClick={handleAvatarUpload}
                                        className="btn btn-outline-success mt-3"
                                        style={{ width: 93 }}
                                    >Upload</button> */}
                                </div>
                            </div>
                            <div >

                            </div>
                            <div >
                                <div className="card-body">
                                    <h5 className="card-title"><b>{user?.firstName}</b></h5>
                                    <p className="card-text">
                                        <b>Email: </b>{user?.email}</p>
                                    <p className="card-text">
                                        <b>Phone Number: </b>{user?.phoneNumber}</p>
                                    <p className="card-text">
                                        <b>Created At: </b>{moment(user?.createdAt).format("Do, MMM YYYY hh:mm A")}</p>
                                </div>

                            </div>
                        </div>
                        <hr className="divider" />
                        <form
                        onSubmit={HandleProfileUpdate}
                        >
                            <div className="card p-4 mb-3">
                                {/* <div className="mb-3">
                                    <BaseInput
                                        label={`Postal address`}
                                        value={user.postalAddress!}
                                        onValueChange={(d) => {
                                            // setFormUpdateData({
                                            //     ...formUpdateData,
                                            //     postalAddress: d.value
                                            // })
                                        }}
                                        required
                                        disabled={user?.homeAddress !== null}
                                        id='postalAddress'
                                        placeholder='Enter your postal address'
                                        name='postalAddress'
                                        type='text'
                                        max={150}
                                          />
                                </div> */}
                                <div className="mb-3">
                                    <BaseInput
                                        label={`Alternative phone number`}
                                        value={user.secondaryPhoneNumber!}
                                        onValueChange={(d) => {
                                            setUserData({
                                                ...user,
                                                secondaryPhoneNumber: d.value
                                            })
                                        }}
                                        required
                                        id='alternativePhoneNumber'
                                        placeholder='Enter your phone number'
                                        name='alternativePhoneNumber'
                                        type='mobile'
                                        max={11}
                                           />
                                </div>
                                
                                <div className="d-flex align-items-end justify-content-end " >
                                    <button
                                        type="submit"
                                        className="btn btn-success mt-3"
                                        style={{ width:123 }}
                                    >
                                        <span className="ms-2">Proceed</span>
                                    </button>

                                </div>
                            </div>
                        </form>

                        <div className="page-title">Change Password</div>
                        <form
                            // onSubmit={HandlePasswordChange}
                        >
                            <div className="card alert alert-danger p-4">
                                <div className="mb-3">
                                    <BaseInput
                                        label={`Current Password`}
                                        value={String(user?.currentPasword)}
                                        onValueChange={(d) => {
                                            setUserData({
                                                ...user,
                                                currentPasword: d.value
                                            })
                                        }}
                                        required
                                        id='currentPassword'
                                        placeholder='Enter your first name'
                                        name='currentPassword'
                                        type='password'
                                        // pattern={AppConstants.Validation.ALL_DIGIT}
                                        // errorMessage={'Enter your current password.'}

                                    />
                                </div>
                                <div className="mb-3">
                                    <BaseInput
                                        label={`New Password`}
                                        value={user?.newPassword!}
                                        onValueChange={(d) => {
                                            setUserData({
                                                ...user,
                                                newPassword: d.value
                                            })
                                        }}
                                        required
                                        id='newPassword'
                                        placeholder='Enter your new password'
                                        name='newPassword'
                                        type='password'
                                        // pattern={AppConstants.Validation.ALL_DIGIT}
                                        // errorMessage={'Enter your new password.'}

                                    />
                                </div>
                                <div className="d-flex align-items-end justify-content-end " >
                                    <button
                                        type="submit"
                                        className="btn btn-success mt-3"
                                        style={{ width: 123 }}
                                    >
                                    <span className="ms-2">Proceed</span></button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* <div className="col-5">
                        
                        <div className="page-title">Settings</div>
                        <div className="list-group mb-3">
                            <div className="list-group-item list-group-item-action p-0" aria-current="true">
                                <div className="d-flex w-100 justify-content-between alert alert-success">
                                    <h5 className="mb-3">Authentication</h5>
                                </div>
                                <div className="ps-3" >
                                    <div className="form-check pb-3">
                                        <input className="form-check-input" type="checkbox" 
                                        value={user?.authEmailNotification}
                                        onChange={(d)=>{
                                            // HandlePreferenceUpdate({authEmailNotification:formData?.authEmailNotification === 1?0:1})
                                        }}  
                                        checked={user?.authEmailNotification === 1}
                                        />
                                        <label className="form-check-label" >
                                            Email notification
                                        </label>
                                    </div>
                                    <div className="form-check pb-3">
                                        <input className="form-check-input" 
                                        type="checkbox" 
                                        value={user?.authPushNotification}
                                        onChange={(d)=>{
                                            // HandlePreferenceUpdate({authPushNotification:formData?.authPushNotification === 1?0:1})
                                        }}
                                        checked={user?.authPushNotification === 1}

                                          />
                                        <label className="form-check-label" >
                                            Push notification
                                        </label>
                                    </div>
                                    <div className="form-check pb-3">
                                        <input className="form-check-input" type="checkbox" 
                                        value={user?.authSMSNotification}
                                        onChange={(d)=>{
                                            // HandlePreferenceUpdate({authSMSNotification:formData?.authSMSNotification === 1?0:1})
                                        }} 
                                        checked={user?.authSMSNotification === 1}

                                         />
                                        <label className="form-check-label" >
                                            SMS notification
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="list-group mb-3">
                            <div className="list-group-item list-group-item-action p-0" aria-current="true">
                                <div className="d-flex w-100 justify-content-between alert alert-success">
                                    <h5 className="mb-3">Transaction</h5>
                                </div>
                                <div className="ps-3" >
                                    <div className="form-check pb-3">
                                        <input className="form-check-input" 
                                        type="checkbox" 
                                         value={user?.transEmailNotification}
                                         onChange={(d)=>{
                                            //  HandlePreferenceUpdate({transEmailNotification:formData?.transEmailNotification === 1?0:1})
                                         }} 
                                        checked={user?.transEmailNotification === 1}
                                         />
                                        <label className="form-check-label" >
                                            Email notification
                                        </label>
                                    </div>
                                    <div className="form-check pb-3">
                                        <input className="form-check-input" type="checkbox" 
                                        value={user?.transPushNotification}
                                        onChange={(d)=>{
                                            // HandlePreferenceUpdate({transPushNotification:formData?.transPushNotification === 1?0:1})
                                        }} 
                                        checked={user?.transPushNotification === 1}
                                        />
                                        <label className="form-check-label" >
                                            Push notification
                                        </label>
                                    </div>
                                    <div className="form-check pb-3">
                                        <input className="form-check-input" type="checkbox" 
                                        value={user?.transSMSNotification}
                                        onChange={(d)=>{
                                            // HandlePreferenceUpdate({transSMSNotification:formData?.transSMSNotification === 1?0:1})
                                        }} 
                                        checked={user?.transSMSNotification === 1}
                                        
                                        />
                                        <label className="form-check-label" >
                                            SMS notification
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="list-group mb-3">
                            <div className="list-group-item list-group-item-action p-0" aria-current="true">
                                <div className="d-flex w-100 justify-content-between alert alert-success">
                                    <h5 className="mb-3">Newsletter</h5>
                                </div>
                                <div className="ps-3" >
                                    <div className="form-check pb-3">
                                        <input className="form-check-input" type="checkbox" 
                                         value={user?.newsEmailNotification}
                                         onChange={(d)=>{
                                            //  HandlePreferenceUpdate({newsEmailNotification:formData?.newsEmailNotification === 1?0:1})
                                         }}
                                        checked={user?.newsEmailNotification === 1}
                                         
                                         />
                                        <label className="form-check-label" >
                                            Email notification
                                        </label>
                                    </div>
                                    <div className="form-check pb-3">
                                        <input className="form-check-input" type="checkbox" 
                                           checked={user?.newsPushNotification === 1}
                                        value={user?.newsPushNotification}
                                        onChange={(d)=>{
                                            // HandlePreferenceUpdate({newsPushNotification:formData?.newsPushNotification === 1?0:1})
                                        }}
                                        
                                        />
                                        <label className="form-check-label" >
                                            Push notification
                                        </label>
                                    </div>
                                    <div className="form-check pb-3">
                                        <input 
                                        className="form-check-input" type="checkbox" 
                                        value={user?.newsSMSNotification}
                                        onChange={(d)=>{
                                            // HandlePreferenceUpdate({newsSMSNotification:formData?.newsSMSNotification === 1?0:1})
                                        }} 
                                        checked={user?.newsSMSNotification === 1}
                                        />
                                        <label className="form-check-label" >
                                            SMS notification
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
</div>
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
export default DashboardProfileScreen;
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