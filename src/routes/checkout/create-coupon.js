import Coupon from '../../models/coupon'
import User from '../../models/user'
import { sendEmail } from "../../helper/sendEmail"
import path from "path";

const setOrderNomber = async () => {
    const order = Math.floor(Math.random() * (10000000000 - 1000000000) ) + 1000000000;
    const coupon = await Coupon.findOne({order});
    if(coupon){
        return setOrderNomber()
    }
    return order
}

export async function post(req, res) {
    const user = await User.findOne({email: req.body.email.trim()});

    let analitic = user.analitic;
    let countCoupon = user.countCoupon + 1;
    if(analitic[req.body.currName.trim()]){
        const currentPrice = analitic[req.body.currName.trim()];

        analitic = {
            ...analitic,
            [req.body.currName.trim()]: +req.body.price + currentPrice
        }
    }
    else {
        analitic = {
            ...analitic,
            [req.body.currName.trim()]: +req.body.price
        }
    }

    await User.updateOne({email: req.body.email.trim()}, {$set: { analitic, countCoupon } })


    const order = await setOrderNomber();
    const newCoupon = await new Coupon({
        price: +req.body.price,
        prettyPrice: req.body.prettyPrice.trim(),
        email: req.body.email.trim(),
        order: order,
        currencyName: req.body.currName.trim(),
        paymentMethod: req.body.paymentMethod.trim()
    }).save();

    const isSEPA = req.body.paymentMethod.trim() == "SEPA Bank Transfer"

    await sendEmail(path.join(process.cwd(), 'src', 'email', 'requisites.html'), {
        isSEPA,
        preetyPrice: req.body.prettyPrice.trim,
        reference: order
      },
      {to: req.body.email.trim(), subject: "Your requisites"})

    res.end(JSON.stringify({
        success: true,
        couponID: newCoupon._id
    }));
}
