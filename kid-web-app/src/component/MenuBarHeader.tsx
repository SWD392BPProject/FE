'use client'
import { USER_COOKIE } from "@/common/Constant";
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
    },[cookieUser]);

    return(
        <div className="bg-white">
            {/* // <!-- TOP HEADER --> */}
            <div className="row d-flex justify-content-center bg-danger">
                <div className="col-12 col-sm-12 col-md-9 d-flex my-2">
                    <span className="text-white">Over 350 of World's Best Natural Products | Vitamin 100% chính hãng.</span>
                    <div className="flex-grow-1"></div>
                    <span className="text-white cursor-pointer">Đăng ký nhận khuyến mãi</span>
                </div>
            </div>
            {/* // <!-- LOGO BAR --> */}
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-sm-12 col-md-9 d-flex my-2 row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-3">
                        <Image alt={""} src="/img/LOGO.png" width={250} height={80} />
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                        <div className="form-group d-flex align-items-center h-100 w-100">
                            <input className="form-control" placeholder="Tìm kiếm" />
                            <button className="btn btn-danger">Seach</button>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-3 d-flex align-items-center">
                        <Link href={"/login"}><span className="text-primary cursor-pointer">{isLogged?"Đăng xuất":"Đăng nhập"} |</span></Link>
                        <span className="ms-2 text-danger cursor-pointer">Giỏ hàng</span>
                    </div>
                </div>
            </div>
            {/* <!-- MENU BAR --> */}
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-sm-12 col-md-9 d-flex row">
                    <nav className="navbar navbar-expand-sm">
                        <div className="container-fluid m-0 p-0">
                        <a className="navbar-brand" href="#">Trang chủ</a>
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
                                                    <a className="nav-link" href="#">Dashboard</a>
                                                </li> 
                                            </>
                                        ) || isHostRoute && (
                                            <>
                                               <li className="nav-item">
                                                    <a className="nav-link" href="#">Party</a>
                                                </li> 
                                            </>
                                        ) ||(
                                            <>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#">Thương hiệu</a>
                                                </li>
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">TP Dinh dưỡng</a>
                                                    <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Vitamin</a></li>
                                                    <li><a className="dropdown-item" href="#">Khoáng chất</a></li>
                                                    <li><a className="dropdown-item" href="#">Thảo dược</a></li>
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