const pool = require("../../config/database"); //importing from config database\
                                                //so that i can run my query


module.exports = {
    create: (data,callBack)=>{
        pool.query(
            `insert into datat (FirstName,LastName,Email,Phone,password)
             values(?,?,?,?,?)`,
            [
                data.FirstName,
                data.LastName,
                data.Email,
                data.Phone,
                data.password
                
            ],
            (error,results,fields)=>{
                if(error) {
                    return callBack(error)
                }
                return callBack(null,results);
                    
                
            
                }
            );
    },

    getUsers: callBack =>{
        pool.query(
            `select * from datat`,
            [] ,
            (error,results,fields)=>{
                    if(error) 
                    {
                        return callBack(error);
                    }

                    return callBack(null,results);

                    
            }
        );
    },

    getUsersById: (id,callBack) => {
                pool.query(
                    `select id,FirstName,LastName,Email,Phone,password from datat
                where id = ?`,
                [id],

                (error,results,fields)=>{
                    if(error) {
                        return callBack(error);
                    }

                    return callBack(null,results[0]);
                }
                );
    },

    updateUsers:(data,callBack)=>{
        pool.query(
            `update datat set FirstName=?,LastName=?,Email=?,Phone=?,password=? where id = ? `,
            [   
               
                data.FirstName,
                data.LastName,
                data.Email,
                data.Phone,
                data.password,
                data.id
            ],
                (err,results,fields)=>{
                    if(err)
                    {
                        return callBack(err);
                    }

                    return callBack(null,results);
                }
        )
    },

    deleteUserById:(data,callBack)=>{
        pool.query(
            `delete from datat where id=?`,
            [data.id],
            
            (err,results,fields)=>{
                if(err){
                    return callBack(err);
                }
                
                return callBack(null,results);
            }
        )
    },

    getUserByEmail:(Email,callBack)=>{
        pool.query(
            `select * from datat where email=?`,
            [Email],
            (error,results,fields)=>{
                if(error) {
                  return  callBack(error);
                }

                return callBack(null,results[0]);
            }
        )
    }
}
