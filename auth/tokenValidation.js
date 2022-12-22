const { verify } = require("jsonwebtoken");
// exporting this module because i need this middleware on every route to validate that

module.exports= {
        checkToken:(req,res,next)=>{
            let token = req.get("authorization");
            if(token){
                token = token.slice(7) //bearer will be having 7 index including space so we will start from 8th index
                verify(token,"h294",(err,decoded)=>{
                    if(err)
                    {
                    res.json({
                        success:0,
                        message:"invalid token"
                    })
                }
                else{
                    next();
                }
                })
            }
            else{
                res.json({
                    success:0,
                    message:"access denied! Unauthorized user" 
                })
            }
        }
}
