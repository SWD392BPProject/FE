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
import { ApiChangeBookingStatus, ApiGetBookingByUserID } from "@/service/BookingService";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ErrorIcon from '@mui/icons-material/Error';
export default function Page (){
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const orderId = searchParams.get('orderId');
    const resultCode = searchParams.get('resultCode');
    const url = `${pathname}?${searchParams}`

    
    React.useEffect(() => {
        const redirectAfterSeconds = (seconds:number) => {
            setTimeout(() => {
                router.push("/orders");
            }, seconds * 1000);
        };

        redirectAfterSeconds(3);
    }, [router]);

    async function fetchChagneStatusBooking(orderId: string){
        var split = orderId.split("_");
        var id = split[0];
        const result = await ApiChangeBookingStatus(id, BOOKING_STATUS_PAID);
        if(result && result.code == STATUS_CODE_OK){
            alert("Payment successfully!");
        }
        else{
            alert("Payment failed!");
        }
    }
    

    return(
        <div className="row d-flex justify-content-center bg-graylight">
            <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
                <div className="d-flex justify-content-center">
                    {resultCode &&  resultCode == "0" && (
                        <div>
                            <div className="d-flex align-items-center">
                                <CheckCircleIcon className="text-success me-2" style={{fontSize:48}} />
                                <h1 className="text-success text-center">PAYMENT <span className="text-dark">SUCCESSFULLY</span></h1>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Image alt={""} src="/img/LOADING.gif" width={150} height={120} className="text-center"/>
                            </div>
                            <p className="text-center">Automatically redirect pages after a few seconds...</p>
                        </div>
                    ) || (
                        <div>
                            <div className="d-flex align-items-center">
                                <ErrorIcon className="text-warning me-2" style={{fontSize:48}} />
                                <h1 className="text-warning text-center">PAYMENT <span className="text-dark">FAILED</span></h1>
                            </div>
                            <p className="text-center">Some issue occurs when paying</p>
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
    );
}

function useRouterQuery() {
    throw new Error("Function not implemented.");
}

