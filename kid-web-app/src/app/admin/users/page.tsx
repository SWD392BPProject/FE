'use client'
import Image from "next/image";
import { ROLE_HOST, ROLE_USER, STATUS_ACTIVE, STATUS_CODE_OK, STATUS_INACTIVE, TABLE_DATA_SIZE, USER_COOKIE } from "@/common/Constant";
import { ApiGetLatestParty } from "@/service/PartyService";
import { Package, Party, Room, User, UserInfoCookie } from "@/types";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";
import { FormatVND, GetLabelOfPackageType, GetLabelOfPartyType } from "@/util/TextUtil";
import PaginationBar from "@/component/PaginationBar";
import { ApiGetLatestRoom } from "@/service/RoomService";
import { ApiDeletePackageByID, ApiGetLatestPackage } from "@/service/PackageService";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { ApiChangeUserStatus, ApiGetUserByRole, ApiSearchUser } from "@/service/UserService";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';

export default function Page (){
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const [packages, setPackages] = React.useState<Package[] | null>(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);
    const [users, setUsers] = React.useState<User[] | null>(null);
    const [roleSelected, setRoleSelected] = React.useState(ROLE_USER);

    React.useEffect(()=>{
        fetchUserByRole(1);
    },[]);

    async function fetchUserByRole(page: number){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiGetUserByRole(roleSelected, page, TABLE_DATA_SIZE);
            if(result && result.code == STATUS_CODE_OK){
                setUsers(result.data);
                const totalPage = result.totalPage ?? 1;
                setTotalPage(totalPage);
                window.scrollTo(0, 0);
            }
        }
    }

    const handleChangePage = (num : number) => {
        setCurrentPage(num);
        fetchUserByRole(num);
    }

    async function handleClickDeleteById(id: string){
        const resultCf = confirm("Are you sure BAN this user?")
        if(resultCf){
            const result = await ApiChangeUserStatus(id, STATUS_INACTIVE);
            if(result && result.code == STATUS_CODE_OK){
                alert("BAN user successfully!");
                fetchUserByRole(currentPage);
            }else{
                alert("BAN user failed!");
            }
        }
    }

    async function handleClickUnBlockById(id: string){
        const resultCf = confirm("Are you sure UNBLOCK this user?")
        if(resultCf){
            const result = await ApiChangeUserStatus(id, STATUS_ACTIVE);
            if(result && result.code == STATUS_CODE_OK){
                alert("Unblock user successfully!");
                fetchUserByRole(currentPage);
            }else{
                alert("Unblock user failed!");
            }
        }
    }

    const handleSubmitSearchUser = async (values : SearchFormValues) => {
        var result = await ApiSearchUser(values.Keyword, values.Role, 1, TABLE_DATA_SIZE);
        if(result?.code==STATUS_CODE_OK){
            setUsers(result.data);
        }else {
            alert("An Unknown error occur.");
        }
    }

    return(
        <div className="row d-flex justify-content-center bg-graylight">
            <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
                <h1 className="fw-bold text-primary">USER <span className="text-dark">MANAGEMENT</span></h1>
                <Formik 
                    initialValues={{
                        Keyword: '',
                        Role: ROLE_USER,
                    }}
                    onSubmit={values=>handleSubmitSearchUser(values)}>
                        {({ errors, setFieldValue, touched }) => (
                    <Form>
                        <div className="row mt-3">
                            <div className="form-group d-flex align-items-center col-12 col-sm-12 col-md-7">
                                <Field name="Keyword" className="form-control" placeholder="Tìm kiếm" />
                                <Field as="select" className="form-select w-170 ms-1" name="Role">
                                    <option value={ROLE_USER}>User</option>
                                    <option value={ROLE_HOST}>Host party</option>
                                </Field>
                                <button type="submit" className="btn btn-primary ms-1 w-120">Seach</button>
                            </div>
                        </div>
                    </Form>
                    )}
                </Formik>
                
                {/* <!-- TABLE --> */}
                <div className="row p-0 m-0 my-3">
                    <div className="col-12 col-sm-12 col-md-12 p-0 m-0">
                    <table className="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th className="w-20">FullName</th>
                            <th className="w-20">Image</th>
                            <th className="w-20">Email</th>
                            <th className="w-20">Phone Number</th>
                            <th className="w-20">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            { users && users.length > 0 && users.map((row, index)=>(
                                <tr key={index} className={row.status == STATUS_INACTIVE && `s-text` || ''}>
                                    <td>{row.fullName}</td>
                                    <td>
                                        <div style={{height:150}}>
                                            <Image alt={"No avatar image"} width={400} height={400} src={"/ImageUpload/"+row.image} className="image-fit" style={{width: '100%', height: 150}} />
                                        </div>
                                    </td>
                                    <td>{row.email}</td>
                                    <td>{row.phoneNumber}</td>
                                    <td>
                                        <Link href={"/admin/users/edit/" + row.userID} className="text-decoration-underline text-primary me-2"><Button variant="contained" color="primary" startIcon={<EditIcon />}>Edit</Button></Link>
                                        {row.status == STATUS_ACTIVE && (
                                            <Button variant="contained" className="bg-dark" startIcon={<DeleteIcon />} onClick={()=>handleClickDeleteById(row.userID.toString())}>BAN</Button>
                                        ) || (
                                            <Button variant="contained" className="bg-success" startIcon={<DeleteIcon />} onClick={()=>handleClickUnBlockById(row.userID.toString())}>UNBLOCK</Button>
                                        )}
                                    </td>
                                </tr>
                            )) || (
                                <tr>
                                    <td colSpan={5}>Data is empty</td>
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
        </div>
    );
}

interface SearchFormValues {
    Keyword: string;
    Role: string;
}