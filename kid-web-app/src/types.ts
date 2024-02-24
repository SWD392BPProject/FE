export interface JsonBody {
    code: string,
    message: string,
    data: any,
    totalItem: number,
    totalPage: number,
}

export interface User {
    UserID: string,
    FullName: string,
    Email: string,
    Password: string,
    Role: string,
    Status: string,
    Token: string,
}

export interface UserInfoCookie{
    userID: string;
    email: string;
    token: string;
    role: string;
}