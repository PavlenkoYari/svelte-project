import Coupon from "../../../models/coupon.js"
import { sendEmail } from "../../../helper/sendEmail"
import path from "path";


const setOrderNomber = async () => {
    function randomString() {
        let charSet = 'ABCDEFGHIJK1234567890LMNOPQRSTUVWXYZ';
        var randomString = '';
        for (var i = 0; i < 24; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz,randomPoz+1);
        }
        return randomString;
    }
    const code = randomString();
    const coupon = await Coupon.findOne({code});

    if(coupon){
        return setOrderNomber()
    }
    
    return code
}


export async function post(req, res){
    if(req.session.user && req.session.user.admin){
        let code = await setOrderNomber();
        const voucherUpdate = await Coupon.updateOne({_id: req.body.vouchID}, {$set: {status: "paid", code: code}})


        if(voucherUpdate.nModified){
            const voucher = await Coupon.findOne({_id: req.body.vouchID});

            let _date = new Date(voucher.date);
            let monthDate = _date.getMonth() > 9 ? _date.getMonth() + 1 : `0${_date.getMonth() + 1}`;
            let dayDate = _date.getDate() > 9 ? _date.getDate() : `0${_date.getDate()}`;
            let hoursDate = _date.getHours() > 9 ? _date.getHours() : `0${_date.getHours()}`;
            let minutesDate = _date.getMinutes() > 9 ? _date.getMinutes() : `0${_date.getMinutes()}`;
            let dateString = `${_date.getFullYear()}-${monthDate}-${dayDate} ${hoursDate}:${minutesDate}`


            await sendEmail(path.join(process.cwd(), 'src', 'email', 'voucher.html'), {code, order: voucher.order, prettyPrice: voucher.prettyPrice, date: dateString}, {to: voucher.email.trim(), subject: "Your voucehr successful paid"})
            res.end(JSON.stringify({
                success: true,
                message: "Voucher success paid"
            }))
        }
        else if(updatePass.n){
            res.end(JSON.stringify({
                success: false,
                message: "This voucher paid, yet"
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
