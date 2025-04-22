export const GetDevEnvironment = ()=>{
  return "http://localhost/penpay-api/v1/"// String(window.location.hostname).includes("localhost")?"http://localhost/penpay-api/v1/":String(window.location.hostname).includes("test")?"https://test.penpay.com.ng/v1/":"https://prod.penpay.com.ng/v1/"
}
export const CONSTANTS = {
    BaseURL:GetDevEnvironment(),
    Routes:{
      Login:"login",
      Otp:"otp",
      ForgotPassword:"forgot_password",
      Dashboard:"dashboard",
      Home:"dashboard/",
      Mandatory:"mandatory",
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
    },
    LOCALSTORAGE:{
      token:"partner-token"
    }
}

interface ListProps {
icon?:JSX.Element;
title:string;
link:string;
}

export const DashboardNavItems:ListProps[] = [
  {title:"Micro Pensions",link:"/"+CONSTANTS.Routes.Dashboard},
  {title:"Mandatory Pensions",link:"/"+CONSTANTS.Routes.Dashboard+"/"+CONSTANTS.Routes.Mandatory},
  {title:"Profile",link:"/"+CONSTANTS.Routes.Dashboard+"/"+CONSTANTS.Routes.Profile},
  {title:"Logout",link:"/"+CONSTANTS.Routes.Dashboard+"/?logout=true"},
] 
export const Validation = {
  ADDRESS: '^[A-Za-z 0-9]+$',
  ALLDIGITS_ALLALPHABETS: '^[A-Za-z0-9]+$',
  FULLNAME: '^[A-Z a-z]+$',
  ALL_DIGIT:'^[0-9]+$',
  ACCOUNT_NUMBER:'^[0-9]{10}$',
  NAME_REGEX: '^[A-Za-z]+$',
  PASSWORD_REGEX: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\\W|_]).{8,20}$',
  PHONE_REGEX: '^[0-9]{10}$',
  PHONE_NUMBER_REGEX: '^0(?:701|702|703|704|705|706|707|708|709|710|711|712|713|714|715|716|717|718|719|720|721|722|723|724|725|726|727|728|729|730|731|732|733|734|735|736|737|738|739|740|741|742|743|744|745|746|747|748|749|750|751|752|753|754|755|756|757|758|759|760|761|762|763|764|765|766|767|768|769|770|771|772|773|774|775|776|777|778|779|780|781|782|783|784|785|786|787|788|789|790|791|792|793|794|795|796|797|798|799|800|801|802|803|804|805|806|807|808|809|810|811|812|813|814|815|816|817|818|819|820|821|822|823|824|825|826|827|828|829|830|831|832|833|834|835|836|837|838|839|840|841|842|843|844|845|846|847|848|849|850|851|852|853|854|855|856|857|858|859|860|861|862|863|864|865|866|867|868|869|870|871|872|873|874|875|876|877|878|879|880|881|882|883|884|885|886|887|888|889|890|891|892|893|894|895|896|897|898|899)[0-9]{7}$',
  EMAIL_REGEX: '\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,})',
  BVN_REGEX: '^[0-9]{11}$',
  RSA_PIN_REGEX: '^PEN[0-9]{12}$',
  PASSWORD_CHECKS: [
    {
      id: 1,
      title: 'at least one lowercase letter',
      pattern: '^(?=.*[a-z])',
    },
    {
      id: 2,
      title: 'at least one uppercase letter',
      pattern: '^(?=.*[A-Z])',
    },
    {
      id: 3,
      title: 'at least one number',
      pattern: '^(?=.*[0-9])',
    },
    {
      id: 4,
      title: 'at least one special character',
      pattern: '^(?=.*[\\W|_])',
    },
  ],
  MINIMUM_AMOUNT:`^[0-9]{3,}$`,
  LOGIN_PHONE_REGEX: '^[0-9]{11}$',
}
export const Currency ={
  symbol:"₦",
  code: "NGN"
}