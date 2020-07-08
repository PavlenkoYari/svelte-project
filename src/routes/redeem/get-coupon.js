import Coupon from '../../models/coupon'


export async function post(req, res) {
    if(req.body.ref || req.body.code){
        let findObj = {};
        if(req.body.ref){
            findObj = {
                ...findObj,
                order: req.body.ref
            }
        }
        if(req.body.code){
            findObj = {
                ...findObj,
                code: req.body.code
            }
        }
        const coupon = await Coupon.findOne(findObj)
        if(coupon && coupon.code.length && coupon.status == "paid"){
            res.end(JSON.stringify({
                success: true,
                coupon
            }))
        }
        else {
            res.end(JSON.stringify({
                success: false
            }))
        }
    }
    else
    {
        res.end(JSON.stringify({
            success: false
        }))
    }
}
