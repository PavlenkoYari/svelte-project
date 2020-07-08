import Static from '../../../../models/static'

export async function post(req, res){
    const payment = await Static.findOne({name: "payment"})

    const updateOne = await Static.updateOne({name: "payment"}, {$set: {data: [...payment.data, {
        name: req.body.paymentName.trim(),
        icon: req.body.link.trim(),
        currencyList: req.body.currencyList
    }]}})

    if(updateOne.ok && updateOne.nModified){
        res.end(JSON.stringify({
            success: false,
            message: "Paymnet menthod changed successfully"
        }))
    }
    else if(updateOne.ok && !updateOne.nModified){
        res.end(JSON.stringify({
            success: false,
            message: "Paymnet menthod cannot be equal."
        }))
    }
    else{
        res.end(JSON.stringify({
            success: false,
            message: "Something went wrong"
        }))
    }
}
