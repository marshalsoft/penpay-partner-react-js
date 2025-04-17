import React, { ChangeEventHandler, FormEvent, useState } from 'react'
import { Logo } from '../../components/logo'
import BaseInput from '../../components/baseInput'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { CONSTANTS } from '../../includes/constant'
import { BaseButton } from '../../components/buttons'
import { PostRequest } from '../../includes/functions';
import { FieldChangePayload, LoginProps } from '../../includes/types'
import useHttpHook from '../../includes/useHttpHook'

interface LoginScreenProp {
  activated_text?:string;
}
export default function LoginScreen(prop:LoginScreenProp) {
  const [formData,setFormData] = useState<LoginProps>({
    email:"",
    password:""
  });
  const handleChange =(prop:FieldChangePayload)=>{
    const { field,value} = prop;
    setFormData({
        ...formData,
        [field]:value
    })
  }
  const navigate = useNavigate();
  const {handleLogin,loading} = useHttpHook()
  const UserLogin = (e:FormEvent)=>{
    e.preventDefault()
    handleLogin(formData).then((response)=>{
      if(response.status)
      {
       navigate("/"+CONSTANTS.Routes.Dashboard);
      }
    })
  }
  if(localStorage.getItem(CONSTANTS.LOCALSTORAGE.token))
    {
     return <Navigate to={"/"+CONSTANTS.Routes.Dashboard} />
    }
  return (<div className='container text-center py-5 mt-5'>
   <div >
    <Logo />
  </div>
<form
onSubmit={UserLogin}

>
<div className='text-center p-5 ' >
        <div className="title-text">Welcome to PENPAY Partner!
        😊</div>
  {prop?.activated_text?<div 
  className='alert alert-success my-3'
  >
{prop?.activated_text}
  </div>:null}
        <div className="">Provide a valid your email and password!</div>
        <div className='row my-3' >
        <div className='col-lg-4 d-none d-sm-block' ></div>
        <div className='col-lg-4 col-sm-12 col-md-12' >
        <BaseInput 
        name='email'
        type='email'
        placeholder='Email address'
        max={100}
        onValueChange={handleChange}  
        value={formData.email}
        required
        />
         <BaseInput 
        name='password'
        type='password'
        placeholder='Password'
        max={50}
        onValueChange={handleChange} 
        value={formData.password}
        required
        />
        <div className='row'>
        <div className='col-12 mb-5'>
        <NavLink to={"../"+CONSTANTS.Routes.ForgotPassword} className={"recovery-text"}>
            <span >Forgot password? <b>Recover</b></span>
        </NavLink>
        </div>
        </div>
        <div className='row p-2 pe-3 mb-3' >
        <BaseButton 
        type={"submit"}
        loading={loading}
        >Login</BaseButton>
        </div>
        <NavLink to={"../"+CONSTANTS.Routes.CreateAccount} 
        className={"blackText"}>
            <span >I don't have account? <b >Sign Up</b></span>
        </NavLink>
        </div>
        <div className='col-lg-4 d-none d-sm-block' ></div>
        </div>
</div>
</form>
</div>
  )
}