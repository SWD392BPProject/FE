'use client'
import Image from "next/image";
import { Button, ThemeProvider } from "@mui/material";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import * as ColorUtil from "@/common/ColorUtil";
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import { UserInfoCookie } from "@/types";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import {PARTY_TYPE_LIST, STATUS_CODE_ERROR, STATUS_CODE_OK, USER_COOKIE } from "@/common/Constant";
import { ChangeEvent } from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import React from "react";
import { ApiCreateParty } from "@/service/PartyService";

export default function Page (){
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const router = useRouter()
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [thumbnailImage, setThumbnailImage] = React.useState<File | null>(null);
    const [thumbnailImageSrc, setThumbnailImageSrc] = React.useState<string | undefined>(undefined);

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

    const handleSubmitParty = async (values : PartyFormValues) => {
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            var result = await ApiCreateParty(userInfoCookie.userID,values.PartyName, values.Address, values.Type, values.Description, thumbnailImage, userInfoCookie.token);
            if(result?.code==STATUS_CODE_OK){
                alert("Create party successfully!");
            }else if(result?.code==STATUS_CODE_ERROR){
                alert(result?.message);
            }else{
                alert("Create party failed!");
            }
        }
    }
    return(
        <div className="row d-flex justify-content-center bg-graylight">
            <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
                <h1 className="fw-bold text-danger">PARTY <span className="text-dark">CREATE</span></h1>
                <Formik 
                    initialValues={{
                        PartyName: 'Tiệc sinh nhật LUXURY',
                        Address: 'Hồ Chí Minh',
                        Type: PARTY_TYPE_LIST[0].value,
                        Description: "Một sinh nhật thật ý nghĩa và đặc biệt để đánh dấu cột mốc quan trọng của các thiên thần nhỏ luôn là điều bố mẹ băn khoăn? Với sự đa dạng trong các gói tiệc sinh nhật, tiNi hứa hẹn sẽ mang đến cho các thiên thần nhỏ một bữa tiệc đầy bất ngờ và tràn ngập những khoảnh khắc đáng nhớ.",
                    }}
                    validationSchema={PartyValidateSchema}
                    onSubmit={values=>handleSubmitParty(values)}>
                        {({ errors, setFieldValue, touched }) => (
                        <Form>
                            <div className="row">
                                {/* LEFT FORM */}
                                <div className="col-12 col-sm-12 col-md-6">
                                    <div className="form-group mt-2">
                                        <label className="fw-bold" htmlFor="PartyName">Party Name: </label>
                                        <Field type="text" name="PartyName" className="form-control" required/>
                                        {errors.PartyName && touched.PartyName ? (
                                            <div className="fw-bold text-danger">{errors.PartyName}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mt-2">
                                        <label className="fw-bold" htmlFor="Address">Address: </label>
                                        <Field type="text" name="Address" className="form-control" required/>
                                        {errors.Address && touched.Address ? (
                                            <div className="fw-bold text-danger">{errors.Address}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mt-2">
                                        <label className="fw-bold" htmlFor="Type">Type: </label>
                                        <Field as="select" className="form-select" name="Type">
                                            {PARTY_TYPE_LIST.map((row, index)=>(
                                                <option key={index} value={row.value}>{row.label}</option>
                                            ))}
                                        </Field>
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
                                <Link href="/host/party" className="ms-2">
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
    PartyName: Yup.string()
      .min(10,'PartyName name must be at least 10 characters')  
      .max(255, 'PartyName maximum 255 characters')
      .required('Please enter PartyName.'),
    Address: Yup.string()
      .min(10,'Address must be at least 10 characters')  
      .max(255, 'Address maximum 255 characters')
      .required('Please enter Address.'),
});

interface PartyFormValues {
    PartyName: string;
    Address: string;
    Type: string;
    Description: string;
}