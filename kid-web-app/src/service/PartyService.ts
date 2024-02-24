import * as Constant from "@/common/Constant";
import { JsonBody } from "@/types";

export async function ApiCreateParty(HostUserId: number,PartyName: string, Address: string, Type: string, Description: string, Image: File | null, token: string){
    var data = new FormData();    
    data.append("HostUserId", HostUserId.toString());
    data.append("PartyName", PartyName);
    data.append("Address", Address);
    data.append("Type", Type);
    data.append("Description", Description);
    if (Image) {
        data.append("Image", Image);
    }
    const response = await fetch(Constant.API_CREATE_PARTY, {
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
    
export async function ApiGetLatestParty(page: number,size: number, hostId: number){
    const response = await fetch(Constant.API_GET_LATEST_PARTY + page + "/" + size + "/" + hostId);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiLoginUser(Email: string, Password: string){
    var data = new URLSearchParams();
    data.append("Email", Email);
    data.append("Password", Password);
    const response = await fetch(Constant.API_LOGIN, {
        method: "POST",
        body: data,
    });
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
