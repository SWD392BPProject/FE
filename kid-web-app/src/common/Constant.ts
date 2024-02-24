import { PartyType } from "@/types";

/*
 ** HTTP SERVER
*/
export const URL_BASE_API = "http://localhost:5200";

/*
 ** TABLE DATA
*/
export const TABLE_DATA_SIZE = 5;
export const NUMBER_BUTTON_PAGINATION = 5;

/*
 ** RESPONSE STATUS CODE
*/
export const STATUS_CODE_OK = "01";
export const STATUS_CODE_ERROR = "02";

/*
 ** JWT
*/
export const HEADER_TOKEN = "bearer";

/*
 ** COOKIE INSTANCE
*/
export const USER_COOKIE = "userInfoCookie";

/*
 ** USER API
*/
export const API_REGISTER_USER = URL_BASE_API + "/User/register";
export const API_LOGIN = URL_BASE_API + "/User/login";
/*
 ** PARTY API
*/
export const API_CREATE_PARTY = URL_BASE_API + "/Party";
export const API_GET_LATEST_PARTY = URL_BASE_API + "/Party/";

/*
 ** ROOM API
*/
export const API_CREATE_ROOM = URL_BASE_API + "/Room";

/*
 ** PARTY TYPE
*/
export const PARTY_TYPE_LIST = [
    {
        value: "SINHNHAT",
        label: "Sinh nhật"
    },
    {
        value: "DAMCUOI",
        label: "Đám cưới"
    },
    {
        value: "LIENHOAN",
        label: "Liên hoan"
    },
    {
        value: "TATNIEN",
        label: "Tất niên"
    },
    {
        value: "TANGIA",
        label: "Tân gia"
    },
    {
        value: "KHAC",
        label: "Khác"
    },
] as PartyType[];