'use client'

import { Button, ThemeProvider } from "@mui/material";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import * as ColorUtil from "@/common/ColorUtil";
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import { UserInfoCookie } from "@/types";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { USER_COOKIE } from "@/common/Constant";
import { ChangeEvent } from "react";

export default function Page (){
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const router = useRouter()
    
    const handleSubmitTag = async (values : TagFormValues) => {
        // const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        //     if(userInfoCookie){
        //     var result = await ApiCreateTag(values.tag_name, values.url, values.title, values.description, values.type, userInfoCookie.token);
        //     if(result?.code==STATUS_CODE_OK){
        //         alert("Create tag successfully!");
        //     }else if(result?.code==STATUS_CODE_ERROR){
        //         alert(result?.message);
        //     }else{
        //         alert("Create tag failed!");
        //     }
        // }
    }
    return(
        <div className="row d-flex justify-content-center bg-graylight">
            <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
                <h1 className="fw-bold text-danger">PARTY <span className="text-dark">CREATE</span></h1>
                <Formik 
                    initialValues={{
                        tag_name: '',
                        title: '',
                        description: '',
                        type: 'video',
                        url: '',
                    }}
                    validationSchema={TagValidateSchema}
                    onSubmit={values=>handleSubmitTag(values)}>
                        {({ errors, setFieldValue, touched }) => (
                        <Form>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 form-group mt-2">
                                    <label htmlFor="tag_name">Tag Name: </label>
                                    <Field type="text" name="tag_name" className="form-control" placeholder="ex: hot asia videos" required/>
                                    {errors.tag_name && touched.tag_name ? (
                                        <div className="fw-bold text-danger">{errors.tag_name}</div>
                                    ) : null}
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 form-group mt-2">
                                    <label htmlFor="url">Tag URL: </label>
                                    <Field type="text" name="url" className="form-control" placeholder="ex: hot-asia-videos" required />
                                    {errors.url && touched.url ? (
                                        <div className="fw-bold text-danger">{errors.url}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="tag_name">Type: </label>
                                <Field as="select" className="form-select" name="type">
                                        <option value="video">Video</option>
                                        <option value="blog">Blog</option>
                                </Field>                                    
                                {errors.type && touched.type ? (
                                    <div className="fw-bold text-danger">{errors.type}</div>
                                ) : null}
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="title">Title Meta: </label>
                                <Field type="text" name="title" className="form-control" />
                                {errors.title && touched.title ? (
                                    <div className="fw-bold text-danger">{errors.title}</div>
                                ) : null}
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="description">Description Meta: </label>
                                <Field as="textarea" name="description" className="form-control" rows={5}></Field>
                                {errors.description && touched.description ? (
                                    <div className="fw-bold text-danger">{errors.description}</div>
                                ) : null}
                            </div>
                            <div className="mt-4">
                                <Button type="submit" variant="contained" startIcon={<AddIcon />} color="error">
                                    Register
                                </Button>
                                <Link href="/admin/tag-list" className="ms-2">
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



const TagValidateSchema = Yup.object().shape({
    tag_name: Yup.string()
      .min(3,'Tag name must be at least 3 characters')  
      .max(255, 'Tag name maximum 255 characters')
      .required('Please enter tag name.'),
      url: Yup.string()
      .min(3,'URL must be at least 3 characters')  
      .max(255, 'URL name maximum 255 characters')
      .required('Please enter URL.'),
});

interface TagFormValues {
    tag_name: string;
    url: string;
    type: string;
    title: string;
    description: string;
}