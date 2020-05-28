const { create, show, updates, deletes, storeinPdf, getUserByEmail } = require('./user.service');   
const { genSaltSync, hashSync, compareSync} = require("bcrypt");
const fs = require('fs');
const { sign } = require('jsonwebtoken');

var now = new Date();

module.exports = {

    createUser: async (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        await create(body,(err,results)=>{
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
    },

    showUser: async(req,res)=>{
        const showQuery = req.query;
        console.log( Date.now());
        await show(showQuery,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: "Data Not Getting"
                });
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
        
    },
    searchByname: async(req,res)=>{
        const body = req.body;
        console.log( Date.now());
        await show(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: "Data Not Getting"
                });
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
        
    },

    updateUser: async(req,res)=>{
        const updateData = req.body;      
        console.log(updateData)
        const salt = genSaltSync(10);
        updateData.password = hashSync(updateData.password, salt);
        await updates(updateData,(err,results)=>{
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
    },
   deleteUser: async(req,res)=>{
        const deleteQuery = req.body;
        await deletes(deleteQuery,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: "Data Not Deleted"
                });
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
        
    },
    storeinPdfs: async(req,res)=>{
        const showQuery = req.query;
       
        await storeinPdf(showQuery,(err,results)=>{
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
        
    },
    login: async(req,res)=>{
        console.log("Controller Called");
        const body = req.body;
        console.log(body)
        await getUserByEmail(body.email,(err,results)=>{
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
        
        
    
    },
}
