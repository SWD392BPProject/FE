import Image from "next/image";
import styles from "./page.module.css";
import FooterCommon from "@/component/FooterCommon";

export default function Home() {
  return (<div>
    {/* // <!-- SẢN PHẨM BÁN CHẠY --> */}
    <div className="row d-flex justify-content-center bg-graylight">
      <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
          <span className="fs-24 my-3">Sản Phẩm Bán Chạy - HOT COMBO</span>
          <div className="row bg-white border-r-gray-1 mt-3 m-0">
            <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
              <Image alt={""} width={400} height={400} src="/img/thuoc_01.png" className="image-fit" style={{width: '100%', height: 200}} />
              <span className="text-danger fw-bold fs-24 my-2">780.000 VND</span>
              <br/>
              <span className="hover-text-red cursor-pointer">Turmilive Plus Curcumin + Piperine - Kẹo Ngậm NGHỆ HỒ TIÊU CAY MẬT ONG (24 viên) | Giảm viêm họng, ho khan. Tinh nghệ hàm lượng 100mg chống oxy hóa, chống viêm nhiễm đường hô hấp ở phổi.</span>
              <br/>
              <span className="text-success">In Stock, 251 sản phẩm</span>
            </div>
            <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
              <Image alt={""} width={400} height={400} src="/img/thuoc_02.png" className="image-fit" style={{width: '100%', height: 200}} />
              <span className="text-danger fw-bold fs-24 my-2">780.000 VND</span>
              <br/>
              <span className="hover-text-red cursor-pointer">Turmilive Plus Curcumin + Piperine - Kẹo Ngậm NGHỆ HỒ TIÊU CAY MẬT ONG (24 viên) | Giảm viêm họng, ho khan. Tinh nghệ hàm lượng 100mg chống oxy hóa, chống viêm nhiễm đường hô hấp ở phổi.</span>
              <br/>
              <span className="text-success">In Stock, 251 sản phẩm</span>
            </div>
            <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
              <Image alt={""} width={400} height={400} src="/img/thuoc_03.png" className="image-fit" style={{width: '100%', height: 200}} />
              <span className="text-danger fw-bold fs-24 my-2">780.000 VND</span>
              <br/>
              <span className="hover-text-red cursor-pointer">Turmilive Plus Curcumin + Piperine - Kẹo Ngậm NGHỆ HỒ TIÊU CAY MẬT ONG (24 viên) | Giảm viêm họng, ho khan. Tinh nghệ hàm lượng 100mg chống oxy hóa, chống viêm nhiễm đường hô hấp ở phổi.</span>
              <br/>
              <span className="text-success">In Stock, 251 sản phẩm</span>
            </div>
            <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
              <Image alt={""} width={400} height={400} src="/img/thuoc_04.png" className="image-fit" style={{width: '100%', height: 200}} />
              <span className="text-danger fw-bold fs-24 my-2">780.000 VND</span>
              <br/>
              <span className="hover-text-red cursor-pointer">Turmilive Plus Curcumin + Piperine - Kẹo Ngậm NGHỆ HỒ TIÊU CAY MẬT ONG (24 viên) | Giảm viêm họng, ho khan. Tinh nghệ hàm lượng 100mg chống oxy hóa, chống viêm nhiễm đường hô hấp ở phổi.</span>
              <br/>
              <span className="text-success">In Stock, 251 sản phẩm</span>
            </div>
            <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
              <Image alt={""} width={400} height={400} src="/img/thuoc_01.png" className="image-fit" style={{width: '100%', height: 200}} />
              <span className="text-danger fw-bold fs-24 my-2">780.000 VND</span>
              <br/>
              <span className="hover-text-red cursor-pointer">Turmilive Plus Curcumin + Piperine - Kẹo Ngậm NGHỆ HỒ TIÊU CAY MẬT ONG (24 viên) | Giảm viêm họng, ho khan. Tinh nghệ hàm lượng 100mg chống oxy hóa, chống viêm nhiễm đường hô hấp ở phổi.</span>
              <br/>
              <span className="text-success">In Stock, 251 sản phẩm</span>
            </div>
            <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
              <Image alt={""} width={400} height={400} src="/img/thuoc_02.png" className="image-fit" style={{width: '100%', height: 200}} />
              <span className="text-danger fw-bold fs-24 my-2">780.000 VND</span>
              <br/>
              <span className="hover-text-red cursor-pointer">Turmilive Plus Curcumin + Piperine - Kẹo Ngậm NGHỆ HỒ TIÊU CAY MẬT ONG (24 viên) | Giảm viêm họng, ho khan. Tinh nghệ hàm lượng 100mg chống oxy hóa, chống viêm nhiễm đường hô hấp ở phổi.</span>
              <br/>
              <span className="text-success">In Stock, 251 sản phẩm</span>
            </div>
            <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
              <Image alt={""} width={400} height={400} src="/img/thuoc_03.png" className="image-fit" style={{width: '100%', height: 200}} />
              <span className="text-danger fw-bold fs-24 my-2">780.000 VND</span>
              <br/>
              <span className="hover-text-red cursor-pointer">Turmilive Plus Curcumin + Piperine - Kẹo Ngậm NGHỆ HỒ TIÊU CAY MẬT ONG (24 viên) | Giảm viêm họng, ho khan. Tinh nghệ hàm lượng 100mg chống oxy hóa, chống viêm nhiễm đường hô hấp ở phổi.</span>
              <br/>
              <span className="text-success">In Stock, 251 sản phẩm</span>
            </div>
            <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
              <Image alt={""} width={400} height={400} src="/img/thuoc_04.png" className="image-fit" style={{width: '100%', height: 200}} />
              <span className="text-danger fw-bold fs-24 my-2">780.000 VND</span>
              <br/>
              <span className="hover-text-red cursor-pointer">Turmilive Plus Curcumin + Piperine - Kẹo Ngậm NGHỆ HỒ TIÊU CAY MẬT ONG (24 viên) | Giảm viêm họng, ho khan. Tinh nghệ hàm lượng 100mg chống oxy hóa, chống viêm nhiễm đường hô hấp ở phổi.</span>
              <br/>
              <span className="text-success">In Stock, 251 sản phẩm</span>
            </div>
          </div>
      </div>

      {/* <!-- SẢN PHẨM THẢO DƯỢC --> */}
      <div className="row d-flex justify-content-center bg-graylight">
        <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
            <span className="fs-24 my-3">Sản Phẩm Thảo Dược</span>
            <div className="row bg-white border-r-gray-1 mt-3 m-0">
              <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
                <Image alt={""} width={400} height={400} src="/img/thuoc_01.png" className="image-fit" style={{width: '100%', height: 200}} />
                <span className="text-danger fw-bold fs-24 my-2">780.000 VND</span>
                <br/>
                <span className="hover-text-red cursor-pointer">Turmilive Plus Curcumin + Piperine - Kẹo Ngậm NGHỆ HỒ TIÊU CAY MẬT ONG (24 viên) | Giảm viêm họng, ho khan. Tinh nghệ hàm lượng 100mg chống oxy hóa, chống viêm nhiễm đường hô hấp ở phổi.</span>
                <br/>
                <span className="text-success">In Stock, 251 sản phẩm</span>
              </div>
              <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
                <Image alt={""} width={400} height={400} src="/img/thuoc_02.png" className="image-fit" style={{width: '100%', height: 200}} />
                <span className="text-danger fw-bold fs-24 my-2">780.000 VND</span>
                <br/>
                <span className="hover-text-red cursor-pointer">Turmilive Plus Curcumin + Piperine - Kẹo Ngậm NGHỆ HỒ TIÊU CAY MẬT ONG (24 viên) | Giảm viêm họng, ho khan. Tinh nghệ hàm lượng 100mg chống oxy hóa, chống viêm nhiễm đường hô hấp ở phổi.</span>
                <br/>
                <span className="text-success">In Stock, 251 sản phẩm</span>
              </div>
              <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
                <Image alt={""} width={400} height={400} src="/img/thuoc_03.png" className="image-fit" style={{width: '100%', height: 200}} />
                <span className="text-danger fw-bold fs-24 my-2">780.000 VND</span>
                <br/>
                <span className="hover-text-red cursor-pointer">Turmilive Plus Curcumin + Piperine - Kẹo Ngậm NGHỆ HỒ TIÊU CAY MẬT ONG (24 viên) | Giảm viêm họng, ho khan. Tinh nghệ hàm lượng 100mg chống oxy hóa, chống viêm nhiễm đường hô hấp ở phổi.</span>
                <br/>
                <span className="text-success">In Stock, 251 sản phẩm</span>
              </div>
              <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
                <Image alt={""} width={400} height={400} src="/img/thuoc_04.png" className="image-fit" style={{width: '100%', height: 200}} />
                <span className="text-danger fw-bold fs-24 my-2">780.000 VND</span>
                <br/>
                <span className="hover-text-red cursor-pointer">Turmilive Plus Curcumin + Piperine - Kẹo Ngậm NGHỆ HỒ TIÊU CAY MẬT ONG (24 viên) | Giảm viêm họng, ho khan. Tinh nghệ hàm lượng 100mg chống oxy hóa, chống viêm nhiễm đường hô hấp ở phổi.</span>
                <br/>
                <span className="text-success">In Stock, 251 sản phẩm</span>
              </div>
              <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
                <Image alt={""} width={400} height={400} src="/img/thuoc_01.png" className="image-fit" style={{width: '100%', height: 200}} />
                <span className="text-danger fw-bold fs-24 my-2">780.000 VND</span>
                <br/>
                <span className="hover-text-red cursor-pointer">Turmilive Plus Curcumin + Piperine - Kẹo Ngậm NGHỆ HỒ TIÊU CAY MẬT ONG (24 viên) | Giảm viêm họng, ho khan. Tinh nghệ hàm lượng 100mg chống oxy hóa, chống viêm nhiễm đường hô hấp ở phổi.</span>
                <br/>
                <span className="text-success">In Stock, 251 sản phẩm</span>
              </div>
              <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
                <Image alt={""} width={400} height={400} src="/img/thuoc_02.png" className="image-fit" style={{width: '100%', height: 200}} />
                <span className="text-danger fw-bold fs-24 my-2">780.000 VND</span>
                <br/>
                <span className="hover-text-red cursor-pointer">Turmilive Plus Curcumin + Piperine - Kẹo Ngậm NGHỆ HỒ TIÊU CAY MẬT ONG (24 viên) | Giảm viêm họng, ho khan. Tinh nghệ hàm lượng 100mg chống oxy hóa, chống viêm nhiễm đường hô hấp ở phổi.</span>
                <br/>
                <span className="text-success">In Stock, 251 sản phẩm</span>
              </div>
              <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
                <Image alt={""} width={400} height={400} src="/img/thuoc_03.png" className="image-fit" style={{width: '100%', height: 200}} />
                <span className="text-danger fw-bold fs-24 my-2">780.000 VND</span>
                <br/>
                <span className="hover-text-red cursor-pointer">Turmilive Plus Curcumin + Piperine - Kẹo Ngậm NGHỆ HỒ TIÊU CAY MẬT ONG (24 viên) | Giảm viêm họng, ho khan. Tinh nghệ hàm lượng 100mg chống oxy hóa, chống viêm nhiễm đường hô hấp ở phổi.</span>
                <br/>
                <span className="text-success">In Stock, 251 sản phẩm</span>
              </div>
              <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
                <Image alt={""} width={400} height={400} src="/img/thuoc_04.png" className="image-fit" style={{width: '100%', height: 200}} />
                <span className="text-danger fw-bold fs-24 my-2">780.000 VND</span>
                <br/>
                <span className="hover-text-red cursor-pointer">Turmilive Plus Curcumin + Piperine - Kẹo Ngậm NGHỆ HỒ TIÊU CAY MẬT ONG (24 viên) | Giảm viêm họng, ho khan. Tinh nghệ hàm lượng 100mg chống oxy hóa, chống viêm nhiễm đường hô hấp ở phổi.</span>
                <br/>
                <span className="text-success">In Stock, 251 sản phẩm</span>
              </div>
            </div>
        </div>
        </div>

        {/* <!-- CHÍNH SÁCH --> */}
        <div className="row d-flex justify-content-center bg-graylight">
          <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
              <span className="fs-24 my-3">Chính sách mua hàng</span>
              <div className="row border-r-gray-1 mt-3 m-0">
                <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
                  <h5>Miễn phí Giao hàng Toàn Quốc</h5>
                  <span>Thanh Toán Khi Nhận Hàng</span>
                </div>
                <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
                  <h5>Đổi Trả Hàng Trong 3 Tuần</h5>
                  <span>Áp Dụng Cho Sản Phẩm Có Hóa Đơn Và Nguyên Seal</span>
                </div>
                <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
                  <h5>Phản Hồi Trong Vòng 24H</h5>
                  <span>Tư Vấn 24h/7</span>
                </div>
                <div className="col-6 col-sm-6 col-md-3 cursor-pointer p-3 border-tbl-gray-1">
                  <h5>Bảo Mật Thông Tin Cá Nhân</h5>
                  <span>Bảo Vệ Khách Hàng</span>
                </div>
              </div>
          </div>
        </div>

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
        
  </div>
  </div>
  )
}
