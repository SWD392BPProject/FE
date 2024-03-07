'use client'
import Image from "next/image";
import { BOOKING_STATUS_CREATE, BOOKING_STATUS_PAID, ROLE_ADMIN, ROLE_HOST, ROLE_USER, STATUS_CODE_OK, TABLE_DATA_SIZE, USER_COOKIE } from "@/common/Constant";
import { ApiGetLatestParty } from "@/service/PartyService";
import { Booking, PackageOrder, Party, UserInfoCookie } from "@/types";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";
import { FormatVND, GetDateFormat, GetLabelOfPartyType, TimeToString } from "@/util/TextUtil";
import PaginationBar from "@/component/PaginationBar";
import { ApiGetBookingByUserID } from "@/service/BookingService";
import { ApiGetPackageOrderByUserID } from "@/service/PackageService";

export default function Page (){
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const [bookings, setBookings] = React.useState<Booking[] | null>(null);
    const [packageOrders, setPackageOrders] = React.useState<PackageOrder[] | null>(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);
    const [isHost, setIsHost] = React.useState(false);
    React.useEffect(()=>{
        CheckRole();
    },[]);

    function CheckRole(){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            if(userInfoCookie.role == ROLE_HOST){
                setIsHost(true);
                fetchPackageOrderByUserID(1);
            } else if(userInfoCookie.role == ROLE_USER){
                setIsHost(false);
                fetchBookingByUserID(1);
            }
        }
    }

    async function fetchBookingByUserID(page: number){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiGetBookingByUserID(page, TABLE_DATA_SIZE,userInfoCookie.userID);
            if(result && result.code == STATUS_CODE_OK){
                setBookings(result.data);
                const totalPage = result.totalPage ?? 1;
                setTotalPage(totalPage);
                window.scrollTo(0, 0);
            }
        }
    }

    async function fetchPackageOrderByUserID(page: number){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiGetPackageOrderByUserID(page, TABLE_DATA_SIZE,userInfoCookie.userID);
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
        if(isHost){
            fetchPackageOrderByUserID(num);
        }else{
            fetchBookingByUserID(num);
        }
    }

    return(
        <div className="row d-flex justify-content-center bg-graylight">
            <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
                <h1 className="fw-bold text-primary">MY <span className="text-dark">ORDERS</span></h1>
                {/* <!-- TABLE --> */}
                <div className="row p-0 m-0 my-3">
                    <div className="col-12 col-sm-12 col-md-12 p-0 m-0">
                    <table className="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th className="w-20">Name</th>
                            <th className="w-20">Create Date</th>
                            <th className="w-20">Payment Amount</th>
                            <th className="w-20">Status</th>
                            <th className="w-20">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            { bookings && bookings.map((booking, index)=>(
                                <tr key={index}>
                                    <td>{booking.partyName}</td>
                                    <td>
                                        {GetDateFormat(booking.bookingDate)} ({TimeToString(booking.slotTimeStart)} - {TimeToString(booking.slotTimeEnd)})
                                    </td>
                                    <td>{FormatVND(booking.paymentAmount.toString())}</td>
                                    <td>
                                        {booking.status == BOOKING_STATUS_PAID && (
                                            <span className="text-success">{booking.status}</span>
                                        ) || (
                                            <span className="text-dark">{booking.status}</span>
                                        )}
                                    </td>
                                    <td>
                                        {/* <button className="btn btn-primary">View</button> */}
                                        {booking.status == BOOKING_STATUS_CREATE && (
                                            <Link href={`/payment/${booking.bookingID}`}><button className="btn btn-warning ms-3">Pay now</button></Link>
                                        )}
                                        {/* <Link href={"/admin/video-edit/" + video._id} className="me-3"><BorderColorIcon /></Link>
                                        <DeleteIcon className="cursor-pointer text-danger" onClick={()=>handleDeleteClick(video._id, video.title)}/> */}
                                    </td>
                                </tr>
                            )) || packageOrders && packageOrders.map((packageOrder, index)=>(
                                <tr key={index}>
                                    <td>{packageOrder.packageName}</td>
                                    <td>
                                        {GetDateFormat(packageOrder.createDate)}
                                    </td>
                                    <td>{FormatVND(packageOrder.paymentAmount.toString())}</td>
                                    <td>
                                        {packageOrder.status == BOOKING_STATUS_PAID && (
                                            <span className="text-success">{packageOrder.status}</span>
                                        ) || (
                                            <span className="text-dark">{packageOrder.status}</span>
                                        )}
                                    </td>
                                    <td>
                                        {/* <button className="btn btn-primary">View</button> */}
                                        {packageOrder.status == BOOKING_STATUS_CREATE && (
                                            <Link href={`/package-payment/${packageOrder.packageOrderID}`}><button className="btn btn-warning ms-3">Pay now</button></Link>
                                        )}
                                    </td>
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

