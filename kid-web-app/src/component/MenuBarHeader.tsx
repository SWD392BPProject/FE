'use client'
import { ROLE_ADMIN, ROLE_HOST, USER_COOKIE } from "@/common/Constant";
import { UserInfoCookie } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
export default function MenuBarHeader(){
    const pathname = usePathname()
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const [isLogged, setIsLogged] = React.useState(false);
    const [isHostManager, setIsHostManager] = React.useState(false);
    const [isAdminManager, setIsAdminManager] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [isAdminRoute, setIsAdminRoute] = React.useState<boolean>(
        pathname.startsWith('/admin/')
    );
    const [isHostRoute, setIsHostRoute] = React.useState<boolean>(
        pathname.startsWith('/host/')
    );

    React.useEffect(()=>{
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
        
    }, []);

    function CheckRole(){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            if(userInfoCookie.role == ROLE_HOST){
                setIsHostManager(true);
                setIsAdminManager(false);
            } else if(userInfoCookie.role == ROLE_ADMIN){
                setIsHostManager(false);
                setIsAdminManager(true);
            }
        }
    }

    React.useEffect(() => {
        setIsAdminRoute(pathname.startsWith('/admin/'));
        setIsHostRoute(pathname.startsWith('/host/'));
    }, [pathname]);

    React.useEffect(()=>{
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
        function isLogined(){
            const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
            if(userInfoCookie){
                setEmail(userInfoCookie.email);
                setIsLogged(true);
            }else{
                setIsLogged(false);
                setEmail('');
            }
        }
        isLogined();
        CheckRole();
    },[cookieUser]);

    return(
        <div className="bg-white">
            {/* // <!-- TOP HEADER --> */}
            <div className="row d-flex justify-content-center bg-primary">
                <div className="col-12 col-sm-12 col-md-9 d-flex my-2">
                    <span className="text-white">Over 350 of World's Best Natural Services | Booking Kid Party.</span>
                    <div className="flex-grow-1"></div>
                    <span className="text-white cursor-pointer">Đăng ký nhận khuyến mãi</span>
                </div>
            </div>
            {/* // <!-- LOGO BAR --> */}
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-sm-12 col-md-9 d-flex my-2 row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-2">
                        <Image alt={""} src="/img/LOGO.png" width={150} height={120}/>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-7">
                        <div className="form-group d-flex align-items-center h-100 w-100">
                            <input className="form-control" placeholder="Tìm kiếm" />
                            <button className="btn btn-primary">Seach</button>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-3 d-flex align-items-center justify-content-end">
                        <Link href={"/login"}><span className="text-primary cursor-pointer">{isLogged?"Logout":"Login"}</span></Link>
                        {isAdminManager && (
                            <Link href={"/admin/dashboard"}><span className="ms-2 text-danger cursor-pointer">| Admin Manager</span></Link>
                        ) || isHostManager && (
                            <Link href={"/host/party"}><span className="ms-2 text-danger cursor-pointer">| Host Manager</span></Link>
                        ) || !isHostManager && isLogged && (
                            <Link href={"/orders"}><span className="ms-2 text-danger cursor-pointer">| Orders</span></Link>
                        )}
                    </div>
                </div>
            </div>
            {/* <!-- MENU BAR --> */}
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-sm-12 col-md-9 d-flex row">
                    <nav className="navbar navbar-expand-sm">
                        <div className="container-fluid m-0 p-0">
                        <Link className="navbar-brand" href="/">HOME</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="collapsibleNavbar">
                            <div className="row w-100">
                                <div className="col-12 col-sm-12 col-md-8">
                                    <ul className="navbar-nav">
                                        {isAdminRoute && (
                                            <>
                                               <li className="nav-item">
                                                    <a className="nav-link" href="/admin/dashboard">Dashboard</a>
                                                </li> 
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/admin/package">Package</a>
                                                </li> 
                                            </>
                                        ) || isHostRoute && (
                                            <>
                                               <li className="nav-item">
                                                    <Link className="nav-link" href="/host/party">Party</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" href="/host/room">Room</Link>
                                                </li> 
                                                <li className="nav-item">
                                                    <Link className="nav-link" href="/host/menu">Menu</Link>
                                                </li> 
                                            </>
                                        ) ||(
                                            <>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#">Store</a>
                                                </li>
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">My account</a>
                                                    <ul className="dropdown-menu">
                                                        <li><Link className="dropdown-item" href="/profile">Profile</Link></li>
                                                        <li><Link className="dropdown-item" href="/orders">Orders</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#">Mỹ phẩm thiên nhiên</a>
                                                </li>  
                                            </>
                                        )}
                                        
                                    </ul>
                                </div>
                                {email && (
                                    <div className="col-12 col-sm-12 col-md-4 d-flex justify-content-end">
                                        <span>Welcome: </span>
                                        <Link href="#" className="text-decoration-underline ms-3">{email}</Link>
                                    </div>
                                )}
                                
                            </div>
                            
                        </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}