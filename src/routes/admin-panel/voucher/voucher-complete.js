import Coupon from "../../../models/coupon.js";

import { sendEmail } from "../../../helper/sendEmail";
import path from "path";


export async function post(req, res){
    if(req.session.user && req.session.user.admin){
        const voucherUpdate = await Coupon.updateOne({_id: req.body.vouchID}, {$set: {status: "completed", redeemDate: new Date().getTime()}})
        if(voucherUpdate.nModified){


            const redeemComplete = await Coupon.findOne({_id: req.body.vouchID})

            let _date = new Date(redeemComplete.redeemDate);
            let monthDate = _date.getMonth() > 9 ? _date.getMonth() + 1 : `0${_date.getMonth() + 1}`;
            let dayDate = _date.getDate() > 9 ? _date.getDate() : `0${_date.getDate()}`;
            let hoursDate = _date.getHours() > 9 ? _date.getHours() : `0${_date.getHours()}`;
            let minutesDate = _date.getMinutes() > 9 ? _date.getMinutes() : `0${_date.getMinutes()}`;
            let dateString = `${_date.getFullYear()}-${monthDate}-${dayDate} ${hoursDate}:${minutesDate}`


            await sendEmail(path.join(process.cwd(), 'src', 'email', 'complete.html'),
            {code: redeemComplete.code, order: redeemComplete.order, prettyPrice: redeemComplete.prettyPrice, redeemDate: dateString, cryptoCount: redeemComplete.cryptoInfo.cryptoCount, cryptoName: redeemComplete.cryptoInfo.cryptoName, wallet: redeemComplete.cryptoInfo.wallet},
            {to: redeemComplete.email.trim(), subject: "Your voucehr successful completed"})


            res.end(JSON.stringify({
                success: true,
                message: "Voucher success completed"
            }))
        }
        else if(updatePass.n){
            res.end(JSON.stringify({
                success: false,
                message: "This voucher completed, yet"
            }))
        }
        else {
            res.end(JSON.stringify({
                success: false,
                message: "Something went wrong..."
            }))
        }
    }
    else {
        res.end(JSON.stringify({
            success: false,
            message: "Permission denied"
        }))
    }

}
