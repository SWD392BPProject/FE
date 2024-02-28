// /src/api/test/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export async function POST(req: Request, res : NextApiResponse) {
      if (req.method !== 'POST') {
        return Response.json('code 405');
      }

      const {amount, title} = await req.json();

      var partnerCode = "MOMO";
        var accessKey = "F8BBA842ECF85";
        var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
        var requestId = partnerCode + new Date().getTime();
        var orderId = requestId;
        var orderInfo = title;
        var redirectUrl = "http://localhost:3000/momo/return";
        var ipnUrl = "https://callback.url/notify";
        // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
        //var amount = "50000";
        var requestType = "captureWallet"
        var extraData = ""; //pass empty value if your merchant does not have stores
    
        var rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType
        var signature = crypto.createHmac('sha256', secretkey)
        .update(rawSignature)
        .digest('hex');
    
        // Tạo body request
        const requestBody = {
            partnerCode : partnerCode,
            accessKey : accessKey,
            requestId : requestId,
            amount : amount,
            orderId : orderId,
            orderInfo : orderInfo,
            redirectUrl : redirectUrl,
            ipnUrl : ipnUrl,
            extraData : extraData,
            requestType : requestType,
            signature : signature,
        };
    
        try {
          const response = await fetch('https://test-payment.momo.vn/v2/gateway/api/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          });
    
          const data = await response.json();
          return Response.json(data)
        } catch (error) {
          console.error("Error:", error);
          return Response.json('Internal Server Error')
        }
}