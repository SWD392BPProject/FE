import * as Constant from "@/common/Constant";
import { JsonBody, MomoReponse } from "@/types";
import crypto from 'crypto'; 

export async function ApiCreateBooking(
        UserID: number,
        RoomID: number,
        PartyID: number,
        SlotBooking: number, 
        MenuBooking: number, 
        DiningTable: number, 
        BookingDate: string, 
    ){
    var data = new FormData();    
    data.append("UserID", UserID.toString());
    data.append("RoomID", RoomID.toString());
    data.append("PartyID", PartyID.toString());
    data.append("SlotBooking", SlotBooking.toString());
    data.append("MenuBooking", MenuBooking.toString());
    data.append("DiningTable", DiningTable.toString());
    data.append("BookingDate", BookingDate);
    const response = await fetch(Constant.API_CREATE_BOOKING, {
        method: "POST",
        body: data,
    });
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null
}

export async function ApiGetBookingByID(bookingID: number){
    const response = await fetch(Constant.API_GET_BOOKING_BY_ID + bookingID);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiGetBookingByUserID(page:number, size:number ,userID: number){
    const response = await fetch(Constant.API_GET_BOOKING_BY_USER_ID + userID + "/" + page + "/" + size);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiChangeBookingStatus(bookingID: string, status: string){
    const response = await fetch(Constant.API_CHANGE_STATUS_BOOKING + bookingID + "/" + status);
    if(response.ok){ 
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiPaymentMomo(amount: string, title: string, orderId: string){
    try {
        const response = await fetch('/api/momo-payment', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount,
                title,
                orderId
            // Thêm các thông tin cần thiết cho yêu cầu API của bạn
            }),
        });
        const data = await response.json();
        return data as MomoReponse;
    } catch (error) {
        console.error('Error calling API:', error);
    }
    return null;
}