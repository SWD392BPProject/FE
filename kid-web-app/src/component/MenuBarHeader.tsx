'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
export default function MenuBarHeader(){

    React.useEffect(()=>{
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

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
                        <Link href={"/register"}><span className="text-primary cursor-pointer">Đăng ký |</span></Link>
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
                            <ul className="navbar-nav">
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
                            <li className="nav-item">
                                <a className="nav-link" href="#">Thể thao</a>
                            </li>  
                            <li className="nav-item">
                                <a className="nav-link" href="#">Cẩm nang sức khỏe</a>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}