import Image from "next/image";
import React from "react";
export default function FooterCommon(){
    return(
        <div>
           {/* <!-- CỬA HÀNG CỦA CHÚNG TÔI --> */}
        <div className="row d-flex justify-content-center bg-graylight">
          <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
              <span className="fs-24 my-3">Cửa hàng của chúng tôi</span>
              <div className="row bg-white border-r-gray-1 mt-3 m-0">
                <div className="col-12 col-sm-12 col-md-6 p-5">
                  <h4>Gstore Đồng Nai</h4>
                  <p>Địa chỉ: 453 Ấp 3, xã Thừa Đức, huyện Cẩm Mỹ, tỉnh Đồng Nai</p>
                  <p>Thứ 2 - Thứ 7: 8Am - 10PM</p>
                  <p>Chủ nhật: Liên hệ để đặt hàng</p>
                  <p>SĐT + Zalo: 0968900475 - (028) 02 02 776</p>
                </div>
                <div className="col-12 col-sm-12 col-md-6">
                  <Image alt={""} width={400} height={400} src="/img/MY_STORE.png" style={{width: '100%', height: 400}} />
                </div>
              </div>
          </div>
        </div>

        {/* <!-- TOP HEADER --> */}
        <div className="row d-flex justify-content-center bg-danger mt-5">
          <div className="col-12 col-sm-12 col-md-9 my-2 d-flex justify-content-center my-3">
              <span className="text-white">© 2024 G.store Live Well. POS and Ecommerce by Shopify</span>
          </div>
        </div>
        </div>
    );
}