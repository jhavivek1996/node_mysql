const { create, show, updates, deletes, storeinPdf, getUserByEmail,editPassword } = require('./user.service');   
const { genSaltSync, hashSync, compareSync} = require("bcrypt");
const fs = require('fs');
const { sign } = require('jsonwebtoken');

var now = new Date();

module.exports = {

    createUser: async (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        try{
            create(body,(err,results)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success:0,
                        message: "Database Connection error"
                    });
                }
                return res.status(200).json({
                    success:1,
                    data:results
                })
            })
        }catch(error){
            console.log(" Error in create user "+error)
        }
    },

    showUser: async(req,res)=>{
        const showQuery = req.query;
        console.log( Date.now());
        try{
            show(showQuery,(err,results)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success:0,
                        message: "Data Not Getting"
                    });
                }
                return res.json({success:1,results})
            })
        }catch(error){
            console.log(" Error in show user "+error)
        }
        
    },

    updateUser: async(req,res)=>{
        const updateData = req.body;      
        console.log(updateData)
        const salt = genSaltSync(10);
        updateData.password = hashSync(updateData.password, salt);
       try{
        updates(updateData,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: "Data Not Updated"
                });
            }
            return res.status(200).json({
                success:1,
                data:results
            })

        })

       }catch(error){
           console.log(" Error in update user "+error)
       }
    },

   deleteUser: async(req,res)=>{
        const deleteQuery = req.params.id;
        console.log(" I am delete controller ")

       try{
        deletes(deleteQuery,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: "Data Not Deleted"
                });
            }
            return res.json({
                success:1,
                message: "User Deleted Successfully",
                id: " I am id no "+req.params.id
            });
        });

       }catch(error){
           console.log(" Error in delete user "+error)
       }
        
    },
    storeinPdfs:async (req,res)=>{
        const showQuery = req.query;
       try{
            storeinPdf(showQuery,(err,results)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success:0,
                        message: "Data Not Getting"
                    });
                }
            let finall = JSON.stringify(results);
                fs.writeFileSync("dataStore.pdf",finall);
                return res.status(200).json({
                    success:1,
                    data:results
                })             
                })
                
       }catch(error){
           console.log(" Error in store in pdfs")
       }
        
    },
    login: async(req,res)=>{
        console.log("Controller Called");
        const body = req.body;
        console.log(body)
        try{
            getUserByEmail(body.email,(err,results)=>{
                if(err){
                    console.log(err);
                }
                if(!results){
                    return res.json({
                        success:0,
                        data: "Invalid email or password"
                    });
                }
                
                const result = compareSync(body.password,results.password);
                if(result){
                    results.password = undefined;
                    const jsontoken = sign({result:results},process.env.SECRET_KEY,{ expiresIn: "1h" });
                    return res.json({
                        success:1,
                        message:"Logged in successfully",
                        token: jsontoken
                        // data:results
                    });
                }else{
                   return res.json({
                    success:0,
                    message: "Token is invalid"
                   })
                }
            });

        }catch(error){
            console.log(" Error in login "+error)
        }

        
    
    },
    editPassword: async(req,res)=>{
        console.log(" Reset Cotroller Called=============> ");
         const body = req.body;
         const salt = genSaltSync(10);
         body.password = hashSync(body.password, salt);
         console.log(body);
         try{
            editPassword(body.email,body.oldPassword,body.password,(err,results)=>{
                if(err){
                    console.log(err);
                }
                if(!results){
                    return res.json({
                        success:0,
                        data: "Invalid Answer"
                    });
   
                }
   
                const emailResult = compareSync(body.Oldpassword,results.password);
   
                if(emailResult && secAnsResult){
                    return res.json({
                        success:0,
                        messgae:"password changed successfully"
                    })
                   
                }
                else{
                   return res.json({
                       success:0,
                       messgae:"Invalid Input"
                   })
                }
                
            })

         }catch(error){
             console.log(" Error in resetting password "+ error)
         }

    }
    
}
