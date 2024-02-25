import * as Constant from "@/common/Constant";
import { JsonBody } from "@/types";

export async function ApiCreateRoom(HostUserID: number,RoomName: string, MinPeople: number, MaxPeople: number, Price: number, Type: string[], Description: string, Image: File | null, token: string){
    var data = new FormData();    
    data.append("HostUserID", HostUserID.toString());
    data.append("RoomName", RoomName);
    data.append("MinPeople", MinPeople.toString());
    data.append("MaxPeople", MaxPeople.toString());
    data.append("Price", Price.toString());
    Type.forEach((typeValue, index) => {
        data.append(`Type[${index}]`, typeValue);
    });
    data.append("Description", Description);
    if (Image) {
        data.append("Image", Image);
    }
    const response = await fetch(Constant.API_CREATE_ROOM, {
        method: "POST",
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

export async function ApiGetLatestRoom(page: number,size: number, hostId: number){
    const response = await fetch(Constant.API_GET_LATEST_ROOM + page + "/" + size + "/" + hostId);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

    
