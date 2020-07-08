import User from "../models/user";

export async function post(req, res) {
  req.session.lang  = req.body.lang;
  if(req.session.user){
      await User.updateOne({email: req.session.user.email}, {$set: {lang: req.body.lang}})
  }
  res.end(JSON.stringify(
      {success: true}
  ));
}
