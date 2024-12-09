import React, { ChangeEventHandler, FormEvent, useState } from 'react'
import { Logo } from '../../components/logo'
import BaseInput from '../../components/baseInput'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { CONSTANTS } from '../../includes/constant'
import { BaseButton } from '../../components/buttons'
import { PostRequest } from '../../includes/functions';
import { FieldChangePayload, LoginProps } from '../../includes/types'
import useHttpHook from '../../includes/useHttpHook'

export default function ForgotPasswordScreen() {
  const [loading,setLoading] = useState(false);
  const [formData,setFormData] = useState<LoginProps>({
    email:"",
  });
  const handleChange =(prop:FieldChangePayload)=>{
    const { field,value} = prop;
    setFormData({
        ...formData,
        [field]:value
    })
  }
  const {handleForgotPassword} = useHttpHook();
  const navigate = useNavigate()
  const ForgotPassword = (e:FormEvent)=>{
    e.preventDefault()
    setLoading(true);
    handleForgotPassword(formData.email!).then((response)=>{
      if(response.status)
      {
       navigate("/"+CONSTANTS.Routes.Dashboard);
      }
    })
  }
  if(localStorage.getItem(CONSTANTS.Routes.Login))
    {
     return <Navigate to={"/"+CONSTANTS.Routes.Dashboard} />
    }
  return (<div className='container text-center py-5 mt-5'>
   <div >
    <Logo />
  </div>
<form
onSubmit={ForgotPassword}
>
<div className='text-center p-5 ' >
        <div className="title-text">Forgot Password!
        😊</div>
        <div className="">Provide a valid your email and press procced!</div>
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
        <div className='row p-2 pe-3 mb-3' >
        <BaseButton 
        type={"submit"}
        loading={loading}
        >Proceed</BaseButton>
        </div>
        <NavLink to={"../"+CONSTANTS.Routes.Login} 
        className={"blackText"}>
            <span >Have an account? <b >Sign In</b></span>
        </NavLink>
        </div>
        <div className='col-lg-4 d-none d-sm-block' ></div>
        </div>
</div>
</form>
</div>
  )
}