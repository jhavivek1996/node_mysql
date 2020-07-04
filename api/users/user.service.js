const pool = require("../../config/database");
const fs = require('fs')
module.exports={
    create: async (data, callBack)=>{
       
      try{
        await pool.query(`insert into registration(firstName, lastName,secAns, gender, email, password, number) values(?,?,?,?,?,?,?)`, [
            data.firstName,
            data.lastName,
            data.secAns,
            data.gender,
            data.email,  
            data.password,
            data.number
        ],
        
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results)

        })

      }catch(error){
          console.log(" Error while creating user "+error)
      }
    },

    show: async (data,callBack)=>{
        try{
            await pool.query("select id,firstName,gender,email,number from registration",
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results)

        })

        }catch(error){
            console.log(" Error while showing error " +error)
        }
    },

    updates: async (data, callBack)=>{
        // const ins =; 
        try{
            await pool.query(`UPDATE registration SET firstName=?, lastName=?, gender=?, number=? WHERE id = ?`, 
        [
            data.first_name,
            data.last_name,
            data.gender,
            data.number,
            data.id
        ],
        
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results)

        })
        }catch(error){
            console.log(" Error while updating data "+error)
        }
        
        

    },

    deletes: async (data,callBack,req)=>{
        try{
            
        await pool.query("DELETE FROM registration WHERE id =?", data,
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results)

        })
        }catch(error){
            console.log(" Error while deleting entry "+error)
        }

    },

    storeinPdf: async (data,callBack)=>{
        try{
            await pool.query("select id,firstName,gender,email,number from registration",
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results)

        });
       
        }catch(error){
            console.log(" Error while storing in PDF "+error)
        }
    },

    getUserByEmail: async (email, callBack)=> {
        try{
            await pool.query(`select * from registration where email = ?`,[email],
        (error,results,fields)=>{
            if(error){
                callBack("Error occured");
            }
            return callBack(null,results[0]);
        }
        );
        }catch(error){
            console.log(" Error whie getting user by email "+error)
        }
    },

    editPassword: async(data,email, oldPassword, newPassword,confirmPassword, callBack)=>{
       
       try{
        await pool.query(`select password from registration where password=?`,[oldPassword],
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results[0])

        })
        pool.query(`UPDATE registration SET password = ? where email=?`,[data.password,data.email,],

        (error,fields)=>{
            if(error){
                callBack("Error occured");
            }
            return callBack(null,"Success");
        })

       }catch(erorr){
           console.log(" Error while resetting password "+error)
       }
    }
}
