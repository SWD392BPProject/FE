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
import { ApiLoginUser, ApiRegisterUser } from "@/service/UserService";
import { UserInfoCookie } from "@/types";
export default function Page (){
    const formikRef = React.useRef<FormikProps<LoginFormValues>>(null);
    const router = useRouter();
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])

    React.useEffect(()=> {
        removeCookieUser(USER_COOKIE, {path: "/"});
    }, []);

    const handleSubmitLogin = async (values : LoginFormValues) => {
        const result = await ApiLoginUser(values.Email, values.Password);
        if(result?.code==STATUS_CODE_OK){
            alert("Login successfully!");
            setCookieUser(USER_COOKIE, result.data, {path: "/"});
            const userInfoCookie = result.data as UserInfoCookie;
            if(userInfoCookie.role == "User"){
                router.push("/");
            }else if(userInfoCookie.role == "Host"){
                router.push("/host/party");
            }else if(userInfoCookie.role == "Admin"){
                router.push("/admin/dashboard");
            }
        }
        else if(result?.code==STATUS_CODE_ERROR){
            alert(result.message);
        }
        else {
            alert("Login failed!");
        }
    }
    
    return(
        <div className="d-flex justify-content-center row mt-5">
        <div className="mt-5 col-12 col-sm-12 col-md-6">
            <h1 className="fw-bold mb-3 text-danger">LOGIN <span className="text-dark">NOW</span></h1>
            <Formik 
            initialValues={{
                Email: '',
                Password: '',
            }}
            validationSchema={RegisterValidateSchema}
            onSubmit={values=>handleSubmitLogin(values)}
            innerRef={formikRef}>
                {({ errors, touched }) => (
                <Form>
                    <div className="form-group mt-2">
                        <label htmlFor="Email" className="fw-bold">Email:</label>
                        <Field name="Email" type="email" className="form-control py-2 mt-2" placeholder="Input your Email" required/>
                        {errors.Email && touched.Email ? (
                            <div className="fw-bold text-danger">{errors.Email}</div>
                        ) : null}
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="Password" className="fw-bold">Password:</label>
                        <Field name="Password" type="password" className="form-control py-2 mt-2" placeholder="Input your password" required/>
                        {errors.Password && touched.Password ? (
                            <div className="fw-bold text-danger">{errors.Password}</div>
                        ) : null}
                    </div>
                    <button type="submit" className="btn btn-danger mt-3 w-100">LOGIN</button>
                </Form>
            )}
            </Formik>
            <div className="mt-3 d-flex justify-content-center">
                <Link href="/register" className="text-decoration-underline text-primary">Do not have account, sign up now?</Link>
            </div>

        </div>
    </div>
    );
}

const RegisterValidateSchema = Yup.object().shape({
    Email: Yup.string()
      .email('Invalid Email format')
      .required('Please enter Email.'),
    Password: Yup.string()
      .min(6,'Password must be > 6')  
      .max(50, 'Password maximum 50 characters')
      .required('Please enter Password.'),
});

interface LoginFormValues {
    Email: string;
    Password: string;
}

