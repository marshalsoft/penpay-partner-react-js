export const GetDevEnvironment = ()=>{
  return String(window.location.hostname).includes("localhost")
}
export const CONSTANTS = {
    BaseURL:GetDevEnvironment()?"http://localhost/penpay-api/v1/":"https://test.penpay.com.ng/v1/",
    Routes:{
      Login:"login",
      Otp:"otp",
      ForgotPassword:"forgot_password",
      Dashboard:"dashboard",
      Home:"dashboard/",
      History:"schedules",
      CreatePassword:"create_password",
      Settings:"settings",
      Subscriptions:"subscriptions",
      Profile:"profile",
      CreateAccount:"register",
      AccountActivation:"activate_account/:key"
    },
    Events:{
      reloadBusiness:"reloadBusiness",
      reloadAllBusiness:"reloadAllBusiness",
      reloadVehicles:"reloadVehicles"
    }
}

interface ListProps {
icon?:JSX.Element;
title:string;
link:string;
}

export const DashboardNavItems:ListProps[] = [
  {title:"Dashboard",link:"/"+CONSTANTS.Routes.Dashboard},
  {title:"Schedules",link:"/"+CONSTANTS.Routes.Dashboard+"/"+CONSTANTS.Routes.History},
  {title:"Profile",link:"/"+CONSTANTS.Routes.Dashboard+"/"+CONSTANTS.Routes.Profile},
] 