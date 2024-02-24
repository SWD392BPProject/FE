'use client'

import Link from "next/link";

export default function Page (){
    return(
        <div className="row d-flex justify-content-center bg-graylight">
            <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
                <h1 className="fw-bold text-danger">PARTY <span className="text-dark">MANAGEMENT</span></h1>
                <Link href="/host/party/create"><button className="btn btn-danger">+ ADD PARTY</button></Link>
                {/* <!-- TABLE --> */}
                <div className="row p-0 m-0 my-3">
                    <div className="col-12 col-sm-12 col-md-12 p-0 m-0">
                    <table className="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th>Num</th>
                            <th>Title</th>
                            <th>URL</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {/* { videos && videos.length > 0 && videos.map((video, index)=>(
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{video.title}</td>
                                    <td><Link href={'/'+video.url} className="text-decoration-underline text-primary">{video.url}</Link></td>
                                    <td>{video.category_name}</td>
                                    <td>
                                        <Link href={"/admin/video-edit/" + video._id} className="me-3"><BorderColorIcon /></Link>
                                        <DeleteIcon className="cursor-pointer text-danger" onClick={()=>handleDeleteClick(video._id, video.title)}/>
                                    </td>
                                </tr>
                            )) || (
                                <tr>
                                    <td colSpan={5}>Data is empty</td>
                                </tr>
                            )} */}
                        
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

