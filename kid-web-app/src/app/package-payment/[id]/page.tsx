'use client';
import { BOOKING_STATUS_PAID, STATUS_CODE_OK, USER_COOKIE } from "@/common/Constant";
import { ApiChangeBookingStatus, ApiGetBookingByID, ApiPaymentMomo } from "@/service/BookingService";
import { ApiGetPackageOrderByID } from "@/service/PackageService";
import { Booking, MomoReponse, PackageOrder, UserInfoCookie, Voucher } from "@/types";
import { FormatVND, GetDateFormat, GetDateRemaining, TimeToString } from "@/util/TextUtil";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { ApiAddVoucher, ApiGetVoucherByUserID } from "@/service/VoucherService";

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

type Params = {
    params: {
        id: number;
    }
}
export default function Page({ params } : Params){
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const [packageOrder, setPackageOrder] = React.useState<PackageOrder | null>(null);
    const [vouchers, setVouchers] = React.useState<Voucher[] | null>(null);
    const [voucherSelected, setVoucherSelected] = React.useState<Voucher | null>(null);
    const router = useRouter(); 
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(()=>{
        fetchVoucherByUserID();
    },[]);

    async function fetchGetPackageOrderByID(id: number, vouchers: Voucher[]){
        const result = await ApiGetPackageOrderByID(id);
        if(result && result.code == STATUS_CODE_OK){
            const packageOrderData = result.data as PackageOrder;
            setPackageOrder(packageOrderData);
            if(packageOrderData.voucherID){
                for(let i = 0 ; i < vouchers.length ; i++){
                    if(vouchers[i].voucherID == packageOrderData.voucherID){
                        setVoucherSelected(vouchers[i]);
                        break;
                    }
                }
            }
        }
    }

    async function fetchVoucherByUserID(){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiGetVoucherByUserID(userInfoCookie.userID);
            if(result && result.code == STATUS_CODE_OK){
                setVouchers(result.data);
                fetchGetPackageOrderByID(params.id, result.data);
            }
        }
    }

    const handleClickBuyNow = async () => {
        if(packageOrder){
            const result = await ApiPaymentMomo((packageOrder.paymentAmount / 1000).toString(), packageOrder.packageName, "PACKAGE_"+packageOrder.packageOrderID.toString()) as MomoReponse;
            if(result){
                router.push(result.payUrl);
            }
        }
    }

    async function handleClickVoucher(voucher: Voucher) {
        if(packageOrder){
            setVoucherSelected(voucher);
            const result = await ApiAddVoucher(voucher.voucherID, packageOrder.packageOrderID);
            if(result && result.code == STATUS_CODE_OK){
                setPackageOrder(result.data);
            }
        }
        handleClose();
    }

    return (
        <div className="row d-flex justify-content-center bg-white">
            <div className="col-12 col-sm-12 col-md-9 my-2">
                <h4 className="fw-bold text-primary text-center mb-3">PAYMENT <span className="text-dark">INFORMATION</span></h4>
                <div className="border-tbl-gray p-3">
                    <b className="me-2">Package Name: </b> {packageOrder?.packageName}
                </div>
                <div className="border-tbl-gray p-3">
                    <b className="me-2">Customer Name: </b> {cookieUser?.userInfoCookie.fullName}
                </div>
                <div className="d-flex">
                    <div className="border-tbl-gray p-3 w-50">
                        <b className="me-2">Create Date: </b> {GetDateFormat(packageOrder?.createDate??'')}
                    </div>
                    <div className="border-tbl-gray-nl p-3 w-50">
                        <b className="me-2">Active days: </b> {packageOrder?.activeDays}
                    </div>
                </div>
                <div className="border-tbl-gray p-3">
                    <b className="me-2 text-primary">PACKAGE DESCRIPTION:</b>
                </div>
                <div className="border-tbl-gray px-3 py-5">
                    {packageOrder?.packageDescription}
                </div>
                <div className="border-tbl-gray p-3 d-flex">
                    <b className="me-2">VOUCHER: </b> 
                    {voucherSelected && (
                        <span>{voucherSelected.packageName} (Discount: {voucherSelected.discountAmount != 0 && FormatVND(voucherSelected.discountAmount.toString()) || voucherSelected.discountPercent + "%"})</span>
                    )}
                    <div className="flex-grow-1"></div>
                    <Button variant="contained" color="primary" onClick={handleOpen}>ADD VOUCHER</Button>
                </div>
                <div className="d-flex">
                    <div className="border-tbl-gray p-3 w-75">
                        <b className="me-2 text-primary">TOTAL PAYMENT:</b>
                    </div>
                    <div className="border-tbl-gray-nl p-3 w-25">
                        <b className="me-2">{FormatVND(packageOrder?.paymentAmount?.toString()??'0')}</b>
                    </div>
                </div>
                <div className="d-flex justify-content-center my-3">
                    <button className="btn btn-warning" onClick={handleClickBuyNow}>PAY NOW</button>
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
                        {vouchers && vouchers.map((row, index)=>(
                            <div key={index} className="border-tbl-gray row mb-2 voucher-hover" onClick={()=>handleClickVoucher(row)}>
                                <div className="col-4 bg-primary py-5 ps-4 text-white">
                                    {row.voucherCode}
                                </div>
                                <div className="col-8 p-5">
                                    {row.packageName} (Discount: {row.discountAmount != 0 && FormatVND(row.discountAmount.toString()) || row.discountPercent + "%"})
                                    <br/>{GetDateRemaining(row.expiryDate)} days left
                                </div>
                            </div>
                        ))}
                        
                    </Box>
                </Modal>
            </div>


        </div>
    );
}