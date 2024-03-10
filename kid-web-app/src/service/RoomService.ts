import * as Constant from "@/common/Constant";
import { JsonBody } from "@/types";

export async function ApiCreateRoom(
        HostUserID: number,
        RoomName: string, 
        MinPeople: number, 
        MaxPeople: number, 
        Price: number, 
        Type: string[], 
        Description: string, 
        SlotStart1: string, 
        SlotStart2: string, 
        SlotStart3: string, 
        SlotStart4: string, 
        SlotEnd1: string, 
        SlotEnd2: string, 
        SlotEnd3: string, 
        SlotEnd4: string, 
        Image: File | null, 
        token: string,
        RoomID?: string,
    ){
    var data = new FormData();    
    data.append("HostUserID", HostUserID.toString());
    data.append("RoomName", RoomName);
    data.append("MinPeople", MinPeople.toString());
    data.append("MaxPeople", MaxPeople.toString());
    data.append("Price", Price.toString());
    data.append("SlotStart1", SlotStart1);
    data.append("SlotStart2", SlotStart2);
    data.append("SlotStart3", SlotStart3);
    data.append("SlotStart4", SlotStart4);
    data.append("SlotEnd1", SlotEnd1);
    data.append("SlotEnd2", SlotEnd2);
    data.append("SlotEnd3", SlotEnd3);
    data.append("SlotEnd4", SlotEnd4);
    if(RoomID){
        data.append("RoomID", RoomID);
    }
    Type.forEach((typeValue, index) => {
        data.append(`Type[${index}]`, typeValue);
    });
    data.append("Description", Description);
    if (Image) {
        data.append("Image", Image);
    }
    const response = await fetch(Constant.API_CREATE_ROOM, {
        method: RoomID?"PUT":"POST",
        body: data,
        headers: {
            [Constant.HEADER_TOKEN] : token
        }
    });
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null
}
export async function ApiDeleteRoomByID(id: string){
    const response = await fetch(Constant.API_ROOM_ORIGIN + id, {
        method:"DELETE"
    });
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
export async function ApiGetLatestRoom(page: number,size: number, hostId: number){
    const response = await fetch(Constant.API_GET_LATEST_ROOM + page + "/" + size + "/" + hostId);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
export async function ApiGetRoomById(id: number){
    const response = await fetch(Constant.API_GET_ROOM_BY_ID + id);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
    
export async function ApiGetRoomForRent(Type: string, DateBooking: string, SlotTime :string, People: string, page: number, size: number, partyId: number){
    const data = new URLSearchParams();
    data.append("Type", Type);
    data.append("DateBooking", DateBooking);
    data.append("SlotTime", SlotTime);
    if(People){
        data.append("People", People.toString());
    }
    const response = await fetch(Constant.API_GET_ROOM_FOR_RENT + page + "/" + size + "/" + partyId,{
        method: "POST",
        body: data
    });
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
