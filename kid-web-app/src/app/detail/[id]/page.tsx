'use client';
import { PARTY_TYPE_LIST, PUBLIC_IMAGE_UPLOAD, STATUS_CODE_OK, TABLE_DATA_SIZE, USER_COOKIE } from "@/common/Constant";
import { ApiGetPartyById } from "@/service/PartyService";
import { Party, Room, UserInfoCookie } from "@/types";
import React from "react";
import Image from "next/image";
import PlaceIcon from '@mui/icons-material/Place';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Field, Form, Formik } from "formik";
import PaginationBar from "@/component/PaginationBar";
import { useCookies } from "react-cookie";
import { ApiGetLatestRoom } from "@/service/RoomService";
import { FormatVND, GetLabelOfPartyType } from "@/util/TextUtil";
type Params = {
    params: {
        id: number;
    }
}
export default function Page({ params } : Params){
    const [party, setParty] = React.useState<Party | null>(null);
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const [rooms, setRooms] = React.useState<Room[] | null>(null);
    const [totalPage, setTotalPage] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);

    React.useEffect(()=>{
        fetchGetPartyById(params.id);
    }, []);

    async function fetchGetPartyById(id: number){
        const result = await ApiGetPartyById(id);
        if(result && result.code == STATUS_CODE_OK){
            setParty(result.data);
            fetchAllRoomByHostId(1, result.data.hostUserID);
        }
    }

    async function fetchAllRoomByHostId(page: number, hostId: number){
        const result = await ApiGetLatestRoom(page, TABLE_DATA_SIZE, hostId);
        if(result && result.code == STATUS_CODE_OK){
            setRooms(result.data);
            const totalPage = result.totalPage ?? 1;
            setTotalPage(totalPage);
            //window.scrollTo(0, 0);
        }
    }

    function handleSubmitSearch(values: { PartyName: string; Address: string; Type: string; Description: string; }): any {
        throw new Error("Function not implemented.");
    }

    const handleChangePage = (num : number) => {
        if(party){
            setCurrentPage(num);
            console.log(party);
            fetchAllRoomByHostId(num, party.hostUserID);
        }
    }

    return (
        <div className="row d-flex justify-content-center bg-white">
            <div className="col-12 col-sm-12 col-md-9 my-2">
                {/* CONTENT BODY */}
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-3">
                        <div className="bg-primary p-0 p-sm-0 p-md-4 h-100" style={{borderRadius:15}}>
                            <h5 className="text-light">BOOKING SEARCH</h5>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="Type" className="text-light my-2">Type: </label>
                                    <input className="form-control" name="Type" placeholder="Sinh nhật" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="People" className="text-light my-2">People: </label>
                                    <input type="number" className="form-control" name="Peole" placeholder="Số người" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="BookingDate" className="text-light my-2">Booking date: </label>
                                    <input type="date" className="form-control" name="BookingDate"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="BookingTime" className="text-light my-2">Booking time: </label>
                                    <input type="time" className="form-control" name="BookingTime" />
                                </div>
                                <button className="btn btn-light mt-4 w-100">BOOKING NOW</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9">
                        <h3 className="fw-bold">{party?.partyName}</h3>
                        <div className="d-flex align-items-center my-2">
                            <PlaceIcon className="text-primary"/> <b className="me-2">{party?.address}</b> - Vị trí hiển thị trên bản đồ
                            <div className="flex-grow-1"></div>
                            <div className="cursor-pointer d-flex align-items-center">
                                <FavoriteBorderIcon className="text-primary" /> <b className="ms-2">LIKE</b>
                            </div>
                            <div className="cursor-pointer d-flex align-items-center ms-3">
                                <ShareIcon className="text-primary" /> <b className="ms-2">SHARE</b>
                            </div>
                        </div>
                        <Image alt={party?.partyName??''} src={PUBLIC_IMAGE_UPLOAD + party?.image} width={1000} height={1000} style={{width:'100%',height:500,borderRadius:15}}/>
                    </div>
                </div>

                {/* DESCRIPTION */}
                <h4 className="mt-3">DESCRIPTION</h4>
                <p style={{textAlign:'justify'}}>
                    {party?.description}
                </p>

                {/* ROOM AVAILABLE FOR RENT*/}
                <h4 className="mt-3">ROOM AVAILABLE FOR RENT</h4>
                {/* BOOKING SEARCH */}
                <Formik 
                    initialValues={{
                        PartyName: 'Tiệc sinh nhật LUXURY',
                        Address: 'Hồ Chí Minh',
                        Type: PARTY_TYPE_LIST[0].value,
                        Description: "Một sinh nhật thật ý nghĩa và đặc biệt để đánh dấu cột mốc quan trọng của các thiên thần nhỏ luôn là điều bố mẹ băn khoăn? Với sự đa dạng trong các gói tiệc sinh nhật, tiNi hứa hẹn sẽ mang đến cho các thiên thần nhỏ một bữa tiệc đầy bất ngờ và tràn ngập những khoảnh khắc đáng nhớ.",
                    }}
                    onSubmit={values=>handleSubmitSearch(values)}>
                        {({ errors, setFieldValue, touched }) => (
                <Form>
                <div className="row">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-10 row">
                            <div className="col-12 col-sm-12 col-md-4 form-group p-0 pt-2">
                                <Field type="date" className="form-control" placeholder="Ngày book" />
                            </div>
                            <div className="col-12 col-sm-12 col-md-4 form-group p-0 pt-2">
                                <Field type="time" className="form-control" placeholder="Giờ Book" />
                            </div>
                            <div className="col-12 col-sm-12 col-md-4 form-group p-0 pt-2">
                                <Field type="number" className="form-control" placeholder="Số người" />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-2 row pt-2">
                            <button className="btn btn-primary w-100 h-100 ms-0 ms-sm-0 ms-md-2">SEARCH</button>
                        </div>
                    </div>

                    {/* TABLE ROOM  */}
                    {/* <!-- TABLE --> */}
                    <div className="row p-0 m-0 my-3">
                        <div className="col-12 col-sm-12 col-md-12 p-0 m-0">
                        <table className="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th className="w-20">Name</th>
                                <th className="w-20">Image</th>
                                <th className="w-10">Type</th>
                                <th className="w-20">Price</th>
                                <th className="w-10">People</th>
                                <th className="w-20">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                { rooms && rooms.length > 0 && rooms.map((room, index)=>(
                                    <tr key={index}>
                                        <td>{room.roomName}</td>
                                        <td>
                                            <Image alt={""} width={400} height={400} src={"/ImageUpload/"+room.image} className="image-fit" style={{width: '100%', height: 150}} />
                                        </td>
                                        <td>{GetLabelOfPartyType(room.type)}</td>
                                        <td>{FormatVND(room.price.toString())}</td>
                                        <td>{room.minPeople} - {room.maxPeople} people</td>
                                        <td>
                                            <span className="text-decoration-underline text-primary cursor-pointer">View Room</span>
                                        </td>
                                    </tr>
                                )) || (
                                    <tr>
                                        <td colSpan={6}>Data is empty</td>
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
                </Form>
                )}
            </Formik>


            </div>
        </div>
    );
}