const knex = require ("../database/connection");
const User = require("../models/User");
const { v4: uuidv4 } = require('uuid');

class PasswordToken{
    async create(email){
        const user = await User.findByEmail(email);

        if(user != undefined){
            try{

                const token = uuidv4();
                
                await knex.insert({
                    user_id: user.id, 
                    used: 0,
                    token: token,
                }).table("passwordtokens");

                return {status: true, token: token }
            }catch(err){
                console.log(err);
                return {status: false, err: err};
            }
        }else{
            return {status: false, err: "Invalid Email"};
        }
    }
}

module.exports = new PasswordToken();