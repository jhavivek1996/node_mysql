const pool = require("../../config/database");
const fs = require('fs')
module.exports={
    create:(data, callBack)=>{
        // const ins =; 
        pool.query(`insert into registration(firstName, lastName, gender, email, password, number) values(?,?,?,?,?,?)`, [
            data.firstName,
            data.lastName,
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
        
        

    },

    show:(data,callBack)=>{
        pool.query("select id,firstName,gender,email,number from registration",
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results)

        })
    },

    updates:(data, callBack)=>{
        // const ins =; 
        pool.query(`UPDATE registration SET firstName=?, lastName=?, gender=?, number=? WHERE id = ?`, 
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
        
        

    },

    deletes:(data,callBack)=>{

        pool.query("delete from registration where id =?", data.id,
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results)

        })
    },

    storeinPdf:(data,callBack)=>{
        pool.query("select id,firstName,gender,email,number from registration",
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results)

        });
       
    },

    getUserByEmail:(email, callBack)=> {
        pool.query(`select * from registration where email = ?`,[email],
        (error,results,fields)=>{
            if(error){
                callBack("Error occured");
            }
            return callBack(null,results[0]);
        }
        );
    }
        

}
