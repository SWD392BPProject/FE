import * as Constant from "@/common/Constant";
import { JsonBody } from "@/types";

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


