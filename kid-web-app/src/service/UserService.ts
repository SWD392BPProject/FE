import * as Constant from "@/common/Constant";
import { JsonBody } from "@/types";

export async function ApiRegisterUser(FullName: string, Email: string, Password: string, PhoneNumber: string, Role: string, Image: File | null){
    var data = new FormData();    
    data.append("FullName", FullName);
    data.append("Email", Email);
    data.append("Password", Password);
    data.append("PhoneNumber", PhoneNumber);
    data.append("Role", Role);
    if (Image) {
        data.append("Image", Image);
    }
    const response = await fetch(Constant.API_REGISTER_USER, {
        method: "POST",
        body: data,
    });
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null
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
