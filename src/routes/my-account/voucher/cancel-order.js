import Coupon from "../../../models/coupon.js"

export async function post(req, res){
    const cancelOrder = await Coupon.deleteOne({_id: req.body.voucherID, status: 'pending'});
    if(cancelOrder.ok && cancelOrder.deletedCount){
        res.end(JSON.stringify({
            success: true,
            message: "Your voucher was successfully canceled"
        }))
    }
    else {
        res.end(JSON.stringify({
            success: false,
            message: "Something whent wrong..."
        }))
    }
}
