export interface JsonBody {
    code: string,
    message: string,
    data: any,
    totalItem: number,
    totalPage: number,
}

export interface User {
    UserID: number,
    FullName: string,
    Email: string,
    Password: string,
    Role: string,
    Status: string,
    Token: string,
}

export interface Party {
    partyID: number,
    monthViewed: number,
    partyName: string,
    address: string,
    type: string,
    description: string,
    createDate: string,
    image: string,
    hostUserID: number,
}

export interface Room {
    roomID: number,
    roomName: string,
    minPeople: number,
    maxPeople: number,
    price: number,
    type: string,
    description: string,
    image: string,
    hostUserId: number,
}

export interface Package {
    packageID: number,
    packageName: string,
    price: number,
    activeDays: number,
    description: string,
    status: string,
    image: string,
    adminUserId: number,
}

export interface UserInfoCookie{
    userID: number;
    email: string;
    token: string;
    role: string;
}

export interface PartyType{
    label: string;
    value: string;
}

export interface ButtonPagination {
    page: number;
    isActive: boolean;
}

export type Option = {
    value: string,
    label: string
}