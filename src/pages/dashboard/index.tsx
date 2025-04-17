import React, { useEffect } from 'react'
import { CONSTANTS, DashboardNavItems } from '../../includes/constant';
import { Link, Navigate, Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Logo } from '../../components/logo';
import { List, ListPlus, LogOutIcon, Settings, User2Icon } from 'lucide-react';
export const DashboardScreen = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    useEffect(() => {
        const params = searchParams.get("logout");
        if (params) {
            localStorage.clear();
            navigate("/login")
        }
    }, [searchParams])
    if (!localStorage.getItem(CONSTANTS.LOCALSTORAGE.token)) {
        return <Navigate to={"/" + CONSTANTS.Routes.Login} />
    }
    return (<div className="container-fluid" style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
        <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none d-none d-sm-inline">
                        <Logo size={120} />
                    </a>
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        {DashboardNavItems.map((a, i) => <li key={i} className="nav-item">
                            <Link to={a.link} className="nav-link align-items-start gap-1 py-3 d-flex text-success">
                                {i === 0 && <ListPlus />}
                                {i === 1 && <List />}
                                {i === 2 && <Settings />}
                                {i === 3 && <LogOutIcon />}
                                <span className={`ms-1 d-none d-sm-inline text-white ${a.title}`}>{a.title}</span>
                            </Link>
                        </li>)}
                    </ul>
                    <hr />
                </div>
            </div>
            <div className="col py-3" style={{ height: "100vh", overflow: "scroll" }}>
                <Outlet />
            </div>
        </div>
    </div>
    )
}

export default DashboardScreen;
