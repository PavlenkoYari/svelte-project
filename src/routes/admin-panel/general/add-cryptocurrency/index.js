import Static from '../../../../models/static'

export async function post(req, res){
    const сryptocurrency = await Static.findOne({name: "сryptocurrency"})

    const updateCryptoCurrency = await Static.updateOne({name: "сryptocurrency"}, {$set: {data: [...сryptocurrency.data, {
            name: req.body.shortName.trim() + " - " + req.body.cryptoName.trim(),
            shortName: req.body.shortName.trim(),
            cryptoName: req.body.cryptoName.trim(),
            linkIco: req.body.link.trim(),
            commission: req.body.commission.trim()
        }]}})

    if(updateCryptoCurrency.ok && updateCryptoCurrency.nModified){
        res.end(JSON.stringify({
            success: false,
            message: "Cryptocurrency added successfully"
        }))
    }
    else if(updateCryptoCurrency.ok && !updateCryptoCurrency.nModified){
        res.end(JSON.stringify({
            success: false,
            message: "This сryptocurrency already exists."
        }))
    }
    else{
        res.end(JSON.stringify({
            success: false,
            message: "Something went wrong"
        }))
    }
}
