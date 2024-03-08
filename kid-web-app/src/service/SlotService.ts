import * as Constant from "@/common/Constant";
import { JsonBody } from "@/types";

export async function ApiGetSlotByRoomID(roomId: number){
    const response = await fetch(Constant.API_GET_SLOT_BY_ROOM_ID + roomId);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiGetSlotBookingByRoomID(RoomID: number, DateBooking: string){
    const data = new URLSearchParams();
    data.append("RoomID", RoomID.toString());
    data.append("DateBooking", DateBooking);
    const response = await fetch(Constant.API_GET_SLOT_BOOKING_BY_ROOM_ID, {
        method: "POST",
        body: data
    });
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}