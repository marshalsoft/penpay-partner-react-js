import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { CONSTANTS } from './includes/constant';
import LoginScreen from './pages/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterScreen from './pages/register';
import ForgotPasswordScreen from './pages/forgotPassword';
import DashboardScreen from './pages/dashboard';
import DashboardAnalyticsScreen from './pages/dashboard/micro/index';
import DashboardTransactionsScreen from './pages/dashboard/micro/index';
import DashboardProfileScreen from './pages/dashboard/profile';
import MandatoryPensionsTransactionsScreen from './pages/dashboard/mandotory-transactions';
function App() {
  return (<BrowserRouter>
    <Routes>
   <Route 
    path={CONSTANTS.Routes.Dashboard} element={<DashboardScreen />}
    errorElement={<DashboardAnalyticsScreen />}
    >
    <Route path={CONSTANTS.Routes.Mandatory} element={<MandatoryPensionsTransactionsScreen />} />
    <Route path={CONSTANTS.Routes.Profile} element={<DashboardProfileScreen />} />
    <Route path={CONSTANTS.Routes.History} element={<DashboardTransactionsScreen />}  /> 
    <Route path={""} element={<DashboardAnalyticsScreen />} />
    <Route path={"*"} element={<DashboardAnalyticsScreen />} /> 
    </Route> 
    <Route path={CONSTANTS.Routes.Login} element={<LoginScreen />} />
    <Route path={CONSTANTS.Routes.CreateAccount} element={<RegisterScreen />} />
    <Route path={CONSTANTS.Routes.ForgotPassword} element={<ForgotPasswordScreen />} />
    <Route path={"*"} element={<LoginScreen />} />
    </Routes>
    <ToastContainer />
    </BrowserRouter>);
}
   
export default App;