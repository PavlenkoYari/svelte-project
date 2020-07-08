import Coupon from "../../../models/coupon.js"

export async function post(req, res) {

    const allVoucher = await Coupon.find({
        email: req.session.user.email,
        $or: [
            {status: req.body.isVoucher ? "pending" : "redeem"},
            {status: req.body.isVoucher ? "paid" : "completed"}
        ]
    })


    res.end(JSON.stringify(allVoucher))
}
