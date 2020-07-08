import User from "../../../../models/user"

export async function post(req, res){
    const allUsers = await User.find();


    let data = [];

    allUsers.forEach( user => {
        let userObj = {
            analitic: user.analitic,
            countCoupon: user.countCoupon,
            email: user.email,
        }
        data = [...data, userObj]
    });



    res.end(JSON.stringify({
        data
    }))
}
