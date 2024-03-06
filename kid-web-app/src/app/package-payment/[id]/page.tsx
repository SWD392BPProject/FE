'use client';
import { BOOKING_STATUS_PAID, STATUS_CODE_OK } from "@/common/Constant";
import { ApiChangeBookingStatus, ApiGetBookingByID, ApiPaymentMomo } from "@/service/BookingService";
import { ApiGetPackageOrderByID } from "@/service/PackageService";
import { Booking, MomoReponse, PackageOrder } from "@/types";
import { FormatVND, GetDateFormat, TimeToString } from "@/util/TextUtil";
import { useRouter } from "next/navigation";
import React from "react";

type Params = {
    params: {
        id: number;
    }
}
export default function Page({ params } : Params){
    const [packageOrder, setPackageOrder] = React.useState<PackageOrder | null>(null);
    const router = useRouter();


    React.useEffect(()=>{
        fetchGetPackageOrderByID(params.id);
    },[]);

    async function fetchGetPackageOrderByID(id: number){
        const result = await ApiGetPackageOrderByID(id);
        if(result && result.code == STATUS_CODE_OK){
            setPackageOrder(result.data);
        }
    }

    const handleClickBuyNow = async () => {
        // if(booking){
        //     const result = await ApiPaymentMomo((booking.paymentAmount / 1000).toString(), booking.partyName, booking.bookingID.toString()) as MomoReponse;
        //     if(result){
        //         router.push(result.payUrl);
        //     }
        // }
    }

    return (
        <div className="row d-flex justify-content-center bg-white">
            <div className="col-12 col-sm-12 col-md-9 my-2">
                <h4 className="fw-bold text-primary text-center mb-3">PAYMENT <span className="text-dark">INFORMATION</span></h4>
                <div className="border-tbl-gray p-3">
                    <b className="me-2">Package Name: </b> {packageOrder?.packageName}
                </div>
                {/* <div className="border-tbl-gray p-3">
                    <b className="me-2">Room Name: </b> {booking?.roomName}
                </div>
                <div className="d-flex">
                    <div className="border-tbl-gray p-3 w-50">
                        <b className="me-2">Booking Date: </b> {GetDateFormat(booking?.bookingDate??'')}
                    </div>
                    <div className="border-tbl-gray-nl p-3 w-50">
                        <b className="me-2">Booking Time: </b> {TimeToString(booking?.slotTimeStart??'')}-{TimeToString(booking?.slotTimeStart??'')}
                    </div>
                </div>
                <div className="d-flex">
                    <div className="border-tbl-gray p-3 w-50">
                        <b className="me-2">Dining Menu: </b> {booking?.menuName}
                    </div>
                    <div className="border-tbl-gray-nl p-3 w-50">
                        <b className="me-2">Dining Tables: </b> {booking?.diningTable}
                    </div>
                </div> */}
                <div className="border-tbl-gray p-3">
                    <b className="me-2 text-primary">PACKAGE DESCRIPTION:</b>
                </div>
                <div className="border-tbl-gray px-3 py-5">
                    {packageOrder?.packageDescription}
                </div>
                
                <div className="d-flex">
                    <div className="border-tbl-gray p-3 w-75">
                        <b className="me-2 text-primary">TOTAL PAYMENT:</b>
                    </div>
                    <div className="border-tbl-gray-nl p-3 w-25">
                        <b className="me-2">{FormatVND(packageOrder?.paymentAmount?.toString()??'0')}</b>
                    </div>
                </div>
                <div className="d-flex justify-content-center my-3">
                    <button className="btn btn-warning" onClick={handleClickBuyNow}>PAY NOW</button>
                </div>
            </div>
        </div>
    );
}