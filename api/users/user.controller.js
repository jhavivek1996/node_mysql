const { create, show, updates, deletes } = require('./user.service');   
const { genSaltSync, hashSync} = require("bcrypt");


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
            return res.status(200).json({
                success:1,
                data:results
            })
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
        const deleteQuery = req.body;
        deletes(deleteQuery,(err,results)=>{
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
}

