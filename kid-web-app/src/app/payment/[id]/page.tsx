'use client';
import { BOOKING_STATUS_PAID, STATUS_CODE_OK } from "@/common/Constant";
import { ApiChangeBookingStatus, ApiGetBookingByID, ApiPaymentMomo } from "@/service/BookingService";
import { Booking, MomoReponse } from "@/types";
import { FormatVND, GetDateFormat, TimeToString } from "@/util/TextUtil";
import { useRouter } from "next/navigation";
import React from "react";

type Params = {
    params: {
        id: number;
    }
}
export default function Page({ params } : Params){
    const [booking, setBooking] = React.useState<Booking | null>(null);
    const router = useRouter();


    React.useEffect(()=>{
        fetchBookingByBookingID(params.id);
    },[]);

    async function fetchBookingByBookingID(id: number){
        const result = await ApiGetBookingByID(id);
        if(result && result.code == STATUS_CODE_OK){
            setBooking(result.data);
        }
    }

    const handleClickBuyNow = async () => {
        if(booking){
            const result = await ApiPaymentMomo((booking.paymentAmount / 1000).toString(), booking.partyName, "BOOKING_"+booking.bookingID.toString()) as MomoReponse;
            if(result){
                router.push(result.payUrl);
            }
        }
    }

    return (
        <div className="row d-flex justify-content-center bg-white">
            <div className="col-12 col-sm-12 col-md-9 my-2">
                <h4 className="fw-bold text-primary text-center mb-3">PAYMENT <span className="text-dark">INFORMATION</span></h4>
                <div className="border-tbl-gray p-3">
                    <b className="me-2">Party Name: </b> {booking?.partyName}
                </div>
                <div className="border-tbl-gray p-3">
                    <b className="me-2">Room Name: </b> {booking?.roomName}
                </div>
                <div className="d-flex">
                    <div className="border-tbl-gray p-3 w-50">
                        <b className="me-2">Booking Date: </b> {GetDateFormat(booking?.bookingDate??'')}
                    </div>
                    <div className="border-tbl-gray-nl p-3 w-50">
                        <b className="me-2">Booking Time: </b> {TimeToString(booking?.slotTimeStart??'')}-{TimeToString(booking?.slotTimeEnd??'')}
                    </div>
                </div>
                <div className="d-flex">
                    <div className="border-tbl-gray p-3 w-50">
                        <b className="me-2">Dining Menu: </b> {booking?.menuName}
                    </div>
                    <div className="border-tbl-gray-nl p-3 w-50">
                        <b className="me-2">Dining Tables: </b> {booking?.diningTable}
                    </div>
                </div>
                <div className="border-tbl-gray p-3">
                    <b className="me-2 text-primary">MENU DESCRIPTION:</b>
                </div>
                <div className="border-tbl-gray px-3 py-5">
                    {booking?.menuDescription}
                </div>
                <div className="border-tbl-gray p-3">
                    <b className="me-2 text-primary">PAYMENT:</b>
                </div>
                <div className="d-flex">
                    <div className="border-tbl-gray p-3 w-25">
                        <b className="me-2">ITEM NAME</b>
                    </div>
                    <div className="border-tbl-gray-nl p-3 w-25">
                        <b className="me-2">AMOUNT</b>
                    </div>
                    <div className="border-tbl-gray-nl p-3 w-25">
                        <b className="me-2">UINT PRICE</b>
                    </div>
                    <div className="border-tbl-gray-nl p-3 w-25">
                        <b className="me-2">TOTAL</b>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="border-tbl-gray p-3 w-25">
                        <span className="me-2">{booking?.roomName}</span>
                    </div>
                    <div className="border-tbl-gray-nl p-3 w-25">
                        <span className="me-2">1</span>
                    </div>
                    <div className="border-tbl-gray-nl p-3 w-25">
                        <span className="me-2">{booking?.roomPrice}</span>
                    </div>
                    <div className="border-tbl-gray-nl p-3 w-25">
                        <span className="me-2">{booking?.roomPrice}</span>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="border-tbl-gray p-3 w-25">
                        <span className="me-2">{booking?.menuName}</span>
                    </div>
                    <div className="border-tbl-gray-nl p-3 w-25">
                        <span className="me-2">{booking?.diningTable}</span>
                    </div>
                    <div className="border-tbl-gray-nl p-3 w-25">
                        <span className="me-2">{booking?.menuPrice}</span>
                    </div>
                    <div className="border-tbl-gray-nl p-3 w-25">
                        <span className="me-2">{booking?.diningTable && booking?.menuPrice && (booking.diningTable * booking.menuPrice) }</span>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="border-tbl-gray p-3 w-75">
                        <b className="me-2 text-primary">TOTAL PAYMENT:</b>
                    </div>
                    <div className="border-tbl-gray-nl p-3 w-25">
                        <b className="me-2">{FormatVND(booking?.paymentAmount?.toString()??'0')}</b>
                    </div>
                </div>
                <div className="d-flex justify-content-center my-3">
                    <button className="btn btn-warning" onClick={handleClickBuyNow}>PAY NOW</button>
                </div>
            </div>
        </div>
    );
}