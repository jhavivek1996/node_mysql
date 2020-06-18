const { create, show, updates, deletes, storeinPdf, getUserByEmail } = require('./user.service');   
const { genSaltSync, hashSync, compareSync} = require("bcrypt");
const fs = require('fs');
const { sign } = require('jsonwebtoken');

var now = new Date();

module.exports = {

    createUser:(req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
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
    },

    showUser:(req,res)=>{
        const showQuery = req.query;
        console.log( Date.now());
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
        
    },

    updateUser:(req,res)=>{
        const updateData = req.body;      
        console.log(updateData)
        const salt = genSaltSync(10);
        updateData.password = hashSync(updateData.password, salt);
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
    },
   deleteUser:(req,res)=>{
        const deleteQuery = req.params.id;
        console.log(" I am delete controller ")

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
        
    },
    storeinPdfs:(req,res)=>{
        const showQuery = req.query;
       
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
        
    },
    login:(req,res)=>{
        console.log("Controller Called");
        const body = req.body;
        console.log(body)
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
        
    
    },
}
