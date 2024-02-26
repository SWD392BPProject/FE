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
import { ApiCreateMenu } from "@/service/MenuService";

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

    const handleSubmitMenu = async (values : MenuFormValues) => {
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            var result = await ApiCreateMenu(userInfoCookie.userID,values.MenuName, values.Price, values.Description, thumbnailImage, userInfoCookie.token);
            if(result?.code==STATUS_CODE_OK){
                alert("Create menu successfully!");
            }else if(result?.code==STATUS_CODE_ERROR){
                alert(result?.message);
            }else{
                alert("Create menu failed!");
            }
        }
    }
    return(
        <div className="row d-flex justify-content-center bg-graylight">
            <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
                <h1 className="fw-bold text-danger">MENU <span className="text-dark">CREATE</span></h1>
                <Formik 
                    initialValues={{
                        MenuName: 'Combo gà siêu quậy',
                        Price: 500000,
                        Description: "Món 1: Gà chiên nước mắm \nMón 2: Sụn gà chiên giòn\nMón 3: Gà rán phomai",
                    }}
                    validationSchema={MenuValidateSchema}
                    onSubmit={values=>handleSubmitMenu(values)}>
                        {({ errors, setFieldValue, touched }) => (
                        <Form>
                            <div className="row">
                                {/* LEFT FORM */}
                                <div className="col-12 col-sm-12 col-md-6">
                                    <div className="form-group mt-2">
                                        <label className="fw-bold" htmlFor="MenuName">Menu Name: </label>
                                        <Field type="text" name="MenuName" className="form-control" required/>
                                        {errors.MenuName && touched.MenuName ? (
                                            <div className="fw-bold text-danger">{errors.MenuName}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mt-2">
                                        <label className="fw-bold" htmlFor="Price">Price: </label>
                                        <Field type="number" name="Price" className="form-control" required/>
                                        {errors.Price && touched.Price ? (
                                            <div className="fw-bold text-danger">{errors.Price}</div>
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



const MenuValidateSchema = Yup.object().shape({
    MenuName: Yup.string()
      .min(5,'MenuName name must be at least 5 characters')  
      .max(255, 'MenuName maximum 255 characters')
      .required('Please enter MenuName.'),
    Price: Yup.number()
      .min(100000,'Price must be at least 100000')  
      .max(1000000000, 'Price maximum 1000000000')
});

interface MenuFormValues {
    MenuName: string;
    Price: number;
    Description: string;
}