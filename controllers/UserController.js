const User = require("../models/User")

class UserController{

    async create(req, res){
        const {email, name, password} = req.body;

        try{

            if(email == undefined)
                return res.status(400).send({error: "Email is not defined"});

        }catch(err){
            console.log(err)
        }

        const emailExist = await User.findEmail(email);

        if(emailExist)
            return res.status(406).send({Error: "E-mail already exist"});
        

        await User.new( email, name, password)
        res.send("Tudo OK!");
    }
}

module.exports = new UserController();