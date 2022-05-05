const User = require("../models/User")

class UserController{

    async index(req, res){
        try{

            const users = await User.findAll();
            res.json(users);

        }catch(err){
            console.log(err);
        }
    }

    async findUser(req, res){
        const id = req.params.id;
        const user = await User.findById(id);

        if(user === undefined){
            return res.status(404).send({Error: "User already exist"});

        }else{
            return res.status(200).json(user);
        }
    } 

    async create(req, res){
        const {email, name, password} = req.body;

        try{
            if(email == undefined)
                return res.status(400).send({error: "Email is not defined"});
        }catch(err){
            console.log(err);
        }

        const emailExist = await User.findEmail(email);

        if(emailExist)
            return res.status(406).send({Error: "E-mail already exist"});
        
        await User.new( email, name, password)
        res.send("Tudo OK!");
    }

    async edit(req, res){

        console.log(req.body)

        const { id , name, email, role} = req.body;

        try{
            var result = await User.update( id, name, email, role);

            if(result != undefined){
                if(result.status){
                    return res.status(200).send({msg: "Tudo OK"});
                }else{
                    return res.status(406).send(result.err);
                }
            }else{
                return res.status(406).send({Error: "Ocorreu algum erro!"});
            } 
        }catch(err){
            return res.status(400).send({Error: err});
        }
    }

    async remove(req, res){
        const id = req.params.id;

        try{
            const result = await User.delete(id);

            if(result.status){
                return res.status(200).send({msg: "Tudo OK"});
            }else{
                return res.status(406).send(result.err);
            }
        }catch(err){
            console.log(err)
        }
    }

}

module.exports = new UserController();