import Static from '../../models/static'

export async function get(req, res){
    const payment = await Static.findOne({name: "payment"})
    if(payment){
        res.end(JSON.stringify({
            success: true,
            data: payment.data
        }))
    }
    else {
        res.end(JSON.stringify({
            success: false,
        }))
    }
}
