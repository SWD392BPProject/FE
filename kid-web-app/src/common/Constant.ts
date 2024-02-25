import { PartyType } from "@/types";

/*
 ** HTTP SERVER
*/
export const URL_BASE_API = "http://localhost:5200";

/*
 ** HTTP SERVER
*/
export const PUBLIC_IMAGE_UPLOAD = "/ImageUpload/";

/*
 ** TABLE DATA
*/
export const TABLE_DATA_SIZE = 2;
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
export const API_GET_TOP_MONTH_PARTY = URL_BASE_API + "/Party/TopMonth/";
export const API_GET_PARTY_BY_ID = URL_BASE_API + "/Party/";
export const API_GET_SEARCH_PARTY = URL_BASE_API + "/Party/SearchBooking/";

/*
 ** ROOM API
*/
export const API_CREATE_ROOM = URL_BASE_API + "/Room";
export const API_GET_LATEST_ROOM = URL_BASE_API + "/Room/";

/*
 ** ROOM API
*/
export const API_CREATE_PACKAGE = URL_BASE_API + "/Package";
export const API_GET_LATEST_PACKAGE = URL_BASE_API + "/Package/";

/*
 ** ROOM API
*/
export const DESCRIPTION_SHORT_LENGTH = 200;
export const TITLE_SHORT_LENGTH = 38;

/*
 ** PACKAGE TYPE LIST
*/
export const PACKAGE_TYPE_LIST = [
    {
        value: 30,
        label: "1 tháng"
    },
    {
        value: 90,
        label: "3 tháng"
    },
    {
        value: 365,
        label: "1 năm"
    },
    {
        value: 730,
        label: "2 năm"
    },
];
/*
 ** PARTY TYPE
*/
export const PARTY_TYPE_LIST = [
    {
        value: "SINHNHAT",
        label: "Sinh nhật"
    },
    {
        value: "HOPMAT",
        label: "Họp mặt"
    },
    {
        value: "LIENHOAN",
        label: "Liên hoan"
    },
    {
        value: "NGOAITROI",
        label: "Ngoài trời"
    },
    {
        value: "KHUVUICHOI",
        label: "Khu vui chơi"
    },
    {
        value: "KHAC",
        label: "Khác"
    },
] as PartyType[];