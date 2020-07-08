import Static from '../../../../models/static'

export async function post(req, res){
    const currency = await Static.findOne({name: "currency"})

    const updateCurrency = await Static.updateOne({name: "currency"}, {$set: {data: [...currency.data, {name: req.body.name.trim(), ico: req.body.ico.trim()}]}})

    if(updateCurrency.ok && updateCurrency.nModified){
        res.end(JSON.stringify({
            success: false,
            message: "Currency added successfully"
        }))
    }
    else if(updateCurrency.ok && !updateCurrency.nModified){
        res.end(JSON.stringify({
            success: false,
            message: "This currency already exists."
        }))
    }
    else{
        res.end(JSON.stringify({
            success: false,
            message: "Something went wrong"
        }))
    }
}
