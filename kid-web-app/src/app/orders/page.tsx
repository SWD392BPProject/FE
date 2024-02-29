'use client'
import Image from "next/image";
import { BOOKING_STATUS_CREATE, BOOKING_STATUS_PAID, STATUS_CODE_OK, TABLE_DATA_SIZE, USER_COOKIE } from "@/common/Constant";
import { ApiGetLatestParty } from "@/service/PartyService";
import { Booking, Party, UserInfoCookie } from "@/types";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";
import { FormatVND, GetDateFormat, GetLabelOfPartyType, TimeToString } from "@/util/TextUtil";
import PaginationBar from "@/component/PaginationBar";
import { ApiGetBookingByUserID } from "@/service/BookingService";

export default function Page (){
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const [bookings, setBookings] = React.useState<Booking[] | null>(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);
    React.useEffect(()=>{
        fetchBookingByUserID(1);
    },[]);

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

    const handleChangePage = (num : number) => {
        setCurrentPage(num);
        fetchBookingByUserID(num);
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
                            <th className="w-20">Booking Date</th>
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
                                        <button className="btn btn-primary">View</button>
                                        {booking.status == BOOKING_STATUS_CREATE && (
                                            <Link href={`/payment/${booking.bookingID}`}><button className="btn btn-warning ms-3">Pay now</button></Link>
                                        )}
                                        {/* <Link href={"/admin/video-edit/" + video._id} className="me-3"><BorderColorIcon /></Link>
                                        <DeleteIcon className="cursor-pointer text-danger" onClick={()=>handleDeleteClick(video._id, video.title)}/> */}
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

