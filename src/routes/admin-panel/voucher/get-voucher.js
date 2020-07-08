import Coupon from "../../../models/coupon.js"

export async function post(req, res){
    let findOptions = {
        status: req.body.isVoucher ? "pending" : "redeem"
    }
    if(req.body.reference){
        findOptions = {
            ...findOptions,
            order: req.body.reference
        }
    }
    if(req.body.emailForVaucher){
        findOptions = {
            ...findOptions,
            email: req.body.emailForVaucher
        }
    }
    const allVoucher = await Coupon.find(findOptions).sort({date: 1})

    res.end(JSON.stringify(allVoucher))
}
