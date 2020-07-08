import Static from '../../models/static'

export async function get(req, res){
    const language = await Static.findOne({name: "language"})
    if(language){
        res.end(JSON.stringify({
            success: true,
            data: language.data
        }))
    }
    else {
        res.end(JSON.stringify({
            success: false,
        }))
    }
}
