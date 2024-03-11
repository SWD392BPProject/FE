'use client'
import Image from "next/image";
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, Button, TextField, ThemeProvider } from "@mui/material";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import * as ColorUtil from "@/common/ColorUtil";
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import { UserInfoCookie, Option, Package, User } from "@/types";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import {PACKAGE_TYPE_LIST, PARTY_TYPE_LIST, PUBLIC_IMAGE_UPLOAD, ROLE_HOST, ROLE_USER, STATUS_CODE_ERROR, STATUS_CODE_OK, USER_COOKIE } from "@/common/Constant";
import { ChangeEvent } from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import React from "react";
import { ApiCreateParty } from "@/service/PartyService";
import { ApiCreateRoom } from "@/service/RoomService";
import { ApiCreatePackage, ApiGetPackageByID } from "@/service/PackageService";
import { ApiGetUserByID, ApiUpdateUserByID } from "@/service/UserService";

type Params = {
    params: {
        id: string;
    }
}
export default function Page ({ params } : Params){
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const router = useRouter()
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [optionType,setOptionType] = React.useState<Option[] | null>(null);
    const [listType, setListType] = React.useState<string[] | null>(null);
    const [optionTypeSelected,setOptionTypeSelected] = React.useState<Option[] | null>(null);
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(()=>{
        fetchUserByID(params.id);
    },[])

    async function fetchUserByID(id: string){
        const result = await ApiGetUserByID(id);
        if(result && result.code == STATUS_CODE_OK){
            const userData = result.data as User;
            setUser(userData);
        }
    }

    const handleSubmitUser = async (values : UserFormValues) => {
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            var result = await ApiUpdateUserByID(values.Email, values.FullName, values.PhoneNumber, null, params.id, values.NewPassword);
            if(result?.code==STATUS_CODE_OK){
                alert("Edit user successfully!");
            }else if(result?.code==STATUS_CODE_ERROR){
                alert(result?.message);
            }else{
                alert("Edit user failed!");
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
                {user && (
                <Formik 
                    initialValues={{
                        FullName: user.fullName,
                        Email: user.email,
                        PhoneNumber: user.phoneNumber,
                        Role: user.role,
                        NewPassword: '',
                    }}
                    validationSchema={PartyValidateSchema}
                    onSubmit={values=>handleSubmitUser(values)}>
                        {({ errors, setFieldValue, touched }) => (
                        <Form>
                            <div className="row d-flex justify-content-center">
                                {/* LEFT FORM */}
                                <div className="col-12 col-sm-12 col-md-6">
                                    <h1 className="fw-bold text-primary">USER <span className="text-dark">EDIT</span></h1>
                                    <div className="form-group mt-2">
                                        <label className="fw-bold" htmlFor="FullName">Full Name: </label>
                                        <Field type="text" name="FullName" className="form-control" required/>
                                        {errors.FullName && touched.FullName ? (
                                            <div className="fw-bold text-danger">{errors.FullName}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mt-2">
                                        <label className="fw-bold" htmlFor="Email">Email: </label>
                                        <Field type="email" name="Email" className="form-control" required/>
                                        {errors.Email && touched.Email ? (
                                            <div className="fw-bold text-danger">{errors.Email}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mt-2">
                                        <label className="fw-bold" htmlFor="PhoneNumber">Phone Number: </label>
                                        <Field as="textarea" name="PhoneNumber" className="form-control" rows={8}></Field>
                                        {errors.PhoneNumber && touched.PhoneNumber ? (
                                            <div className="fw-bold text-danger">{errors.PhoneNumber}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mt-2">
                                        <label className="fw-bold" htmlFor="Role">Role: </label>
                                        <Field as="select" className="form-select" name="Role">
                                            <option value={ROLE_USER}>User</option>
                                            <option value={ROLE_HOST}>Host party</option>
                                        </Field>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label className="fw-bold" htmlFor="NewPassword">New-Password: </label>
                                        <Field type="password" name="NewPassword" className="form-control"></Field>
                                        {errors.NewPassword && touched.NewPassword ? (
                                            <div className="fw-bold text-danger">{errors.NewPassword}</div>
                                        ) : null}
                                    </div>
                                    <div className="my-4">
                                        <Button type="submit" variant="contained" startIcon={<AddIcon />} color="primary">
                                            Save
                                        </Button>
                                        <Link href="/admin/users" className="ms-2">
                                            <ThemeProvider theme={ColorUtil.ColorGray}>
                                                <Button variant="contained" color="primary">back</Button>
                                            </ThemeProvider>
                                        </Link>
                                    </div>
                                </div>
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
    // PackageName: Yup.string()
    //   .min(3,'PartyName name must be at least 3 characters')  
    //   .max(255, 'PartyName maximum 255 characters')
    //   .required('Please enter PartyName.'),
    // Price: Yup.number()
    //   .min(100000,'Price must be at least 100000')  
    //   .max(1000000000, 'Price maximum 1000000000')
    //   .required('Please enter Price.'),
});

interface UserFormValues {
    FullName: string;
    Email: string;
    PhoneNumber: string;
    Role: string;
    NewPassword: string;
}