'use client'
import { Button } from "@mui/material";
import React from "react";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { FormikProps } from "formik";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { STATUS_CODE_ERROR, STATUS_CODE_OK, USER_COOKIE } from "@/common/Constant";
export default function Page (){
    const formikRef = React.useRef<FormikProps<RegisterFormValues>>(null);
    const router = useRouter();
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])

    async function registerUser(username: string, email: string, password: string) {
        
    }

    const handleSubmitRegister = async (values : RegisterFormValues) => {
        // const result = await ApiRegisterUser(values.username,  values.email, values.password);
        // if(result?.code==STATUS_CODE_OK){
        //     setCookieUser(USER_COOKIE, result.data, {path: "/"});
        //     router.push("/");
        // }
        // else if(result?.code==STATUS_CODE_ERROR){
        //     alert(result.message);
        // }
        // else {
        //     alert("Sign up failed!");
        // }
    }
    
    return(
        <div className="d-flex justify-content-center row mt-5">
        <div className="mt-5 col-12 col-sm-12 col-md-3">
            <h2 className="text-center">SIGN UP</h2>
            <Formik 
            initialValues={{
                username: '',
                email: '',
                password: '',
                confirm_password: ''
            }}
            validationSchema={RegisterValidateSchema}
            onSubmit={values=>handleSubmitRegister(values)}
            innerRef={formikRef}>
                {({ errors, touched }) => (
                <Form>
                    <div className="form-group">
                        <Field name="username" className="form-control py-2" placeholder="Enter your username" required/>
                        {errors.username && touched.username ? (
                            <div className="fw-bold text-danger">{errors.username}</div>
                        ) : null}
                    </div>
                    <div className="form-group mt-2">
                        <Field name="email" type="email" className="form-control py-2" placeholder="Enter your email" required />
                        {errors.email && touched.email ? (
                            <div className="fw-bold text-danger">{errors.email}</div>
                        ) : null}
                    </div>
                    <div className="form-group mt-2">
                        <Field name="password" type="password" className="form-control py-2" placeholder="Enter your password" required/>
                        {errors.password && touched.password ? (
                            <div className="fw-bold text-danger">{errors.password}</div>
                        ) : null}
                    </div>
                    <div className="form-group mt-2">
                        <Field name="confirm_password" type="password" className="form-control py-2" placeholder="Enter confirm password" required/>
                        {errors.confirm_password && touched.confirm_password ? (
                            <div className="fw-bold text-danger">{errors.confirm_password}</div>
                        ) : null}
                    </div>
                    <button className="btn btn-danger mt-3 w-100">REGISTER NOW</button>
                </Form>
            )}
            </Formik>
            <div className="mt-3 d-flex justify-content-center">
                <Link href="/login" className="text-decoration-underline text-primary">Have an account, login now?</Link>
            </div>

        </div>
    </div>
    );
}

const RegisterValidateSchema = Yup.object().shape({
    username: Yup.string()
      .min(6,'username must be at least 3 characters')  
      .max(50, 'username maximum 50 characters')
      .required('Please enter username.'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Please enter username.'),
    password: Yup.string()
      .min(6,'password must be > 6')  
      .max(50, 'password maximum 50 characters')
      .required('Please enter password.'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match') // Check if it matches the 'password' field
      .min(6,'password must be > 6')  
      .max(50, 'password maximum 50 characters')
      .required('Please enter password.'),
});

interface RegisterFormValues {
    username: string;
    email: string;
    password: string;
    confirm_password: string
}

