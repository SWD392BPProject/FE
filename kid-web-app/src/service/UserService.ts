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
    
export async function ApiUpdateUserByID(Email: string, FullName: string, PhoneNumber: string, Image: File | null, UserID: string, newPassword: string){
    const data = new FormData();
    data.append("Email", Email);
    data.append("FullName", FullName);
    data.append("PhoneNumber", PhoneNumber);
    data.append("UserID", UserID);
    if (Image) {
        data.append("Image", Image);
    }
    if (newPassword){
        data.append("NewPassword", newPassword);
    }
    const response = await fetch(Constant.API_USER_UPDATE_INFO,{
        method: "PUT",
        body: data
    });
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiGetUserByID(id: string){
    const response = await fetch(Constant.API_USER_ORIGIN + id);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
export async function ApiGetUserByRole(role: string, page: number, size: number){
    const response = await fetch(Constant.API_GET_USER_BY_ROLE + role + "/" + page + "/" + size);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiChangeUserStatus(userId: string, status: string){
    const response = await fetch(Constant.API_CHANGE_STATUS_USER + userId + "/" + status);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiGetTopHostUser(size: number){
    const response = await fetch(Constant.API_GET_TOP_HOST + size);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}


export async function ApiChangePW(OldPassword: string, NewPassword: string, UserID: string){
    var data = new URLSearchParams();
    data.append("OldPassword", OldPassword);
    data.append("NewPassword", NewPassword);
    data.append("UserID", UserID);
    const response = await fetch(Constant.API_CHANGE_PASSWORD, {
        method: "PUT",
        body: data,
    });
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

export async function ApiSearchUser(Keyword: string, Role: string, Page: number, Size: number){
    var data = new URLSearchParams();
    data.append("Keyword", Keyword);
    data.append("Role", Role);
    data.append("Page", Page.toString());
    data.append("Size", Size.toString());
    const response = await fetch(Constant.API_SEARCH_USER, {
        method: "POST",
        body: data,
    });
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}


export async function ApiLoginWithGoogle(Email: string, FullName: string){
    var data = new URLSearchParams();
    data.append("Email", Email);
    data.append("FullName", FullName);
    const response = await fetch(Constant.API_LOGIN_WITH_GOOLE, {
        method: "POST",
        body: data,
    });
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
