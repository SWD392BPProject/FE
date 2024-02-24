'use client'
import Image from "next/image";
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, Button, TextField, ThemeProvider } from "@mui/material";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import * as ColorUtil from "@/common/ColorUtil";
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import { UserInfoCookie, Option } from "@/types";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import {PARTY_TYPE_LIST, STATUS_CODE_ERROR, STATUS_CODE_OK, USER_COOKIE } from "@/common/Constant";
import { ChangeEvent } from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import React from "react";
import { ApiCreateParty } from "@/service/PartyService";
import { ApiCreateRoom } from "@/service/RoomService";

export default function Page (){
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const router = useRouter()
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [thumbnailImage, setThumbnailImage] = React.useState<File | null>(null);
    const [thumbnailImageSrc, setThumbnailImageSrc] = React.useState<string | undefined>(undefined);
    const [optionType,setOptionType] = React.useState<Option[] | null>(null);
    const [listType, setListType] = React.useState<string[] | null>(null);
    const [optionTypeSelected,setOptionTypeSelected] = React.useState<Option[] | null>(null);

    React.useEffect(()=>{
        fetchTypeServe();
    },[]);

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
            var result = await ApiCreateRoom(userInfoCookie.userID,values.RoomName, values.MinPeople, values.MaxPeople, values.Price, listType??[], values.Description, thumbnailImage, userInfoCookie.token);
            if(result?.code==STATUS_CODE_OK){
                alert("Create room successfully!");
            }else if(result?.code==STATUS_CODE_ERROR){
                alert(result?.message);
            }else{
                alert("Create room failed!");
            }
        }
    }

    function fetchTypeServe(){
        const arrayOptions = [] as Option[];
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
            arrayOptions.push(item);
        }
        setOptionType(arrayOptions);
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
                <h1 className="fw-bold text-danger">ROOM <span className="text-dark">CREATE</span></h1>
                <Formik 
                    initialValues={{
                        RoomName: 'Phòng Sofa 1A',
                        MinPeople: 1,
                        MaxPeople: 10,
                        Price: 1000000,
                        Type: (optionTypeSelected && optionTypeSelected.length > 0) && optionTypeSelected[0].value || PARTY_TYPE_LIST[0].value,
                        Description: "Phòng hội trường 50-100 chỗ. Đối với không gian tổ chức nhỏ chỉ từ 50-100 chỗ, đây sẽ không gian phù hợp với các buổi tổ chức nhỏ như họp mặt, CLB, đào tạo,… với sơ đồ thường thấy nhất là lớp học hoặc nhóm nhỏ."
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
                                        {optionType && (
                                            <Autocomplete
                                                multiple
                                                className="bg-light"
                                                id="tags-outlined"
                                                options={optionType}
                                                getOptionLabel={(option) => option && option.label}
                                                onChange={handleChangeType}
                                                defaultValue={[optionType[0]]}
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
                                <Button type="submit" variant="contained" startIcon={<AddIcon />} color="error">
                                    Register
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
});

interface PartyFormValues {
    RoomName: string;
    MinPeople: number;
    MaxPeople: number;
    Price: number;
    Type: string;
    Description: string;
}