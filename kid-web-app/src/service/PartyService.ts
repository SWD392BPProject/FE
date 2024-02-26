import * as Constant from "@/common/Constant";
import { JsonBody } from "@/types";

export async function ApiCreateParty(HostUserId: number,PartyName: string, Address: string, Type: string, Description: string, listMenu: string[], Image: File | null, token: string){
    var data = new FormData();    
    data.append("HostUserId", HostUserId.toString());
    data.append("PartyName", PartyName);
    data.append("Address", Address);
    data.append("Type", Type);
    data.append("Description", Description);
    if (Image) {
        data.append("Image", Image);
    }
    listMenu.forEach((value, index) => {
        data.append(`MenuList[${index}]`, value);
    });
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
    
export async function ApiGetLatestParty(page: number,size: number, hostId?: number){
    var plusString = ""
    if(hostId){
        plusString = "/" + hostId;
    }
    const response = await fetch(Constant.API_GET_LATEST_PARTY + page + "/" + size + plusString);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiGetTopMonthParty(page: number,size: number){
    const response = await fetch(Constant.API_GET_TOP_MONTH_PARTY + page + "/" + size);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiGetPartyById(id: number){
    const response = await fetch(Constant.API_GET_PARTY_BY_ID + id);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiGetPartiesSearch(Type: string, DateBooking: string, SlotTime :string, People: number, page: number, size: number){
    const data = new URLSearchParams();
    data.append("Type", Type);
    data.append("DateBooking", DateBooking);
    data.append("SlotTime", SlotTime);
    data.append("People", People.toString());
    const response = await fetch(Constant.API_GET_SEARCH_PARTY + page + "/" + size,{
        method: "POST",
        body: data
    });
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}


