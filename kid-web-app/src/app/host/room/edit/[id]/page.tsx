'use client'
import Image from "next/image";
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, Button, TextField, ThemeProvider } from "@mui/material";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import * as ColorUtil from "@/common/ColorUtil";
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import { UserInfoCookie, Option, Room, Slot } from "@/types";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import {PARTY_TYPE_LIST, PUBLIC_IMAGE_UPLOAD, STATUS_CODE_ERROR, STATUS_CODE_OK, USER_COOKIE } from "@/common/Constant";
import { ChangeEvent } from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import React from "react";
import { ApiCreateParty } from "@/service/PartyService";
import { ApiCreateRoom, ApiGetRoomById } from "@/service/RoomService";
import { ApiGetSlotByRoomID } from "@/service/SlotService";
import { TimeToString } from "@/util/TextUtil";

type Params = {
    params: {
        id: number;
    }
}

export default function Page ({ params } : Params){
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const router = useRouter()
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [thumbnailImage, setThumbnailImage] = React.useState<File | null>(null);
    const [thumbnailLink, setThumbnailLink] = React.useState<string | null>(null);
    const [thumbnailImageSrc, setThumbnailImageSrc] = React.useState<string | undefined>(undefined);
    const [optionType,setOptionType] = React.useState<Option[] | null>(null);
    const [listType, setListType] = React.useState<string[] | null>(null);
    const [optionDefaultType, setOptionDefaultType] = React.useState<Option[] | null>(null);
    const [optionTypeSelected,setOptionTypeSelected] = React.useState<Option[] | null>(null);
    const [room, setRoom] = React.useState<Room | null>(null);
    const [slots, setSlots] = React.useState<Slot[] | null>(null);

    React.useEffect(()=>{
        fetchRoomByID(params.id);
    },[]);

    async function fetchRoomByID(id: number){
        const result = await ApiGetRoomById(id);
        if(result && result.code == STATUS_CODE_OK){
            const roomData = result.data as Room;
            setRoom(roomData);
            setThumbnailLink(roomData.image);
            fetchTypeServe(roomData);
            fetchSlotByRoomID(roomData.roomID);
        }
    }

    async function fetchSlotByRoomID(id: number){
        const result = await ApiGetSlotByRoomID(id);
        if(result && result.code == STATUS_CODE_OK){
            setSlots(result.data);
        }
    }

    const handleAddPhotoClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setThumbnailImage(files[0]);
            const imageUrl = URL.createObjectURL(files[0]);
            setThumbnailImageSrc(imageUrl);
        }
    };

    const handleSubmitRoom = async (values : PartyFormValues) => {
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            var result = await ApiCreateRoom(
                userInfoCookie.userID,
                values.RoomName, 
                values.MinPeople, 
                values.MaxPeople, 
                values.Price, listType??[], 
                values.Description, 
                values.SlotStart1,
                values.SlotStart2,
                values.SlotStart3,
                values.SlotStart4,
                values.SlotEnd1,
                values.SlotEnd2,
                values.SlotEnd3,
                values.SlotEnd4,
                thumbnailImage, userInfoCookie.token,
                room?.roomID.toString()
            );
            if(result?.code==STATUS_CODE_OK){
                alert("Edit room successfully!");
            }else if(result?.code==STATUS_CODE_ERROR){
                alert(result?.message);
            }else{
                alert("Edit room failed!");
            }
        }
    }

    function fetchTypeServe(roomData: Room){
        const arrayOptions = [] as Option[];
        const arrayDefaultOptions = [] as Option[];
        const listRoomTypeString = [] as string[];
        const firstValue = [] as string[];
        for(let i = 0; i < PARTY_TYPE_LIST.length; i++){
            if(i == 0){
                firstValue.push(PARTY_TYPE_LIST[i].value);
                setListType(firstValue);
            }
            const item = {
                value: PARTY_TYPE_LIST[i].value,
                label: PARTY_TYPE_LIST[i].label,
            } as Option;
            if(roomData.type.includes(item.value)){
                arrayDefaultOptions.push(item);
                listRoomTypeString.push(item.value);
            }
            arrayOptions.push(item);
        }
        setListType(listRoomTypeString);
        setOptionType(arrayOptions);
        setOptionDefaultType(arrayDefaultOptions);
        if(arrayOptions.length > 0){
            setOptionTypeSelected([arrayOptions[0]]);
        }
    }

    const handleChangeType = (
        event: ChangeEvent<{}>, // Adjust the event type based on Autocomplete's expected type
        value: Option[], 
        reason: AutocompleteChangeReason, 
        details?: AutocompleteChangeDetails<Option> | undefined
      ) => {
        // Handle the change here
        const arrayId = [];
        for(let i = 0 ; i < value.length; i++){
            arrayId.push(value[i].value);
        }
        setListType(arrayId);
        setOptionTypeSelected(value);
    };

    return(
        <div className="row d-flex justify-content-center bg-graylight">
            <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
                <h1 className="fw-bold text-primary">ROOM <span className="text-dark">EDIT</span></h1>
                {room && slots && (
                    <Formik 
                        initialValues={{
                            RoomName: room.roomName,
                            MinPeople: room.minPeople,
                            MaxPeople: room.maxPeople,
                            SlotStart1: slots.length > 0 && TimeToString(slots[0].startTime) || "",
                            SlotStart2: slots.length > 1 && TimeToString(slots[1].startTime) || "",
                            SlotStart3: slots.length > 2 && TimeToString(slots[2].startTime) || "",
                            SlotStart4: slots.length > 3 && TimeToString(slots[3].startTime) || "",
                            SlotEnd1: slots.length > 0 && TimeToString(slots[0].endTime) || "",
                            SlotEnd2: slots.length > 1 && TimeToString(slots[1].endTime) || "",
                            SlotEnd3: slots.length > 2 && TimeToString(slots[2].endTime) || "",
                            SlotEnd4: slots.length > 3 && TimeToString(slots[3].endTime) || "",
                            Price: room.price,
                            Type: PARTY_TYPE_LIST[0].value,
                            Description: room.description
                        }}
                        validationSchema={PartyValidateSchema}
                        onSubmit={values=>handleSubmitRoom(values)}>
                            {({ errors, setFieldValue, touched }) => (
                            <Form>
                                <div className="row">
                                    {/* LEFT FORM */}
                                    <div className="col-12 col-sm-12 col-md-6">
                                        <div className="form-group mt-2">
                                            <label className="fw-bold" htmlFor="PartyName">Room Name: </label>
                                            <Field type="text" name="RoomName" className="form-control" required/>
                                            {errors.RoomName && touched.RoomName ? (
                                                <div className="fw-bold text-danger">{errors.RoomName}</div>
                                            ) : null}
                                        </div>
                                        <div className="form-group mt-2">
                                            <label className="fw-bold" htmlFor="PartyName">Price: </label>
                                            <Field type="text" name="Price" className="form-control" required/>
                                            {errors.Price && touched.Price ? (
                                                <div className="fw-bold text-danger">{errors.Price}</div>
                                            ) : null}
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-md-6">
                                                <div className="form-group mt-2">
                                                    <label className="fw-bold" htmlFor="MinPeople">Min-People: </label>
                                                    <Field type="number" name="MinPeople" className="form-control" required/>
                                                    {errors.MinPeople && touched.MinPeople ? (
                                                        <div className="fw-bold text-danger">{errors.MinPeople}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6">
                                                <div className="form-group mt-2">
                                                    <label className="fw-bold" htmlFor="MaxPeople">Max-People: </label>
                                                    <Field type="number" name="MaxPeople" className="form-control" required/>
                                                    {errors.MaxPeople && touched.MaxPeople ? (
                                                        <div className="fw-bold text-danger">{errors.MaxPeople}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="form-group mt-2">
                                            <label htmlFor="ServeType" className="form-label fw-bold">Serve Type: </label>
                                            {optionType && optionDefaultType && (
                                                <Autocomplete
                                                    multiple
                                                    className="bg-light"
                                                    id="tags-outlined"
                                                    options={optionType}
                                                    getOptionLabel={(option) => option && option.label}
                                                    onChange={handleChangeType}
                                                    defaultValue={optionDefaultType}
                                                    filterSelectedOptions
                                                    renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder="List serve type"
                                                    />
                                                    )}
                                                />
                                            )}
                                        </div>
                                        <div className="form-group mt-2">
                                            <label className="fw-bold">Slot List: </label>
                                            <div className="row d-flex align-items-center">
                                                <div className="col-5 col-sm-5 col-md-4">
                                                    <Field type="time" name="SlotStart1" className="form-control" required/>
                                                </div>
                                                to
                                                <div className="col-5 col-sm-5 col-md-4">
                                                    <Field type="time" name="SlotEnd1" className="form-control" required/>
                                                </div>
                                            </div>
                                            {errors.SlotStart1 && touched.SlotStart1 ? (
                                                <div className="fw-bold text-danger">{errors.SlotStart1}</div>
                                            ) : null}
                                            {errors.SlotEnd1 && touched.SlotEnd1 ? (
                                                <div className="fw-bold text-danger">{errors.SlotEnd1}</div>
                                            ) : null}
                                            <div className="row d-flex align-items-center mt-2">
                                                <div className="col-5 col-sm-5 col-md-4">
                                                    <Field type="time" name="SlotStart2" className="form-control"/>
                                                </div>
                                                to
                                                <div className="col-5 col-sm-5 col-md-4">
                                                    <Field type="time" name="SlotEnd2" className="form-control"/>
                                                </div>
                                            </div>
                                            {errors.SlotEnd2 && touched.SlotEnd2 ? (
                                                <div className="fw-bold text-danger">{errors.SlotEnd2}</div>
                                            ) : null}
                                            <div className="row d-flex align-items-center mt-2">
                                                <div className="col-5 col-sm-5 col-md-4">
                                                    <Field type="time" name="SlotStart3" className="form-control"/>
                                                </div>
                                                to
                                                <div className="col-5 col-sm-5 col-md-4">
                                                    <Field type="time" name="SlotEnd3" className="form-control"/>
                                                </div>
                                            </div>
                                            {errors.SlotEnd3 && touched.SlotEnd3 ? (
                                                <div className="fw-bold text-danger">{errors.SlotEnd3}</div>
                                            ) : null}
                                            <div className="row d-flex align-items-center mt-2">
                                                <div className="col-5 col-sm-5 col-md-4">
                                                    <Field type="time" name="SlotStart4" className="form-control"/>
                                                </div>
                                                to
                                                <div className="col-5 col-sm-5 col-md-4">
                                                    <Field type="time" name="SlotEnd4" className="form-control"/>
                                                </div>
                                            </div>
                                            {errors.SlotEnd4 && touched.SlotEnd4 ? (
                                                <div className="fw-bold text-danger">{errors.SlotEnd4}</div>
                                            ) : null}
                                        </div>
                                        <div className="form-group mt-2">
                                            <label className="fw-bold" htmlFor="Description">Description: </label>
                                            <Field as="textarea" name="Description" className="form-control" rows={8}></Field>
                                            {errors.Description && touched.Description ? (
                                                <div className="fw-bold text-danger">{errors.Description}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    {/* RIGHT AVATAR IMAGE */}
                                    <div className="col-12 col-sm-12 col-md-6">
                                        {
                                            thumbnailImageSrc && (
                                                <div className="d-flex justify-content-center align-items-center w-100 border-radius-black h-100" style={{maxHeight:445}} onClick={handleAddPhotoClick}>
                                                    <Image alt={""} width={600} height={600} src={thumbnailImageSrc} className="border-radius-black image-fit w-100"  style={{maxHeight:445}} />
                                                </div>
                                            )|| thumbnailLink && (
                                                <div className="d-flex justify-content-center align-items-center w-100 border-radius-black h-100" style={{maxHeight:445}} onClick={handleAddPhotoClick}>
                                                    <Image alt={""} width={600} height={600} src={PUBLIC_IMAGE_UPLOAD + thumbnailLink} className="border-radius-black image-fit w-100"  style={{maxHeight:445}} />
                                                </div>
                                            ) || (
                                                <div className="d-flex justify-content-center align-items-center w-100 border-radius-black h-100" style={{maxHeight:445}} onClick={handleAddPhotoClick}>
                                                    <AddAPhotoIcon style={{fontSize:56}} />
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="d-none">
                                        <Field type="file" name="thumbnail_image" className="form-control" onChange={handleFileChange} innerRef={inputRef} />
                                    </div>
                                </div>
                                
                                <div className="mt-4">
                                    <Button type="submit" variant="contained" startIcon={<AddIcon />} color="primary">
                                        Save
                                    </Button>
                                    <Link href="/host/room" className="ms-2">
                                        <ThemeProvider theme={ColorUtil.ColorGray}>
                                            <Button variant="contained" color="primary">back</Button>
                                        </ThemeProvider>
                                    </Link>
                                </div>
                            </Form>
                            )}
                </Formik>
                )}
                
            </div>
        </div>
    );
}



const PartyValidateSchema = Yup.object().shape({
    RoomName: Yup.string()
        .min(3,'PartyName name must be at least 3 characters')  
        .max(255, 'PartyName maximum 255 characters')
        .required('Please enter PartyName.'),
    MinPeople: Yup.number()
        .min(1,'MinPeople must be at least 1')  
        .max(10000, 'MinPeople maximum 10000')
        .required('Please enter MinPeople.'),
    MaxPeople: Yup.number()
        .min(1,'MaxPeople must be at least 1')  
        .max(10000, 'MaxPeople maximum 10000')
        .required('Please enter MaxPeople.'),
    Price: Yup.number()
        .min(100000,'Price must be at least 100000')  
        .max(1000000000, 'Price maximum 1000000000')
        .required('Please enter Price.'),
    SlotStart1: Yup.string()
        .required('Please enter SlotStart1'),
    SlotEnd1: Yup.string()
        .required('Please enter SlotEnd1')
        .test('is-greater', 'SlotEnd must be greater than SlotStart', function(value, context) {
            const { SlotStart1 } = context.parent;
            if (!SlotStart1 || !value) {
                return true; // Không kiểm tra nếu một trong hai trống
            }
            return value > SlotStart1; // Kiểm tra nếu SlotEnd1 lớn hơn SlotStart1
        }),
    SlotEnd2: Yup.string()
        .test('is-greater', 'SlotEnd must be greater than SlotStart', function(value, context) {
            const { SlotStart2 } = context.parent;
            if (!SlotStart2 || !value) {
                return true; // Không kiểm tra nếu một trong hai trống
            }
            return value > SlotStart2; // Kiểm tra nếu SlotEnd1 lớn hơn SlotStart1
        }),
    SlotEnd3: Yup.string()
        .test('is-greater', 'SlotEnd must be greater than SlotStart', function(value, context) {
            const { SlotStart3 } = context.parent;
            if (!SlotStart3 || !value) {
                return true; // Không kiểm tra nếu một trong hai trống
            }
            return value > SlotStart3; // Kiểm tra nếu SlotEnd1 lớn hơn SlotStart1
        }),
    SlotEnd4: Yup.string()
        .test('is-greater', 'SlotEnd must be greater than SlotStart', function(value, context) {
            const { SlotStart4 } = context.parent;
            if (!SlotStart4 || !value) {
                return true; // Không kiểm tra nếu một trong hai trống
            }
            return value > SlotStart4; // Kiểm tra nếu SlotEnd1 lớn hơn SlotStart1
        }),
});

interface PartyFormValues {
    RoomName: string;
    MinPeople: number;
    MaxPeople: number;
    Price: number;
    SlotStart1: string;
    SlotStart2: string;
    SlotStart3: string;
    SlotStart4: string;
    SlotEnd1: string;
    SlotEnd2: string;
    SlotEnd3: string;
    SlotEnd4: string;
    Type: string;
    Description: string;
}