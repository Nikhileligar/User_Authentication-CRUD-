
const {create,getUsers,getUsersById,updateUsers,deleteUserById,getUserByEmail} = require("./user.services"); //import all the services defined in user.services CRUD
const {genSaltSync,hashSync,compareSync} = require("bcrypt");
const { json } = require("express");
const {sign} = require("jsonwebtoken");

module.exports= {
    createUser:(req,res)=>{
        const body = req.body; //requesting for password
        const salt = genSaltSync(10);   //hashing password of limit index value 10
        body.password = hashSync(body.password,salt);//store the hashed password to body which contains password
        create(body,(err,results)=>{
            if(err) {
                    console.log(err);
                return res.status(500).json({
                    message:"database connection failed",
                    success:0
                });
            };

            return res.status(200).json({
                success:1,
                data:results
            });
        });  //inside the body the password will now become the encrypted one

    },

    getUsers:(req,res)=>{
            getUsers:(err,results) =>{
                if(err){ 
                console.log(err);
                return;

                }
            
            return json({
                success:1,
                data:results
            });

            }
        },

    getUsersById:(req,res)=>{
            const id = req.params.id;
            getUsersById(id,(err,results)=>{
                    if(err) {
                        console.log(err);
                        return;
                    }

                    if(!results){
                        return res.status(500).json({
                            success:0,
                            message:"record not found"
                         });

                        }
                        return res.json({
                            success:1,
                            data:results
                        });
                    
                });
    },

    updateUsers:(req,res)=>{
            const body = req.body;
            const salt=genSaltSync(10);
            body.password=hashSync(body.password,salt);
            updateUsers(body,(err,results)=>{
                if (err) {
                        console.log(err);
                        return res.json({
                            status:0,
                            message:"cant be updated"
                        })
                }

                return res.json({
                    status:1,
                    serverStatus:200,
                    message:"successfully updated",
                    
                });
                console.log(results);
            });
        
            },

    deleteUserById:(req,res)=>{
                const data = req.body;
                deleteUserById(data,(err,results)=>{
                        if(err){
                            return res.json({
                                success:0,
                                message:"item cant be deleted"
                            });
                        }

                        return res.json({
                            success:1,
                            message:"user got deleted",
                            
                        })
                });
            },
     login:(req,res)=>{
        const body = req.body;
        getUserByEmail(body.Email,(err,results)=>{
            if(err) {
                console.log(err);
            }
            if(!results){
            return res.json({
                success:0,
                message:"invalid email id or password"
            });
            }
            const result=compareSync(body.password,results.password);
            if(result){
                results.password=undefined;
                const jsontoken = sign({result:results},"h294",{
                    expiresIn:"1h" 
                });
                return res.json({success:1,message:"login successfully",token:jsontoken});

            } 
            else{
                return res.json({
                    success:0,
                    message:"invalid email id or password"
                })
            }
        })
     }       

}