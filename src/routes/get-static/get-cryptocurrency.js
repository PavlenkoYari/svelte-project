import Static from '../../models/static'

export async function get(req, res){
    const currency = await Static.findOne({name: "сryptocurrency"})
    if(currency){
        res.end(JSON.stringify({
            success: true,
            data: currency.data
        }))
    }
    else {
        res.end(JSON.stringify({
            success: false,
        }))
    }
}
