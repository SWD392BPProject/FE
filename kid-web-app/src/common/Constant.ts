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
export const TABLE_ROOM_BOOKING_SIZE = 2;
export const TABLE_DATA_SIZE = 5;
export const NUMBER_BUTTON_PAGINATION = 5;

/*
 ** RESPONSE STATUS CODE
*/
export const STATUS_CODE_OK = "01";
export const STATUS_CODE_ERROR = "02";
export const STATUS_ACTIVE = "Active";
export const STATUS_INACTIVE = "Inactive";

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
export const API_GET_USER_BY_ROLE = URL_BASE_API + "/User/byRole/";
export const API_CHANGE_STATUS_USER = URL_BASE_API + "/User/changeStatus/";
export const API_CHANGE_PASSWORD = URL_BASE_API + "/User/changePW";
export const API_USER_UPDATE_INFO = URL_BASE_API + "/User/updateInfo";
export const API_USER_ORIGIN = URL_BASE_API + "/User/";
export const API_REGISTER_USER = URL_BASE_API + "/User/register";
export const API_LOGIN = URL_BASE_API + "/User/login";
export const API_LOGIN_WITH_GOOLE = URL_BASE_API + "/User/loginWithGoogle";
export const API_SEARCH_USER = URL_BASE_API + "/User/searchUser";
export const API_GET_TOP_HOST = URL_BASE_API + "/User/topHostParty/";

/*
 ** MENU API
*/
export const API_MENU_ORIGIN = URL_BASE_API + "/Menu/";
export const API_CREATE_MENU = URL_BASE_API + "/Menu";
export const API_GET_MENU_BY_PARTY_ID = URL_BASE_API + "/Menu/byPartyId/";
export const API_GET_MENU_BY_ID = URL_BASE_API + "/Menu/";
export const API_GET_MENU_BY_HOST_ID = URL_BASE_API + "/Menu/byHostId/";
export const API_GET_MENU_BY_HOST_ID_PAGING = URL_BASE_API + "/Menu/byHostIdPaging/";

/*
 ** PARTY API
*/
export const API_PARTY_ORIGIN = URL_BASE_API + "/Party/";
export const API_CREATE_PARTY = URL_BASE_API + "/Party";
export const API_GET_LATEST_PARTY = URL_BASE_API + "/Party/";
export const API_GET_TOP_MONTH_PARTY = URL_BASE_API + "/Party/TopMonth/";
export const API_GET_PARTY_BY_ID = URL_BASE_API + "/Party/";
export const API_GET_PARTY_BY_ID_IN_HOST = URL_BASE_API + "/Party/host/";
export const API_GET_SEARCH_PARTY = URL_BASE_API + "/Party/searchBooking/";
export const API_GET_SEARCH_NAME_PARTY = URL_BASE_API + "/Party/searchName";
export const API_UPDATE_VIEWED = URL_BASE_API + "/Party/updateViewed/";

/*
 ** FEEDBACK API
*/
export const API_FEEDBACK_ORIGIN = URL_BASE_API + "/Feedback/";
export const API_GET_FEEDBACK_BY_PARTY_ID = URL_BASE_API + "/Feedback/byPartyId/";
export const API_GET_FEEDBACK_BY_USER_BOOKING_ID = URL_BASE_API + "/Feedback/byUserIDAndBooking/";

/*
 ** SCHEDULE API
*/
export const API_GET_SCHEDULE_BY_HOST_ID = URL_BASE_API + "/Schedule/byHostID/";

/*
 ** SLOT API
*/
export const API_GET_SLOT_BY_ROOM_ID = URL_BASE_API + "/Slot/byRoomID/";
export const API_GET_SLOT_BOOKING_BY_ROOM_ID = URL_BASE_API + "/Slot/bookingByRoomID";

/*
 ** ROOM API
*/
export const API_ROOM_ORIGIN = URL_BASE_API + "/Room/";
export const API_CREATE_ROOM = URL_BASE_API + "/Room";
export const API_GET_LATEST_ROOM = URL_BASE_API + "/Room/";
export const API_GET_ROOM_BY_ID = URL_BASE_API + "/Room/";
export const API_GET_ROOM_FOR_RENT = URL_BASE_API + "/Room/RoomForRent/";


/*
 ** PACKAGE API
*/
export const API_PACKAGE_ORIGIN = URL_BASE_API + "/Package/";
export const API_CHECK_BUY_PACKAGE = URL_BASE_API + "/Package/checkPackage/";
export const API_GET_PACKAGE_ORDER_BY_ID = URL_BASE_API + "/Package/orderId/";
export const API_CREATE_PACKAGE = URL_BASE_API + "/Package";
export const API_GET_LATEST_PACKAGE = URL_BASE_API + "/Package/";
export const API_CREATE_PACKAGE_ORDER = URL_BASE_API + "/Package/createOrder";
export const API_CHANGE_STATUS_PACKAGE_ORDER = URL_BASE_API + "/Package/changeStatus/";
export const API_GET_PACKAGE_ORDER_BY_USER_ID = URL_BASE_API + "/Package/ordersByUserID/";
export const API_GET_PACKAGE_ORDER_BY_PAGING = URL_BASE_API + "/Package/packageOrder/";


/*
 ** BOOKING API
*/
export const API_CREATE_BOOKING = URL_BASE_API + "/Booking";
export const API_GET_BOOKING_BY_ID = URL_BASE_API + "/Booking/";
export const API_GET_BOOKING_BY_USER_ID = URL_BASE_API + "/Booking/byUserID/";
export const API_CHANGE_STATUS_BOOKING = URL_BASE_API + "/Booking/changeStatus/";
export const API_GET_BOOKING_BY_BOOKING_DATE = URL_BASE_API + "/Booking/byBookingDate/";

/*
 ** VOUCHER API
*/
export const API_GET_VOUCHER_BY_USER_ID = URL_BASE_API + "/Voucher/byUserID/";
export const API_ADD_VOUCHER_TO_PACKAGE_ORDER = URL_BASE_API + "/Voucher/addVoucher";

/*
 ** STATISTIC API
*/
export const API_GET_LAST_4_MONTH_REVENUE = URL_BASE_API + "/Statistic/last4Month";

export const DESCRIPTION_SHORT_LENGTH = 200;
export const TITLE_SHORT_LENGTH = 38;

/*
 ** BOOKING STATUS
*/
export const BOOKING_STATUS_CREATE = "Create";
export const BOOKING_STATUS_PAID = "Paid";
export const BOOKING_STATUS_DONE = "Done";
export const BOOKING_STATUS_CANCEL = "Cancel";

/*
 ** ROLE LIST
*/
export const ROLE_HOST = "Host";
export const ROLE_ADMIN = "Admin";
export const ROLE_USER = "User";

/*
 ** PACKAGE TYPE LIST
*/
export const PACKAGE_TYPE_LIST = [
    {
        value: 30,
        label: "1 Month"
    },
    {
        value: 90,
        label: "3 Months"
    },
    {
        value: 365,
        label: "1 Year"
    },
    {
        value: 730,
        label: "2 Years"
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