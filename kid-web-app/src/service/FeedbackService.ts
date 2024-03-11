import * as Constant from "@/common/Constant";
import { JsonBody } from "@/types";

export async function ApiCreateFeedback(UserID: number, PartyID: number, BookingID: number, Rating: number, Comment: string){
    const data = new URLSearchParams();
    data.append("UserID", UserID.toString());
    data.append("PartyID", PartyID.toString());
    data.append("BookingID", BookingID.toString());
    data.append("Rating", Rating.toString());
    data.append("Comment", Comment);
    const response = await fetch(Constant.API_FEEDBACK_ORIGIN, {
        method: "POST",
        body: data
    });
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiGetFeedbackByUserBookingID(UserID: number, BookingID: number){
    const response = await fetch(Constant.API_GET_FEEDBACK_BY_USER_BOOKING_ID + UserID + "/" + BookingID);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiGetFeedbackByPartyID(PartyID: number){
    const response = await fetch(Constant.API_GET_FEEDBACK_BY_PARTY_ID + PartyID);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
