'use client'
import Image from "next/image";
import { BOOKING_STATUS_CANCEL, BOOKING_STATUS_CREATE, BOOKING_STATUS_DONE, BOOKING_STATUS_PAID, STATUS_CODE_OK, TABLE_DATA_SIZE, USER_COOKIE } from "@/common/Constant";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";
import { ApiGetScheduleByHostID } from "@/service/ScheduleService";
import { Booking, Schedule, UserInfoCookie } from "@/types";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { ApiChangeBookingStatus, ApiGetBookingByDate } from "@/service/BookingService";
import { FormatVND, GetDateFormat, TimeToString } from "@/util/TextUtil";
import { Button } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Page (){
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const [schedule, setSchedule] = React.useState<Schedule[] | null>(null);
    const [bookings, setBookings] = React.useState<Booking[] | null>(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(()=>{
        fetchScheduleByHostID();
    },[]);

    async function fetchScheduleByHostID(){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiGetScheduleByHostID(userInfoCookie.userID);
            if(result && result.code == STATUS_CODE_OK){
                setSchedule(result.data);
            }
        }
    }

    const handleClickDate = async (row: Schedule) => {
        if(row.amountParty == 0){
            return;
        }
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiGetBookingByDate(userInfoCookie.userID, GetDateFormat(row.dateOfMonth));
            if(result && result.code == STATUS_CODE_OK){
                setBookings(result.data);
            }
            handleOpen();
        }
    }

    async function handleClickCheckIn(bookingID: number) {
        const resultCF = confirm("Do you want to confirm the customer has arrived at the party?");
        if(resultCF){
            const result = await ApiChangeBookingStatus(bookingID.toString(), BOOKING_STATUS_DONE);
            if(result && result.code == STATUS_CODE_OK){
                alert("Check in success");
                handleClose();
            }else{
                alert("Check in failed");
            }
        }
    }
    async function handleClickCancel(bookingID: number) {
        const resultCF = confirm("Do you want to cancel the booking?");
        if(resultCF){
            const result = await ApiChangeBookingStatus(bookingID.toString(), BOOKING_STATUS_CANCEL);
            if(result && result.code == STATUS_CODE_OK){
                alert("Cancel booking success");
                handleClose();
            }else{
                alert("Cancel booking failed");
            }
        }
    }
    

    return(
        <div className="row d-flex justify-content-center bg-white">
            <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
                <h1 className="fw-bold text-primary">SCHEDULE <span className="text-dark">MANAGEMENT</span></h1>
                <div className="d-flex flex-wrap my-5">
                    { schedule && schedule.map((row, index)=>(
                        <div key={index} className={`schedule-cell position-relative ${row.isToday?"bg-success text-white":""}`} onClick={()=>handleClickDate(row)}>
                            <div className="position-absolute top-10 left-10">{row.day}</div>
                            <div className="position-absolute fs-18 bot-10 left-10">{row.dayOfWeek}</div>
                            {row.amountParty > 0  && (
                                <div className="position-absolute top-10 right-10 bg-danger text-white radius-50">{row.amountParty}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>



            {/* MODAL VOUCHERS  */}
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <h4 className="text-center mb-5">PARTY PLAN (03/10/2024)</h4>
                        { bookings && bookings.map((row, index)=>(
                            <div className="row mb-3 border-gray">
                                <div className="col-3 p-0">
                                    <Image alt={row.partyName??'Error image'} width={200} height={200} src={"/ImageUpload/"+row.image} className="image-fit" style={{width: '100%', height: "100%"}} />
                                </div>
                                <div className="col-5 border-gray">
                                    <h4>{row.partyName}</h4>
                                    <p>Room: {row.roomName}</p>
                                    <p>Slot: {TimeToString(row.slotTimeStart)}-{TimeToString(row.slotTimeEnd)}</p>
                                    <p>Payment Amount: {FormatVND(row.paymentAmount.toString())}</p>
                                    <p>Dining tables: {row.diningTable}</p>
                                    <p>Menu: {row.menuDescription}</p>
                                </div>
                                <div className="col-4">
                                    <p>Customer: {row.fullName}</p>
                                    <p>Phone: {row.phoneNumber}</p>
                                    <p>Booking Status: {row.status}</p>
                                    {row.status == BOOKING_STATUS_PAID && (
                                        <div>
                                            <Button variant="contained" color="primary" startIcon={<CheckCircleIcon />} className="me-2" onClick={()=>handleClickCheckIn(row.bookingID)}>Check In</Button>
                                            <Button variant="contained" color="error" startIcon={<DisabledByDefaultIcon />} className="me-2" onClick={()=>handleClickCancel(row.bookingID)}>CANCEL</Button>
                                        </div>
                                    )}
                                    {row.status == BOOKING_STATUS_CREATE && (
                                        <Button variant="contained" color="error" startIcon={<DisabledByDefaultIcon />} className="me-2" onClick={()=>handleClickCancel(row.bookingID)}>CANCEL</Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </Box>
                </Modal>
            </div>

        </div>
    );
}

