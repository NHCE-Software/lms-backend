const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const crypto = require('crypto-random-string');
import { User } from '../models/user.js';

const { toInputObjectType } = require('graphql-compose');

const hello = {
    name: 'hello',
    type: 'User!',
    resolve: ({ context: { user } }) => user,
};

const signIn = {
    name: 'signIn',
    type: 'JSON!',
    args: {
        email: 'String!',
        password: 'String!',
    },
    resolve: async ({ args: { email, password } }) => {
        try {
            const user = await User.emailExist(email);
            if (!user) {
                return Promise.reject(new Error('User not found.'));
            }

            const comparePassword = await user.comparePassword(password);
            if (!comparePassword) {
                return Promise.reject(new Error('Password is incorrect.'));
            }

            const accessToken = jwt.sign(
                { userId: user._id, role: user.role, email: user.email },
                'hello'
            );

            return {
                token: accessToken,
                role: user.role,
            };
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
const removeOneUser = {
    name: 'removeOneUser',
    type: 'JSON!',
    args: {
        filter: "JSON"
    },
    resolve: async ({ args,context: { user } }) => {
        try {
            
            let userid = user._id.toString()
            
            if (userid===args.filter._id){
                return {
                    message:"deleteblocked"
                }
            }
            else{
                const user = await User.deleteOne({"_id":args.filter._id})
                console.log(user)
                return {
                    message:"successful"
                }

            }
            

            
        } catch (error) {
            return {
                message:"error"
            }
        }
    },
};

module.exports = {
    hello,
    signIn,
    removeOneUser
};
