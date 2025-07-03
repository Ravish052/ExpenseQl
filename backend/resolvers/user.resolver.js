import { users } from '../dummyData/data.js';
import bcrypt from "bcryptjs";
import User from '../models/user.model.js';

const userResolver = {
    Mutation: {
        signUp: async (_, { input }, context) => {
            try {
                const { userName, name, password, gender } = input
                if (!userName || !name || !password || gender) {
                    throw new Error('All fields are required');
                }

                const existingUser = await users.findOne({ userName });
                if (existingUser) {
                    throw new Error('User already exists');
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

                const newuser = new User({
                    userName,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
                })

                await newuser.save();
                await context.login(newUser);
                return newUser;
            } catch (err) {
                console.error("Error in signUp: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },

        login : async(_ , { input }, context) => {
            try {
                const {userName, password} = input;
//const { }


            }catch (err) {
                console.error("Error in login: ", err);
                throw new Error(err.message || "Internal server error");
            }
        }
    },

    Query: {
        users: () => {
            return users;
        },
        user: (_, { userId },) => {
            return users.find(user => user._id === userId);
        }
    },

}

export default userResolver;