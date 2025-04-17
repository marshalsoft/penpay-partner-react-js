/* eslint-disable react-hooks/exhaustive-deps */
import React, { FormEvent, useEffect, useState } from 'react'
import BaseInput from '../../components/baseInput'
import { NavLink, useNavigate } from 'react-router-dom'
import { CONSTANTS, Validation } from '../../includes/constant'
import { BaseButton } from '../../components/buttons'
import { Logo } from '../../components/logo'
import { FieldChangePayload, ItemProps, UserProps } from '../../includes/types'
import BaseCheckBox from '../../components/baseCheckBox'
import BaseSelect from '../../components/baseSelect'
import useHttpHook from '../../includes/useHttpHook'
import { toast } from 'react-toastify'

export default function RegisterScreen() {
  const pfaList: ItemProps[] = [
    { name: "STANBIC IBTC PENSION", under: "ZPCL", value: "STANBIC IBTC PENSION", id: "1",list:["STANBIC"] },
    { name: "PAL PENSIONS", under: "ZPCL", value: "PAL PENSIONS", id: "2" ,list:["PAL PENSIONS"] },
    { name: "TRUSTFUND PENSION", under: "ZPCL", value: "TRUSTFUND PENSION", id: "3",list:["TRUSTFUND"] },
    { name: "GT PENSION", under: "ZPCL", value: "GT PENSION", id: "4",list:["GT PENSION"] },
    { name: "NLPC PFA", under: "ZPCL", value: "NLPC PFA", id: "5",list:["NLPC"] },
    { name: "CRUSADER PFA", under: "ZPCL", value: "CRUSADER PFA", id: "6",list:["CRUSADER"] },
    { name: "ARM PENSIONS", under: "ZPCL", value: "ARM PENSIONS", id: "7",list:["ARM"] },
    { name: "TANGERINEAPT Pensions", under: "FPCN", value: "TANGERINEAPT Pensions", id: "8",list:["TANGERINEAPT"] },
    { name: "LEADWAY PENSURE Pensions", under: "FPCN", value: "LEADWAY PENSURE Pensions", id: "9",list:["LEADWAY"] },
    { name: "NORRENBERGER Pensions", under: "FPCN", value: "NORRENBERGER Pensions", id: "10",list:["NORRENBERGER"] },
    { name: "RADIX Pensions", under: "FPCN", value: "RADIX Pensions", id: "11",list:["RADIX"] },
    { name: "OAK Pensions", under: "FPCN", value: "OAK Pensions", id: "12",list:["OAK"] },
    { name: "Premium Pensions", under: "UPCL", value: "Premium Pensions", id: "13",list:["Premium"] },
    { name: "Veritas Pensions", under: "UPCL", value: "Veritas Pensions", id: "14",list:["Veritas"] },
    { name: "Fidelity Pensions", under: "UPCL", value: "Fidelity Pensions", id: "15",list:["STANBIC"] },
    { name: "FCMB Pensions", under: "UPCL", value: "FCMB Pensions", id: "16",list:["FCMB"] },
    { name: "Access Pensions", under: "UPCL", value: "Access Pensions", id: "17",list:["ACCESS"] }
  ]

  const { handleSignUp, handleGetProviders } = useHttpHook();
  const [providerNamePFC, setProviderNamePFC] = useState<string>("");
  const [providerNamePFA, setProviderNamePFA] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserProps>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    accountType: "PFC",
    providerName: "",
    confirmPassword: "",
    list: []
  });
  const pfcList = [
    {
      id: "1", name: "First Pension Custodian Nigeria.", value: "FPCN", list: [
        "TANGERINEAPT",
        "LEADWAY",
        "NORRENBERGER",
        "RADIX",
        "OAK",
      ]
    },
    {
      id: "2", name: "UBA Pensions Custodian Ltd.", value: "UPCL", list: [
        "PREMIUM",
        "VERITAS",
        "FIDELITY",
        "FCMB",
        "ACCESS"
      ]
    },
    {
      id: "3", name: "Zenith Pensions Custodian Ltd.", value: "ZPCL", list: [
        "PAL",
        "SIPML",
        "TRUSTFUND",
        "GT PENSION",
        "NLPC",
        "CPL PFA",
        "ARM PENSIONS",
      ]
    }
  ]
  const handleChange = (prop: FieldChangePayload) => {
    const { field, value } = prop;
    setFormData({
      ...formData,
      [field]: value
    })
  }
  const navigate = useNavigate()
  const UserRegistration = (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return  toast.error("Password doesn't match!", {
        position:toast.POSITION.TOP_CENTER
       });
    }
    if (formData.providerName === "") {
      if (formData.accountType === "PFA") {
      formData.providerName = pfaList[0].name;
      }else{
        formData.providerName = pfcList[0].name;
      }
    }else{
      if (formData.accountType === "PFA") {
      formData.providerName = providerNamePFA; 
      }else{
        formData.providerName = providerNamePFC;  
      }
    }
    if (formData.accountType === "PFA" ) {
        formData.firstName = providerNamePFA;
     }
     
     if (formData.accountType === "PFC" ) {
        formData.firstName = providerNamePFC;
     }
       
    if (formData.accountType === "PFA") {
      formData.list = [];
    }
    formData.lastName = formData.accountType;
    const found = pfcList.find((a, i) => a.name === formData.providerName)
    if (found) {
      formData.list = found.list;
    }
    setFetching(true);
    handleSignUp(formData).then((response) => {
      setFetching(false);
      if (response.status) {
        navigate("/" + CONSTANTS.Routes.Login, { replace: true });
      }
    })
  }

  useEffect(() => {
    setProviderNamePFC(pfcList[0].name);
    setProviderNamePFA(pfaList[0].name);
  }, [])

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
            {/* <BaseInput 
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
          /> */}

            <div className='row'>
              <div className='col-6'>
                <div className='alert alert-success'>
                  <BaseCheckBox
                    value={formData.accountType === "PFA"}
                    title='PFA Account'
                    onValueChange={(value) => {
                      handleChange({ field: "accountType", value: "PFA" })
                    }}
                  />
                </div>
              </div>
              <div className='col-6'>
                <div className='alert alert-success'>
                  <BaseCheckBox
                    value={formData.accountType === "PFC"}
                    title='PFC Account'
                    onValueChange={(value) => {
                      handleChange({ field: "accountType", value: "PFC" })
                    }}
                  />
                </div>
              </div>

            </div>
            <div className='mb-3'>
              {formData.accountType === "PFA" ? <BaseSelect
                required
                list={pfaList}
                onValueChange={({ id, name, value }) => {
                  setProviderNamePFA(name);
                }}
              /> : <BaseSelect
                required
                list={pfcList}
                onValueChange={({ id, name, value }) => {
                  setProviderNamePFC(name);
                }}
              />}
            </div>
            <BaseInput
              name='phoneNumber'
              type='mobile'
              placeholder='Enter your phone number'
              max={11}
              onValueChange={handleChange}
              value={formData.phoneNumber}
              required={true}
              pattern={Validation.PHONE_NUMBER_REGEX}
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
              min={8}
              max={30}
              onValueChange={handleChange}
              value={String(formData.password).replace(/[ ]/g, '')}
              pattern={Validation.PASSWORD_REGEX}
              required
            />
            <BaseInput
              name='confirmPassword'
              type='password'
              placeholder='Confirm Password'
              min={8}
              max={30}
              onValueChange={handleChange}
              value={String(formData.confirmPassword).replace(/[ ]/g, '')}
              pattern={Validation.PASSWORD_REGEX}
              required
            />
            <div className='row p-2 pe-3 mb-3 mt-4' >
              <BaseButton
                type='submit'
                loading={fetching}
              >Register</BaseButton>
            </div>
            <NavLink to={"../" + CONSTANTS.Routes.Login}
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