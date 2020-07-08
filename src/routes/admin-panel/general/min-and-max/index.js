import Static from '../../../../models/static'

export async function post(req, res){
    const updateMinAndMax = await Static.updateOne({name: "minAndMax"}, {$set: {data: [+req.body.min, +req.body.max]}})

    if(updateMinAndMax.ok && updateMinAndMax.nModified){
        res.end(JSON.stringify({
            success: false,
            message: "Min and max changed successfully"
        }))
    }
    else if(updateMinAndMax.ok && !updateMinAndMax.nModified){
        res.end(JSON.stringify({
            success: false,
            message: "Min and max cannot be equal."
        }))
    }
    else{
        res.end(JSON.stringify({
            success: false,
            message: "Something went wrong"
        }))
    }
}
