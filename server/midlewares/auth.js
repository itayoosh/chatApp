const jwt = require("jsonwebtoken");

exports.auth = async(req,res,next) => {
  const token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({err:"You need send token to this endpoint/url 1111"})
  }
  try{
    const tokenSecret = process.env.TOKEN_SECRET 
    const decodeToken = jwt.verify(token,tokenSecret);

    req.tokenData = decodeToken;
    next()
  }
  catch(err){
    console.log(err);
    res.status(502).json({err:"Token invalid or expired 2222"})
  }
}
