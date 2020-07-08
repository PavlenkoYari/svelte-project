import Coupon from '../../../models/coupon'

export async function get(req, res) {
    const currentCoupon = await Coupon.findOne({_id: req.query.couponID})
    if(currentCoupon){
        res.end(JSON.stringify({
            success: true,
            currentCoupon
        }));
    }

}
