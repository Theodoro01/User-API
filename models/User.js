const knex = require ("../database/connection");
const bcrypt = require("bcrypt");

class User{

    async new(email, name, password){
        try{
            const hash  = await bcrypt.hash(password, 10);
            await knex.insert({email, name, password: hash, role: 0}).table("users");

        }catch(err){
            console.log(err);
        }
    }

    async findEmail(email){
        try{
            const result = await knex.select("*").from("users").where({email: email});
            
            if(result.length > 0){
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log(err);
        }
    }

    async findAll(){
        try{
            const result = await knex.select("id","name", "email", "role").table("users");
            return result;
        }catch(err){
            console.log(err);
            return []
        }
    }
    async findById(id){
        try{
            const result = await knex.select("id","name", "email", "role").where({id: id}).table("users");
           if(result.length > 0){
               return result[0];
           }else{
               return undefined;
           }
        }catch(err){
            console.log(err);
            return undefined;
        }
    }
}


module.exports = new User;