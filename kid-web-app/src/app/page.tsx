'use client';
import Image from "next/image";
import styles from "./page.module.css";
import FooterCommon from "@/component/FooterCommon";
import { ApiGetLatestParty, ApiGetTopMonthParty } from "@/service/PartyService";
import { PARTY_TYPE_LIST, PUBLIC_IMAGE_UPLOAD, STATUS_CODE_OK, TABLE_DATA_SIZE } from "@/common/Constant";
import React from "react";
import { Party } from "@/types";
import { GetLabelOfPartyType } from "@/util/TextUtil";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [carouselParties, setCarouselParties] = React.useState<Party[] | null>(null);
  const [topMonthPaties, setTopMonthPaties] = React.useState<Party[] | null>(null);
  const router = useRouter();
  React.useEffect(()=>{
    fetchLatestParty(1);
    fetchTopMonthParty(1);
  },[]);

  async function fetchLatestParty(page: number){
    const result = await ApiGetLatestParty(page, 4);
    if(result && result.code == STATUS_CODE_OK){
        setCarouselParties(result.data);
    }
  }

  async function fetchTopMonthParty(page: number){
    const result = await ApiGetTopMonthParty(page, 8);
    if(result && result.code == STATUS_CODE_OK){
      setTopMonthPaties(result.data);
    }
  }


  function handleSubmitSearch(values: { DateBooking: string; People: string; Type: string; }): any {
    router.push(`/search?DateBooking=${values.DateBooking}&People=${values.People}&Type=${values.Type}&TypeSearch=0`);
  }

  return (<div>
    {/* // <!-- SẢN PHẨM BÁN CHẠY --> */}
    <div className="row d-flex justify-content-center bg-graylight">

      <div className="col-12 col-sm-12 col-md-9 my-2">
        {/* BOOKING SEARCH */}
        <Formik 
          initialValues={{
              People: '',
              DateBooking: '',
              Type: PARTY_TYPE_LIST[0].value,
          }}
          onSubmit={values=>handleSubmitSearch(values)}>
              {({ errors, setFieldValue, touched }) => (
        <Form>
          <div className="row">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-10 row">
                <div className="col-12 col-sm-12 col-md-6 form-group p-0 pt-2">
                    <Field as="select" className="form-select py-3" name="Type">
                        {PARTY_TYPE_LIST.map((row, index)=>(
                            <option key={index} value={row.value}>{row.label}</option>
                        ))}
                    </Field>
                </div>
                <div className="col-12 col-sm-12 col-md-6 form-group p-0 pt-2">
                  <Field type="number" name="People" className="form-control py-3" placeholder="Số người" />
                </div>
                <div className="col-12 col-sm-12 col-md-12 form-group p-0 pt-2">
                    <Field type="date" name="DateBooking" className="form-control py-3" placeholder="Ngày book" />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-2 row pt-2">
                <button className="btn btn-primary w-100 h-100 ms-0 ms-sm-0 ms-md-2">BOOKING</button>
              </div>
            </div>
          </div>
        </Form>
        )}
      </Formik>
      </div>

      <div className="col-12 col-sm-12 col-md-9 my-2 bg-white">
        <div className='row'>
          {/* LEFT CAROUSEL */}
          <div className='col-12 col-sm-12 col-md-12 col-lg-8'>

            {/* <!-- Carousel --> */}
            <div id="demo" className="carousel slide" data-bs-ride="carousel" >
                {/* <!-- Indicators/dots --> */}
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="btn-circle-light active"></button>
                  <button type="button" data-bs-target="#demo" data-bs-slide-to="1" className="btn-circle-light"></button>
                  <button type="button" data-bs-target="#demo" data-bs-slide-to="2" className="btn-circle-light"></button>
                  <button type="button" data-bs-target="#demo" data-bs-slide-to="3" className="btn-circle-light"></button>
                </div>
          
                {/* <!-- The slideshow/carousel --> */}
                <div className="d-flex align-items-center mb-3 ps-3">
                  <div className="carousel-inner py-5 m-0">
                      {carouselParties && carouselParties.length > 3 && (
                        <>
                          <div className="carousel-item active position-relative">
                            <Image src={PUBLIC_IMAGE_UPLOAD + carouselParties[0].image} alt={carouselParties[0].partyName} width={1000} height={1000} className="image-fit" style={{width:'100%', height: 400}} /> 
                            <div className="position-absolute carousel-title w-100">
                                <h3 className="text-white">{carouselParties[0].partyName}</h3>
                                <h5 className="text-white">{carouselParties[0].address} - {GetLabelOfPartyType(carouselParties[0].type)}</h5>
                            </div>
                          </div>
                          <div className="carousel-item position-relative">
                            <Image src={PUBLIC_IMAGE_UPLOAD + carouselParties[1].image} alt={carouselParties[1].partyName} width={1000} height={1000} className="image-fit" style={{width:'100%', height: 400}} /> 
                            <div className="position-absolute carousel-title w-100">
                                <h3 className="text-white">{carouselParties[1].partyName}</h3>
                                <h5 className="text-white">{carouselParties[1].address} - {GetLabelOfPartyType(carouselParties[1].type)}</h5>
                            </div>
                          </div>
                          <div className="carousel-item position-relative">
                            <Image src={PUBLIC_IMAGE_UPLOAD + carouselParties[2].image} alt={carouselParties[2].partyName} width={1000} height={1000} className="image-fit" style={{width:'100%', height: 400}} /> 
                            <div className="position-absolute carousel-title w-100">
                                <h3 className="text-white">{carouselParties[2].partyName}</h3>
                                <h5 className="text-white">{carouselParties[2].address} - {GetLabelOfPartyType(carouselParties[2].type)}</h5>
                            </div>
                          </div>
                          <div className="carousel-item position-relative">
                            <Image src={PUBLIC_IMAGE_UPLOAD + carouselParties[3].image} alt={carouselParties[3].partyName} width={1000} height={1000} className="image-fit" style={{width:'100%', height: 400}} /> 
                            <div className="position-absolute carousel-title w-100">
                                <h3 className="text-white">{carouselParties[3].partyName}</h3>
                                <h5 className="text-white">{carouselParties[3].address} - {GetLabelOfPartyType(carouselParties[3].type)}</h5>
                            </div>
                          </div>
                        </>
                      )}
                  </div>
                </div>
              </div>
          </div>

          {/* RIGHT PRODUCTS */}
          <div className="col-12 col-sm-12 col-md-4">
            <div style={{marginTop:40}}></div>
            <h1 className="mt-3 fw-bold text-primary"><span className="text-dark">KID</span> BOOKING</h1>
            <p style={{textAlign: 'justify'}}>
              Thỏa sức đặt tiệc sinh nhật theo chủ đề, mời bạn bè đến vui chơi & thưởng thức những món ăn ngon, chỉ có tại <span className="fw-bold text-primary">KID BOOKING</span>
            </p>
            <p className="fw-bold">
                Liên hệ ngay: 
            </p>
            <span>Email: kidbooking-support@kidbk.com</span>
            <div>
              <button className="btn btn-primary mt-3">BOOKING NOW</button>
            </div>
           
          </div>


        </div>
        </div>

        {/* <!-- CHÍNH SÁCH --> */}
        <div className="row d-flex justify-content-center bg-white">
          <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
              <div className="d-flex justify-content-center">
                <Image alt={""} src="/img/LOGO.png" width={150} height={120}/>
              </div>
              <div className="d-flex justify-content-center">
                <span className="fs-24 my-3 text-center"><span className="fw-bold text-primary">KID BOOKING</span> CÓ GÌ HẤP DẪN</span>
              </div>
              <div className="text-center">
                <span>Là chuỗi trung tâm đặt tiệc lớn nhất cả nước với hệ thống booking hiện đại,</span><br/>
                <span>dịch vụ tận tình mang lại trải nghiệm sang trọng cho người dùng.</span>
              </div>
              <div className="row border-r-gray-1 mt-3 m-0 text-center fw-bold">
                <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3">
                  <Image alt={""} src="/img/KHUYEN-MAI.png" width={500} height={500} className="card-policy-image"/>
                  <br/>
                  <span>Chương trình khuyến mãi lớn</span>
                </div>
                <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3">
                  <Image alt={""} src="/img/CHANGE.jpg" width={500} height={500} className="card-policy-image"/>
                  <br/>
                  <span>Thay đổi, hủy bỏ dịch vụ trong vòng 3 tuần</span>
                </div>
                <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3">
                  <Image alt={""} src="/img/24H.jpg" width={500} height={500} className="card-policy-image"/>
                  <br/>
                  <span>Phản Hồi Trong Vòng 24H</span>
                </div>
                <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3">
                  <Image alt={""} src="/img/SECURITY.jpg" width={500} height={500} className="card-policy-image"/>
                  <br/>
                  <span>Bảo Mật Thông Tin Cá Nhân</span>
                </div>
              </div>
          </div>
        </div>


        {/* <!-- PARTY MỚI NHẤT --> */}
        <div className="row d-flex justify-content-center bg-graylight">
          <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
              <span className="fs-24 my-3">TOP VIEWED IN MONTH</span>
              <div className="row bg-white border-r-gray-1 mt-3 m-0 py-2" style={{borderRadius:10}}>
                  {topMonthPaties && topMonthPaties.map((row, index)=>(
                    <Link href={"/detail/"+row.partyID} key={index} className="col-6 col-sm-6 col-md-3 text-hover-lightblue pt-3">
                        <Image alt={""} src={PUBLIC_IMAGE_UPLOAD + row.image} width={500} height={500} style={{width:'100%',height:200,borderRadius:15}}/>
                        <span>{row.partyName}</span>
                    </Link>
                  ))}
              </div>
          </div>
        </div>


        {/* <!-- CỬA HÀNG CỦA CHÚNG TÔI --> */}
        <div className="row d-flex justify-content-center bg-graylight">
          <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
              <span className="fs-24 my-3">MY STORE</span>
              <div className="row bg-white border-r-gray-1 mt-3 m-0" style={{borderRadius:10}}>
                <div className="col-12 col-sm-12 col-md-6 p-3">
                  <h4><span className="text-primary fw-bold">KID BOOKING</span> TP.HCM</h4>
                  <p className="mt-4"><b>Địa chỉ:</b> 44/1 Lê Lai, Quận 7, Tp.HCM</p>
                  <p><b>Thứ 2 - Thứ 7:</b> 8Am - 10PM</p>
                  <p><b>Chủ nhật:</b> Liên hệ để đặt hàng</p>
                  <p><b>SĐT + Zalo:</b> 0968900475 - (028) 02 02 776</p>
                </div>
                <div className="col-12 col-sm-12 col-md-6 p-3">
                  <Image alt={""} width={400} height={400} src="/img/Workshop_1.jpg" style={{width: '100%', height: 300, borderRadius:15}} />
                </div>
              </div>
          </div>
        </div>
        
  </div>
  </div>
  )
}
