'use client'
import Image from "next/image";
import { Button } from "@mui/material";
import React from "react";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { FormikProps } from "formik";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { PUBLIC_IMAGE_UPLOAD, STATUS_CODE_ERROR, STATUS_CODE_OK, USER_COOKIE } from "@/common/Constant";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { ApiChangePW, ApiGetUserByID, ApiRegisterUser, ApiUpdateUserByID } from "@/service/UserService";
import { User, UserInfoCookie } from "@/types";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import RecyclingIcon from '@mui/icons-material/Recycling';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Page (){
    const formikRef = React.useRef<FormikProps<UpdateUserFormValues>>(null);
    const router = useRouter();
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE]);
    const [thumbnailImage, setThumbnailImage] = React.useState<File | null>(null);
    const [thumbnailLink, setThumbnailLink] = React.useState<string | null>(null);
    const [thumbnailImageSrc, setThumbnailImageSrc] = React.useState<string | undefined>(undefined);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [user, setUser] = React.useState<User | null>(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAddPhotoClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    React.useEffect(()=>{
        fetchUserByID();
    },[])

    async function fetchUserByID(){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiGetUserByID(userInfoCookie.userID.toString());
            if(result && result.code == STATUS_CODE_OK){
                const userData = result.data as User;
                setUser(userData);
                setThumbnailLink(userData.image);
            }
        }
    }

    const handleSubmitUpdateInfo = async (values : UpdateUserFormValues) => {
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiUpdateUserByID(values.Email, values.FullName, values.PhoneNumber, thumbnailImage, userInfoCookie.userID.toString(), "");
            if(result && result.code == STATUS_CODE_OK){
                alert("Update profile successfully");
            }else if(result && result.code == STATUS_CODE_ERROR){
                alert(result.message);
            }else{
                alert("Update profile failed");
            }
        }
    }
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setThumbnailImage(files[0]);
            const imageUrl = URL.createObjectURL(files[0]);
            setThumbnailImageSrc(imageUrl);
        }
    };

    const handleSubmitChangePW = async (values : ChangePWFormValues) => {
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiChangePW(values.OldPassword, values.NewPassword, userInfoCookie.userID.toString());
            if(result && result.code == STATUS_CODE_OK){
                alert("Update password successfully");
                handleClose();
            }else if(result && result.code == STATUS_CODE_ERROR){
                alert(result.message);
            }else{
                alert("Update password failed");
            }
        }
    }

    return(
        <div className="d-flex justify-content-center row mt-5">
        <div className="mt-5 col-12 col-sm-12 col-md-6">
            <h1 className="fw-bold mb-3 text-primary">MY<span className="text-dark"> PROFILE</span></h1>
            {user && (
                <Formik 
                initialValues={{
                    Role: user.role,
                    FullName: user.fullName,
                    PhoneNumber: user.phoneNumber,
                    Email: user.email,
                }}
                validationSchema={RegisterValidateSchema}
                onSubmit={values=>handleSubmitUpdateInfo(values)}
                innerRef={formikRef}>
                    {({ errors, touched }) => (
                    <Form>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-8">
                                <div className="form-group">
                                    <label htmlFor="FullName" className="fw-bold">Full name:</label>
                                    <Field name="FullName" className="form-control py-2 mt-2" placeholder="Input your name" required/>
                                    {errors.FullName && touched.FullName ? (
                                        <div className="fw-bold text-danger">{errors.FullName}</div>
                                    ) : null}
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="Email" className="fw-bold">Email:</label>
                                    <Field name="Email" type="email" className="form-control py-2 mt-2" placeholder="Input your email" required />
                                    {errors.Email && touched.Email ? (
                                        <div className="fw-bold text-danger">{errors.Email}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-4">
                                <div className="w-100" style={{height:150, maxWidth:250}}>
                                    <label htmlFor="Avatar" className="fw-bold">Avatar:</label>
                                    {
                                        thumbnailImageSrc && (
                                            <div className="d-flex justify-content-center align-items-center w-100 border-radius-black h-90" onClick={handleAddPhotoClick}>
                                                <Image alt={""} width={400} height={400} src={thumbnailImageSrc} className="image-fit w-100 h-100"/>
                                            </div>
                                        ) || thumbnailLink &&(
                                            <div className="d-flex justify-content-center align-items-center w-100 border-radius-black h-90" onClick={handleAddPhotoClick}>
                                                <Image alt={""} width={400} height={400} src={PUBLIC_IMAGE_UPLOAD + thumbnailLink} className="image-fit w-100 h-100"/>
                                            </div>
                                        ) ||(
                                            <div className="d-flex justify-content-center align-items-center w-100 h-100 border-radius-black h-90" onClick={handleAddPhotoClick}>
                                                <AddAPhotoIcon style={{fontSize:56}} />
                                            </div>
                                        )
                                    }
                            </div>
                            </div>
                            <div className="d-none">
                                <Field type="file" name="thumbnail_image" className="form-control" onChange={handleFileChange} innerRef={inputRef} />
                            </div>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="PhoneNumber" className="fw-bold">Phone Number:</label>
                            <Field name="PhoneNumber" type="text" className="form-control py-2 mt-2" placeholder="Input your phone number" required/>
                            {errors.PhoneNumber && touched.PhoneNumber ? (
                                <div className="fw-bold text-danger">{errors.PhoneNumber}</div>
                            ) : null}
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="Role" className="fw-bold">Role:</label>
                            <Field name="Role" className="form-control py-2 mt-2" placeholder="Input your Role" disabled/>
                            {errors.Role && touched.Role ? (
                                <div className="fw-bold text-danger">{errors.Role}</div>
                            ) : null}
                        </div>
                        <button type="submit" className="btn btn-primary mt-3 w-100">UPDATE NOW</button>
                    </Form>
                )}
                </Formik>
            )}
            <div className="mt-3 d-flex justify-content-center mb-4">
                <p className="text-decoration-underline text-primary cursor-pointer" onClick={handleOpen}>Change password</p>
            </div>
        </div>

        {/* MODAL CHANGE PASSWORD  */}
        <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <Formik 
                            validationSchema={ChangePWValidateSchema}
                            initialValues={{
                                OldPassword: '',
                                NewPassword: '',
                                ConfirmPassword: ''
                            }}
                            onSubmit={values=>handleSubmitChangePW(values)}>
                                {({ errors, setFieldValue, touched }) => (
                        <Form>
                            <h3>Change Password</h3>
                            <div className="form-group mt-2">
                                <label htmlFor="OldPassword" className="fw-bold">Current Password:</label>
                                <Field name="OldPassword" type="password" className="form-control py-2 mt-2" placeholder="Input current password" required/>
                                {errors.OldPassword && touched.OldPassword ? (
                                    <div className="fw-bold text-danger">{errors.OldPassword}</div>
                                ) : null}
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="NewPassword" className="fw-bold">New Password:</label>
                                <Field name="NewPassword" type="password" className="form-control py-2 mt-2" placeholder="Input new password" required/>
                                {errors.NewPassword && touched.NewPassword ? (
                                    <div className="fw-bold text-danger">{errors.NewPassword}</div>
                                ) : null}
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="ConfirmPassword" className="fw-bold">Confirm-Password:</label>
                                <Field name="ConfirmPassword" type="password" className="form-control py-2 mt-2" placeholder="Input confirm password" required/>
                                {errors.ConfirmPassword && touched.ConfirmPassword ? (
                                    <div className="fw-bold text-danger">{errors.ConfirmPassword}</div>
                                ) : null}
                            </div>
                            <div className="d-flex justify-content-end mt-3">
                                <Button type="submit" variant="contained" color="primary" startIcon={<RecyclingIcon />}>CHANGE NOW</Button>
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

const RegisterValidateSchema = Yup.object().shape({
    FullName: Yup.string()
      .min(6,'FullName must be at least 3 characters')  
      .max(50, 'FullName maximum 50 characters')
      .required('Please enter FullName.'),
    Email: Yup.string()
      .email('Invalid Email format')
      .required('Please enter Email.'),
    PhoneNumber: Yup.string()
      .min(9,'PhoneNumber must be > 9')
      .max(13,'PhoneNumber must be < 13')
      .required('Please enter PhoneNumber.'),
});

const ChangePWValidateSchema = Yup.object().shape({
    NewPassword: Yup.string()
    .min(6,'Password must be > 6')  
    .max(50, 'Password maximum 50 characters')
    .required('Please enter Password.'),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref('NewPassword'), undefined], 'NewPassword must match') // Check if it matches the 'password' field
    .min(6,'Password must be > 6')  
    .max(50, 'Password maximum 50 characters')
    .required('Please enter ConfirmPassword.'),
});

interface UpdateUserFormValues {
    FullName: string;
    Role: string;
    Email: string;
    PhoneNumber: string;
}

interface ChangePWFormValues {
    OldPassword: string;
    NewPassword: string;
    ConfirmPassword: string;
}