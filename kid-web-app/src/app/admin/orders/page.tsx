'use client'
import Image from "next/image";
import { ROLE_HOST, ROLE_USER, STATUS_ACTIVE, STATUS_CODE_OK, STATUS_INACTIVE, TABLE_DATA_SIZE, USER_COOKIE } from "@/common/Constant";
import { ApiGetLatestParty } from "@/service/PartyService";
import { Package, PackageOrder, Party, Room, User, UserInfoCookie } from "@/types";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";
import { FormatVND, GetDateFormat, GetLabelOfPackageType, GetLabelOfPartyType } from "@/util/TextUtil";
import PaginationBar from "@/component/PaginationBar";
import { ApiGetLatestRoom } from "@/service/RoomService";
import { ApiDeletePackageByID, ApiGetLatestPackage, ApiGetPackageOrderPaging } from "@/service/PackageService";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { ApiChangeUserStatus, ApiGetUserByRole, ApiSearchUser } from "@/service/UserService";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';

export default function Page (){
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);
    const [packageOrders, setPackageOrders] = React.useState<PackageOrder[] | null>(null);

    React.useEffect(()=>{
        fetchOrderPackagePaging(1);
    },[]);

    async function fetchOrderPackagePaging(page: number){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiGetPackageOrderPaging(page, TABLE_DATA_SIZE);
            if(result && result.code == STATUS_CODE_OK){
                setPackageOrders(result.data);
                const totalPage = result.totalPage ?? 1;
                setTotalPage(totalPage);
                window.scrollTo(0, 0);
            }
        }
    }

    const handleChangePage = (num : number) => {
        setCurrentPage(num);
        fetchOrderPackagePaging(num);
    }


    return(
        <div className="row d-flex justify-content-center bg-graylight">
            <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
                <h1 className="fw-bold text-primary">ORDER <span className="text-dark">MANAGEMENT</span></h1>
                
                {/* <!-- TABLE --> */}
                <div className="row p-0 m-0 my-3">
                    <div className="col-12 col-sm-12 col-md-12 p-0 m-0">
                    <table className="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th className="w-20">Package Name</th>
                            <th className="w-20">FullName</th>
                            <th className="w-10">Package price</th>
                            <th className="w-10">Discount</th>
                            <th className="w-20">Payment Amount</th>
                            <th className="w-20">Create Date</th>
                        </tr>
                        </thead>
                        <tbody>
                            { packageOrders && packageOrders.length > 0 && packageOrders.map((row, index)=>(
                                <tr key={index} className={row.status == STATUS_INACTIVE && `s-text` || ''}>
                                    <td>{row.packageName}</td>
                                    <td>{row.fullName}</td>
                                    <td>{FormatVND(row.packagePrice.toString())}</td>
                                    <td>{row.voucherPrice?FormatVND(row.voucherPrice.toString()):''}</td>
                                    <td>{FormatVND(row.paymentAmount.toString())}</td>
                                    <td>{GetDateFormat(row.createDate)}</td>
                                    
                                </tr>
                            )) || (
                                <tr>
                                    <td colSpan={5}>Data is empty</td>
                                </tr>
                            )}
                        
                        </tbody>
                    </table>
                    {/* PAGINATION BAR */}
                    {totalPage != 0 && (
                        <PaginationBar totalPage={totalPage} currentPage={currentPage} handleChangePage={handleChangePage} />
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface SearchFormValues {
    Keyword: string;
    Role: string;
}