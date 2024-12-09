import { ChangeEventHandler } from "react";

export interface ChartDataProps {
    data:number[];
    labels:string[];
    }
    export interface VehicleProps {
        __v:number;
        _id:string;
        make:string;
        year:string;
        regnumber:string;
        chasisNumber?:string;
        createdAt?:string;
        qrCode?:string;
        registrationNumber?:string;
        tag?:string;
        updatedAt?:string;
        vehicleModel?:string;
    }
    export interface HistoryProps {
        _id:string;
        employeeId:string;
        employeeName:string;
        email:string;
        checkIn:string;
        checkOut: string;
        location: string;
        vehicleName: string;
        vehicleNumber:string;
        vehicleTag:string;
        companyName:string;
        companyId: string;
    }
    export interface EmployeesProp {
    
    }
    export type FieldChangePayload = {
        [x: string]: any;
        field: string;
        value: string;
      };
    export interface LoginProps {
    email?:string;
    password?:string;
    }
    export interface BusinessProps {
        _id?:string;
        logo?:string;
        name?:string;
        location?:string;
        department?:string;
        email?:string;
        createdAt?:string;
        employees?:EmployeesProp[];
        status?:string;
        updatedAt?:string;
        __v?:number;
    }
    
    export interface UserProps {
        firstname?:string;
        lastname?:string;
        email?:string;
        accountType?:string;
        id?:string;
        password?:string;
        firstName?:string;
        lastName?:string;
        phoneNumber?:string;
        providerName?:string;
    }
    export interface ItemProps {
        id:string;
        name:string;
        value:string;
        icon?:HTMLElement;
    }