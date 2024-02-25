import Image from "next/image";
import React from "react";
export default function FooterCommon(){
    return(
        <div>
          {/* <!-- FOOTER --> */}
          <div className="row d-flex justify-content-center bg-primary">
            <div className="col-12 col-sm-12 col-md-9 my-2 d-flex justify-content-center my-3">
                <span className="text-white">© 2024 G.store Live Well. POS and Ecommerce by Shopify</span>
            </div>
          </div>
        </div>
    );
}