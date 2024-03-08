'use client'
import Image from "next/image";
import { BOOKING_STATUS_CREATE, BOOKING_STATUS_DONE, BOOKING_STATUS_PAID, ROLE_ADMIN, ROLE_HOST, ROLE_USER, STATUS_CODE_ERROR, STATUS_CODE_OK, TABLE_DATA_SIZE, USER_COOKIE } from "@/common/Constant";
import { ApiGetLatestParty } from "@/service/PartyService";
import { Booking, Feedback, PackageOrder, Party, UserInfoCookie } from "@/types";
import Link from "next/link";
import React, { ChangeEvent } from "react";
import { useCookies } from "react-cookie";
import { FormatVND, GetDateFormat, GetLabelOfPartyType, TimeToString } from "@/util/TextUtil";
import PaginationBar from "@/component/PaginationBar";
import { ApiGetBookingByUserID } from "@/service/BookingService";
import { ApiGetPackageOrderByUserID } from "@/service/PackageService";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { Button } from "@mui/material";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import Rating from '@mui/material/Rating';
import { ApiCreateFeedback, ApiGetFeedbackByUserBookingID } from "@/service/FeedbackService";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Page (){
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const [bookings, setBookings] = React.useState<Booking[] | null>(null);
    const [bookingIdSelected, setBookingIdSelected] = React.useState(0);
    const [packageOrders, setPackageOrders] = React.useState<PackageOrder[] | null>(null);
    const [rateValue, setRateValue] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);
    const [isHost, setIsHost] = React.useState(false);
    const [feedback, setFeedback] = React.useState<Feedback | null>(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [feedbackComment, setFeedbackComment] = React.useState('');

    React.useEffect(()=>{
        CheckRole();
    },[]);

    function CheckRole(){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            if(userInfoCookie.role == ROLE_HOST){
                setIsHost(true);
                fetchPackageOrderByUserID(1);
            } else if(userInfoCookie.role == ROLE_USER){
                setIsHost(false);
                fetchBookingByUserID(1);
            }
        }
    }

    async function fetchFeedbackByUserBookingID(bookingIdSelected :number){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiGetFeedbackByUserBookingID(userInfoCookie.userID, bookingIdSelected);
            if(result && result.code == STATUS_CODE_OK){
                const feedbackData = result.data as Feedback;
                if(feedbackData){
                    setFeedback(feedbackData);
                    setRateValue(feedbackData.rating);
                    setFeedbackComment(feedbackData.comment);
                }else{
                    setFeedbackComment("");
                }
            }
        }
    }

    async function fetchBookingByUserID(page: number){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiGetBookingByUserID(page, TABLE_DATA_SIZE,userInfoCookie.userID);
            if(result && result.code == STATUS_CODE_OK){
                setBookings(result.data);
                const totalPage = result.totalPage ?? 1;
                setTotalPage(totalPage);
                window.scrollTo(0, 0);
            }
        }
    }

    async function fetchPackageOrderByUserID(page: number){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiGetPackageOrderByUserID(page, TABLE_DATA_SIZE,userInfoCookie.userID);
            if(result && result.code == STATUS_CODE_OK){
                setPackageOrders(result.data);
                const totalPage = result.totalPage ?? 1;
                setTotalPage(totalPage);
                window.scrollTo(0, 0);
            }
        }
    }

    const handleChangePage = (num : number) => {
        setCurrentPage(num);
        if(isHost){
            fetchPackageOrderByUserID(num);
        }else{
            fetchBookingByUserID(num);
        }
    }

    const handleClickFeedback = (bookingId: number) => {
        fetchFeedbackByUserBookingID(bookingId);
        setBookingIdSelected(bookingId);
        handleOpen();
    }

    const handleSubmitFeedback = async (values : FeedbackFormValues) => {
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            var result = await ApiCreateFeedback(userInfoCookie.userID,bookingIdSelected, rateValue, feedbackComment);
            if(result?.code==STATUS_CODE_OK){
                alert("Send feedback successfully!");
                handleClose()
            }else if(result?.code==STATUS_CODE_ERROR){
                alert(result?.message);
            }else{
                alert("Send feedback failed!");
            }
        }
    }

    const handleSetRating = async (newValue: number) => {
        setRateValue(newValue);
    }



    function handleChangeComment(setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void, e: React.ChangeEvent<HTMLInputElement>) {
        setFeedbackComment(e.currentTarget.value);
        //setFieldValue("Comment", e.currentTarget.value);
    }

    return(
        <div className="row d-flex justify-content-center bg-graylight">
            <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
                <h1 className="fw-bold text-primary">MY <span className="text-dark">ORDERS</span></h1>
                {/* <!-- TABLE --> */}
                <div className="row p-0 m-0 my-3">
                    <div className="col-12 col-sm-12 col-md-12 p-0 m-0">
                    <table className="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th className="w-20">Name</th>
                            <th className="w-20">Create Date</th>
                            <th className="w-20">Payment Amount</th>
                            <th className="w-20">Status</th>
                            <th className="w-20">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            { bookings && bookings.map((booking, index)=>(
                                <tr key={index}>
                                    <td>{booking.partyName}</td>
                                    <td>
                                        {GetDateFormat(booking.bookingDate)} ({TimeToString(booking.slotTimeStart)} - {TimeToString(booking.slotTimeEnd)})
                                    </td>
                                    <td>{FormatVND(booking.paymentAmount.toString())}</td>
                                    <td>
                                        {booking.status == BOOKING_STATUS_PAID && (
                                            <span className="text-success">{booking.status}</span>
                                        ) || (
                                            <span className="text-dark">{booking.status}</span>
                                        )}
                                    </td>
                                    <td>
                                        {booking.status == BOOKING_STATUS_DONE && (
                                            <button className="btn btn-primary me-3" onClick={()=>handleClickFeedback(booking.bookingID)}>Feedback</button>
                                        ) }
                                        {booking.status == BOOKING_STATUS_CREATE && (
                                            <Link href={`/payment/${booking.bookingID}`}><button className="btn btn-warning">Pay now</button></Link>
                                        )}
                                    </td>
                                </tr>
                            )) || packageOrders && packageOrders.map((packageOrder, index)=>(
                                <tr key={index}>
                                    <td>{packageOrder.packageName}</td>
                                    <td>
                                        {GetDateFormat(packageOrder.createDate)}
                                    </td>
                                    <td>{FormatVND(packageOrder.paymentAmount.toString())}</td>
                                    <td>
                                        {packageOrder.status == BOOKING_STATUS_PAID && (
                                            <span className="text-success">{packageOrder.status}</span>
                                        ) || (
                                            <span className="text-dark">{packageOrder.status}</span>
                                        )}
                                    </td>
                                    <td>
                                        {packageOrder.status == BOOKING_STATUS_CREATE && (
                                            <Link href={`/package-payment/${packageOrder.packageOrderID}`}><button className="btn btn-warning me-3">Pay now</button></Link>
                                        )}
                                    </td>
                                </tr>
                            )) || (
                                <tr>
                                    <td colSpan={5}>Data is empty</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* PAGINATION BAR */}
                    {totalPage != 0 && (
                        <PaginationBar totalPage={totalPage} currentPage={currentPage} handleChangePage={handleChangePage} />
                    )}
                    </div>
                </div>
            </div>





            {/* MODAL FEEDBACK  */}
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <h5 className="text-center fw-bold">SEND FEEDBACK</h5>
                        <div className="mb-2">
                            <label className="fw-bold" htmlFor="simple-controlled">Rating: </label>
                        </div>
                        <Rating
                                name="simple-controlled"
                                value={rateValue}
                                onChange={(event, newValue) => {
                                    if(newValue){
                                        handleSetRating(newValue);
                                    }
                                }}
                            />
                        <Formik 
                                initialValues={{
                                    Comment: feedbackComment,
                                }}
                                validationSchema={FeedbackValidateSchema}
                                onSubmit={values=>handleSubmitFeedback(values)}>
                                    {({ errors, setFieldValue, touched }) => (
                                    <Form>
                                        <div className="form-group mt-2">
                                            <label className="fw-bold" htmlFor="Description">Comment: </label>
                                            <Field as="textarea" name="Comment" className="form-control" rows={5} placeholder="Input your comment" value={feedbackComment} onChange={(e: ChangeEvent<HTMLInputElement>)=>handleChangeComment(setFieldValue,e)}></Field>
                                            {errors.Comment && touched.Comment ? (
                                                <div className="fw-bold text-danger">{errors.Comment}</div>
                                            ) : null}
                                        </div>
                                        <div className="mt-2 d-flex justify-content-end">
                                                <Button type="submit" variant="contained" color="primary" startIcon={<MarkEmailReadIcon />}>Send</Button>
                                        </div>
                                    </Form>
                                )}
                        </Formik>
                    </Box>
                </Modal>
            </div>




        </div>
    );
}

const FeedbackValidateSchema = Yup.object().shape({
 
});

interface FeedbackFormValues {
    Comment: string;
}