import { useState } from "react";
import { APIResponse, PostRequest } from "./functions";
import { LoginProps, UserProps } from "./types";

const useHttpHook = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const handleGetTransactions = () => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            PostRequest("transactions", { method: "post" }).then((res) => {
                setLoading(false);
                resolve(res);
            })
        })
    }
    const handleConfirmPayment = (ref: string, paymentUrl: string) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            PostRequest("confirm_payment", { reference: ref, paymentUrl }, true, true, "upload").then((res) => {
                setLoading(false);
                resolve(res);
            })
        })
    }
    const handleGetSubscriptioPlans = () => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            PostRequest("plans", {}).then((res) => {
                setLoading(false);
                resolve(res);
            })
        })
    }
    const handleGetSubscriptions = () => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            PostRequest("subscriptions", {}).then((res) => {
                setLoading(false);
                resolve(res);
            })
        })
    }
    const handleGeneratePaymentUrl = (id: string, months: number) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            PostRequest("subscribe", { planId: id, months: months }, false, false, "upload").then((res) => {
                setLoading(false);
                resolve(res);
            })
        })
    }
    const handleActivateAccount = (key: string) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            PostRequest("?account_activation=" + key, {}, false).then((res) => {
                setLoading(false);
                resolve(res);
            })
        })
    }
    const handleLogin = (prop: LoginProps) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            PostRequest("partner-login", prop, true).then((res) => {
                setLoading(false);
                resolve(res);
            })
        })
    }
    const handleSignUp = (prop: UserProps) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            PostRequest("partner-register", prop, true).then((res) => {
                setLoading(false);
                resolve(res);
            })
        })
    }
    const handleGetProviders = () => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            PostRequest("get:get-providers", {}, false).then((res) => {
                setLoading(false);
                resolve(res);
            })
        })
    }
    
    const handleForgotPassword = (email:string) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            PostRequest("forgot-password", {email}, true).then((res) => {
                setLoading(false);
                resolve(res);
            })
        })
    }
    return {
        loading,
        handleGetTransactions,
        handleLogin,
        handleSignUp,
        handleGetSubscriptions,
        handleGetProviders,
        handleGetSubscriptioPlans,
        handleGeneratePaymentUrl,
        handleConfirmPayment,
        handleActivateAccount,
        handleForgotPassword,
    }
}
export default useHttpHook;