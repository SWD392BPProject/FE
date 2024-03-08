export interface JsonBody {
    code: string,
    message: string,
    data: any,
    totalItem: number,
    totalPage: number,
}

export interface User {
    userID: number,
    fullName: string,
    phoneNumber: string,
    email: string,
    image: string,
    password: string,
    role: string,
    status: string,
    token: string,
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

export interface Menu {
    menuID: number,
    menuName: string,
    price: number,
    description: string,
    image: string,
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

export interface Booking {
    bookingID: number,
    partyName: string,
    roomName: string,
    roomPrice: number,
    menuName: number,
    menuPrice: number,
    menuDescription: string,
    diningTable: number,
    slotTimeStart: string,
    slotTimeEnd: string,
    bookingDate: string,
    status: string,
    paymentAmount: number,
}

export interface PackageOrder{
    packageOrderID: number,
    voucherID: number,
    voucherCode: string,
    voucherPrice: string,
    packageName: string,
    packageDescription: string,
    packagePrice: number,
    activeDays: number,
    paymentAmount: number,
    status: string,
    createDate: string,
}

export interface Feedback{
    feedbackID: number,
    userID: number,
    bookingID: number,
    rating: number,
    comment: string,
}

export interface Schedule{
    dateOfMonth: string,
    day: string,
    dayOfWeek: string,
    amountParty: number,
    isToday: boolean,
}

export interface MomoReponse {
    amount : number,
    deeplink : string,
    message : string,
    orderId : string,
    partnerCode : string,
    payUrl : string,
    qrCodeUrl : string,
    requestId : string,
    responseTime : number,
    resultCode : number,
}

export interface Slot {
    slotID: number,
    startTime: string,
    endTime: string,
    used: boolean,
    roomID: number,
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

export type Voucher = {
    voucherID: number,
    voucherCode: string,
    packageName: string,
    discountAmount: number,
    discountPercent: number,
    expiryDate: string,
    discountMax: number,
}

