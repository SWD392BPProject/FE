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
import { STATUS_CODE_ERROR, STATUS_CODE_OK, USER_COOKIE } from "@/common/Constant";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { ApiRegisterUser } from "@/service/UserService";
export default function Page (){
    const formikRef = React.useRef<FormikProps<RegisterFormValues>>(null);
    const router = useRouter();
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const [thumbnailImage, setThumbnailImage] = React.useState<File | null>(null);
    const [thumbnailImageSrc, setThumbnailImageSrc] = React.useState<string | undefined>(undefined);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleAddPhotoClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleSubmitRegister = async (values : RegisterFormValues) => {
        const result = await ApiRegisterUser(values.FullName, values.Email, values.Password, values.PhoneNumber, values.Role, thumbnailImage);
        console.log(result);
        if(result?.code==STATUS_CODE_OK){
            alert("Create an account successfully!");
            setCookieUser(USER_COOKIE, result.data, {path: "/"});
            router.push("/");
        }
        else if(result?.code==STATUS_CODE_ERROR){
            alert(result.message);
        }
        else {
            alert("Sign up failed!");
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

    return(
        <div className="d-flex justify-content-center row mt-5">
        <div className="mt-5 col-12 col-sm-12 col-md-6">
            <h1 className="fw-bold mb-3 text-primary">CREATE AN <span className="text-dark">ACCOUNT</span></h1>
            <Formik 
            initialValues={{
                Role: 'User',
                FullName: '',
                PhoneNumber: '',
                Email: '',
                Password: '',
                ConfirmPassword: ''
            }}
            validationSchema={RegisterValidateSchema}
            onSubmit={values=>handleSubmitRegister(values)}
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
                                    ) || (
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
                        <Field name="PhoneNumber" type="number" className="form-control py-2 mt-2" placeholder="Input your phone number" required/>
                        {errors.PhoneNumber && touched.PhoneNumber ? (
                            <div className="fw-bold text-danger">{errors.PhoneNumber}</div>
                        ) : null}
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="Password" className="fw-bold">Password:</label>
                        <Field name="Password" type="password" className="form-control py-2 mt-2" placeholder="Input your password" required/>
                        {errors.Password && touched.Password ? (
                            <div className="fw-bold text-danger">{errors.Password}</div>
                        ) : null}
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="ConfirmPassword" className="fw-bold">Confirm-Password:</label>
                        <Field name="ConfirmPassword" type="password" className="form-control py-2 mt-2" placeholder="Input confirm password" required/>
                        {errors.ConfirmPassword && touched.ConfirmPassword ? (
                            <div className="fw-bold text-danger">{errors.ConfirmPassword}</div>
                        ) : null}
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="Role" className="fw-bold">Register as:</label>
                        <div className="d-flex align-items-center mt-2">
                            <div role="group" aria-labelledby="my-radio-group">
                                <label>
                                <Field type="radio" className="form-check-input me-2" name="Role" value="User"/>
                                    Customer
                                </label>
                                <label className="ms-2">
                                <Field type="radio" className="form-check-input me-2" name="Role" value="Host" />
                                    Host Party
                                </label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3 w-100">REGISTER NOW</button>
                </Form>
            )}
            </Formik>
            <div className="mt-3 d-flex justify-content-center mb-4">
                <Link href="/login" className="text-decoration-underline text-primary">Have an account, login now?</Link>
            </div>

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
    Password: Yup.string()
      .min(6,'Password must be > 6')  
      .max(50, 'Password maximum 50 characters')
      .required('Please enter Password.'),
    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref('Password'), undefined], 'Passwords must match') // Check if it matches the 'password' field
      .min(6,'Password must be > 6')  
      .max(50, 'Password maximum 50 characters')
      .required('Please enter ConfirmPassword.'),
});

interface RegisterFormValues {
    FullName: string;
    Role: string;
    Email: string;
    PhoneNumber: string;
    Password: string;
    ConfirmPassword: string
}

