const Joi = require('joi')

module.exports={
    createUserAuth:(req, res)=>{
       
        const data = req.body;
        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            gender: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            number: Joi.number().required()
    
        });
      
      
        Joi.validate(data, schema, (err, value) => {    
            if (err) {
               
                res.status(422).json({
                    status: 'error',
                    message: 'Invalid Input',
                    data: data
                });
            } else {
               
                res.json({
                    status: 'success',
                    message: 'User created successfully',
                    data: Object.assign( value)
                    
                });
            }
           
        });
    
      
    }

}