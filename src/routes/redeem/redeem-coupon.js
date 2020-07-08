import WAValidator from 'wallet-address-validator/dist/wallet-address-validator.min.js';
import Coupon from '../../models/coupon'
import { sendEmail } from "../../helper/sendEmail"
import path from "path";

function validWallet(wallet, currentCrypto) {
    var valid = WAValidator.validate(wallet.trim(), currentCrypto);
    if (valid) {
        return "";
    } else {
        return "Wallet address is not a valid.";
    }
}

export async function post(req, res) {
    const EMAIL = req.body.email.trim();
    const WALLET = req.body.wallet.trim();

    let walletError = validWallet(WALLET, req.body.currentCrypto);

    if (!walletError.length) {
        let cryptoInfo = {
            cryptoName: req.body.currentCrypto,
            cryptoFullName: req.body.cryptoFullName,
            cryptoCount: req.body.cryptoCount,
            wallet: WALLET
        }

        const redeem = await Coupon.updateOne({_id: req.body.couponID}, {$set:
            {
                email: EMAIL,
                cryptoInfo,
                status: "redeem",
                redeemDate: new Date().getTime()
            }
        })

        if (redeem.ok && redeem.n && redeem.nModified) {
            const updateRedeem = await Coupon.findOne({_id: req.body.couponID})

            let _date = new Date(updateRedeem.redeemDate);
            let monthDate = _date.getMonth() > 9 ? _date.getMonth() + 1 : `0${_date.getMonth() + 1}`;
            let dayDate = _date.getDate() > 9 ? _date.getDate() : `0${_date.getDate()}`;
            let hoursDate = _date.getHours() > 9 ? _date.getHours() : `0${_date.getHours()}`;
            let minutesDate = _date.getMinutes() > 9 ? _date.getMinutes() : `0${_date.getMinutes()}`;
            let dateString = `${_date.getFullYear()}-${monthDate}-${dayDate} ${hoursDate}:${minutesDate}`

            await sendEmail(path.join(process.cwd(), 'src', 'email', 'redeem.html'),
            {
                code: updateRedeem.code,
                prettyPrice: updateRedeem.prettyPrice,
                redeemDate: dateString,
                cryptoCount: req.body.cryptoCount,
                cryptoName: req.body.currentCrypto,
                wallet: WALLET
            },
            {to: EMAIL, subject: "Coupon exchange"})

            res.end(JSON.stringify({
                success: true,
            }))
        } else {
            res.end(JSON.stringify({
                success: false,
                message: "Something whent wrong"
            }))
        }

    } else {
        res.end(JSON.stringify({
            success: false,
            errorWallet: walletError,
        }))
    }
}
