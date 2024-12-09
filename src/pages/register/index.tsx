import React, { FormEvent, useEffect, useState } from 'react'
import BaseInput from '../../components/baseInput'
import { NavLink, useNavigate } from 'react-router-dom'
import { CONSTANTS } from '../../includes/constant'
import { BaseButton } from '../../components/buttons'
import { Formik} from 'formik';
import * as y from 'yup';
import { PostRequest } from '../../includes/functions';
import { Logo } from '../../components/logo'
import { FieldChangePayload, ItemProps, UserProps } from '../../includes/types'
import BaseCheckBox from '../../components/baseCheckBox'
import BaseSelect from '../../components/baseSelect'
import useHttpHook from '../../includes/useHttpHook'

const schema = y.object({
    firstName:y.string().required(),
    lastName:y.string().required(),
    password:y.string().required(),
    email:y.string().required().email("A valid email is required."),
    phoneNumber:y.string().required()
    })
  export default function RegisterScreen() {
    const {loading,handleSignUp,handleGetProviders} = useHttpHook();
    const [providers,setProviders] = useState<ItemProps[]>([])
    const [formData,setFormData] = useState<UserProps>({
      email:"",
      password:"",
      firstName:"",
      lastName:"",
      phoneNumber:"",
      accountType:"PFA",
      providerName:""
    });
    const handleChange =(prop:FieldChangePayload)=>{
        const { field,value} = prop;
        setFormData({
            ...formData,
            [field]:value
        })
        console.log(value)
      }
      const navigate = useNavigate()
      const UserRegistration = (e:FormEvent)=>{
      e.preventDefault()
      handleSignUp(formData).then((response)=>{
        if(response.status)
        {
         navigate("/"+CONSTANTS.Routes.Login,{replace:true});
        }
      })
    }
    useEffect(()=>{
        handleGetProviders().then((res)=>{
            if(res.status)
            {
                setProviders(res.data.providers.map((a:any,i:number)=>{
                    return {
                        ...a,
                        value:a.id
                    }
                }))
            }
        });
    },[])
    return (<div className='container text-center pt-5'>
      <div >
        <Logo />
      </div>
  <form
  onSubmit={UserRegistration}>
  <div className='text-center pt-3' >
          <div className="title-text">Welcome to Penpay Partner!
          😊</div>
          <div className="">Sign up with your valid details.</div>
          <div className='row my-3' >
          <div className='col-lg-4 d-none d-sm-block' ></div>
          <div className='col-lg-4 col-sm-12 col-md-12' >
          <BaseInput 
          name='firstName'
          type='text'
          placeholder='Enter your first name.'
          max={50}
          onValueChange={handleChange}  
           value={formData.firstName}
          required={true}
          />
          <BaseInput 
          name='lastName'
          type='text'
          placeholder='Enter your last name'
          max={50}
          onValueChange={handleChange}  
           value={formData.lastName}
          required={true}
          />
           <BaseInput 
          name='phoneNumber'
          type='mobile'
          placeholder='Enter your phone number'
          max={15}
          onValueChange={handleChange}  
          value={formData.phoneNumber}
          required={true}
          pattern='[0-9]{3}'
          />
          <BaseInput 
          name='email'
          type='email'
          placeholder='Enter your email'
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
          <div className='col-6'>
          <div className='alert alert-success'>
            <BaseCheckBox
            value={formData.accountType === "PFA"}
            title='PFA Account'
            onValueChange={(value)=>{
                handleChange({field:"accountType",value:value?"PFA":"PFC"})
            }}
            />
          </div>
          </div>
          <div className='col-6'>
          <div className='alert alert-success'>
            <BaseCheckBox
            value={formData.accountType === "PFC"}
            title='PFC Account'
            onValueChange={(value)=>{
                handleChange({field:"accountType",value:value?"PFC":"PFA"})
            }}
            />
          </div>
          </div>
          </div>
          {formData.accountType === "PFA"?<BaseSelect 
          required
          list={providers}
          onValueChange={({id,name,value})=>{
            handleChange({field:"providerName",value:name});
          }}
          />:null}
          <div className='row p-2 pe-3 mb-3 mt-4' >
          <BaseButton 
          type='submit'
          loading={loading}
          >Register</BaseButton>
          </div>
          <NavLink to={"../"+CONSTANTS.Routes.Login} 
          className={"blackText"}>
              <span >I have account? <b >Login</b></span>
          </NavLink>
          </div>
          <div className='col-lg-4 d-none d-sm-block' ></div>
          </div>
  </div>
   </form>
       </div>
    )
  }